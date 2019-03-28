using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DemoApi.Models
{
    public class SetCurrencyResult
    {
        public string Currency { get; set; }
        public string RecordId { get; set; }
        public NetWorthTotal NetWorthTotals { get; set; }
        public List<FinancialRecord> Entries { get; set; }
    }
}
