using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DemoApi.Models
{
    public class UpdateFinancialRecord
    {
        public string RecordId { get; set; }
        public int FrId { get; set; }
        public double NewValue { get; set; }
        public double NewRate { get; set; }

    }
}
