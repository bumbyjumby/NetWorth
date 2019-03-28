using DemoApi.Models;

namespace DemoApi.Data
{
    public interface IManageNetWorth
    {
        NetWorthTotal CalculateNetWorth(NetWorth model);
        NetWorth GetNetWorth(string recordId);
        void UpdateNetWorth(UpdateFinancialRecord model);
    }
}