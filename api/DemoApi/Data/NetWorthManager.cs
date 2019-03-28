using DemoApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DemoApi.Data
{
    public class NetWorthManager : IManageNetWorth
    {
        IManageData _dataManager;
        public NetWorthManager(IManageData dataManager)
        {
            _dataManager = dataManager;
        }

        public NetWorth GetNetWorth(string recordId)
        {
            return _dataManager.Read(recordId);
        }

        public void UpdateNetWorth(UpdateFinancialRecord model)
        {
            // find record
            var netWorth = _dataManager.Read(model.RecordId);
            var entryIndex = netWorth.Entries.FindIndex(x => x.Id == model.FrId);

            // update the record
            netWorth.Entries[entryIndex].Rate = model.NewRate;
            netWorth.Entries[entryIndex].Value = model.NewValue;

            // save the record
            _dataManager.CreateOrUpdate(netWorth);
        }

        public NetWorthTotal CalculateNetWorth(NetWorth model)
        {
            _dataManager.CreateOrUpdate(model);

            var updatedModel = _dataManager.Read(model.RecordId);

            var totalAssets = updatedModel.Entries.Where(x => x.RecordType == RecordType.LongTermAsset || x.RecordType == RecordType.ShortTermAsset).Sum(x => x.Value);
            var totalLiabilities = updatedModel.Entries.Where(x => x.RecordType == RecordType.LongTermLiability || x.RecordType == RecordType.ShortTermLiability).Sum(x => x.Value);

            return new NetWorthTotal
            {
                TotalAssets = totalAssets,
                TotalLiabilities = totalLiabilities,
                TotalNetWorth = totalAssets - totalLiabilities
            };
        }

        public void ConvertToCurrency(string recordId, double exchangeRate)
        {
          
        }
    }
}
