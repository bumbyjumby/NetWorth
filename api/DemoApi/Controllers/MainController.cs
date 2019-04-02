using DemoApi.Data;
using DemoApi.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;

namespace DemoApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MainController : ControllerBase
    {
        IManageCurrency _currencyManager;
        IManageData _dataManager;
        public MainController(IManageCurrency currencyManager, IManageData dataManager)
        {
            _currencyManager = currencyManager;
            _dataManager = dataManager;
        }
        [EnableCors("MyLoosePolicy")]
        [HttpGet]
        [Route("getCurrencies")]
        public ActionResult<List<string>> GetCurrencies()
        {
            return _currencyManager.getCurrencies();
        }

        [EnableCors("MyLoosePolicy")]
        [HttpPost]
        [Route("calculateNetWorth")]
        public NetWorthTotal CalculateNetWorth([FromBody] NetWorth netWorth)
        {
            if (netWorth == null)
                return null;
            // ensure everything is in CDN, 
            var exchangeRate = _currencyManager.GetExchangeRate(netWorth.Currency);

            if (netWorth.Entries != null)
            {
                netWorth.Entries.ForEach(x => x.Value = x.Value * exchangeRate);
            }

            _dataManager.CreateOrUpdate(netWorth);

            var updatedModel = _dataManager.Read(netWorth.RecordId);

            return ComputeTotals(updatedModel);
        }

        [EnableCors("MyLoosePolicy")]
        [HttpGet]
        [Route("getValuesInCurrency")]
        public ActionResult<SetCurrencyResult> GetValuesInCurrency(string currency, string recordId)
        {
            var networthCDN = _dataManager.Read(recordId);
           
            var exchangeRate = _currencyManager.GetExchangeRate(currency);

            networthCDN.Entries.ForEach(x => x.Value = x.Value / exchangeRate);
         
            var result = new SetCurrencyResult();
            result.Currency = currency;
            result.RecordId = recordId;
            result.Entries = networthCDN.Entries;
            result.NetWorthTotals = ComputeTotals(networthCDN);

            return Ok(result);
        }

        private NetWorthTotal ComputeTotals(NetWorth model)
        {
            if(model.Entries == null)
            {
                return null;
            }

            var totalAssets = model.Entries.Where(x => x.RecordType == RecordType.LongTermAsset || x.RecordType == RecordType.ShortTermAsset).Sum(x => x.Value);
            var totalLiabilities = model.Entries.Where(x => x.RecordType == RecordType.LongTermLiability || x.RecordType == RecordType.ShortTermLiability).Sum(x => x.Value);

            return new NetWorthTotal
            {
                TotalAssets = totalAssets,
                TotalLiabilities = totalLiabilities,
                TotalNetWorth = totalAssets - totalLiabilities
            };
        }
    }
}