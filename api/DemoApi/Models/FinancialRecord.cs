using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DemoApi.Models
{
    public class FinancialRecord
    {
        public int Id { get; set; }
        public double Value { get; set; }
        public string Currency { get; set; }
        public string Name { get; set; }
        public double Rate { get; set; }
        public double MonthlyPayment { get; set; }
        public RecordType RecordType { get; set; }
    }
}
