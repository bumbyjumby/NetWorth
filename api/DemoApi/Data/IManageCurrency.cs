using System.Collections.Generic;

namespace DemoApi.Data
{
    public interface IManageCurrency
    {
        List<string> getCurrencies();
        double GetExchangeRate(string currency);
    }
}