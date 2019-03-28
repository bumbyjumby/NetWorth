using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace CurrencyApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CurrencyController : ControllerBase
    {
        [HttpGet]
        [Route("getCurrencies")]
        public ActionResult<List<string>> GetCurrencies()
        {
            return new List<string> { "AUD", "BRL", "CNY", "EUR", "HKD", "INR", "IDR", "JPY", "MYR", "CDN" };
        }

        // GET api/values/CDN
        [HttpGet("{currency}")]
        [Route("getExchangeRate")]
        public ActionResult<double> Get(string currency)
        {
            return Convert(currency);
        }

        private double Convert(string currency)
        {
            // 0.9434 Canadian Dollars = 1 Australian Dollar
            switch (currency)
            {
                case "AUD":
                    return 0.9434;
                case "BRL":
                    return 0.3518;
                case "CNY":
                    return 0.1980;
                case "EUR":
                    return 1.5090;
                case "HKD":
                    return 0.1693;
                case "INR":
                    return 0.01926;
                case "IDR":
                    return 0.000093;
                case "JPY":
                    return 0.01193;
                case "MYR":
                    return 0.3260;
                case "CDN":
                    return 1.00;
                default:
                    throw new Exception("Currency Unavailable");
            }
        }
    }
}
