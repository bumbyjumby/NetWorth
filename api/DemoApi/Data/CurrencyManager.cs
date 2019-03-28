using CurrencyApi.Controllers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

namespace DemoApi.Data
{
    public class CurrencyManager : IManageCurrency
    {
        public List<string> getCurrencies()
        {
            var currencyApi = new CurrencyController();
            return currencyApi.GetCurrencies().Value;
        }
        public double GetExchangeRate(string currency)
        {
            // Ideally this would be an API call to a separate service. IIS and .net core have failed me :(
            var currencyApi = new CurrencyController();
            return currencyApi.Get(currency).Value;     
         
        }
    }
}
