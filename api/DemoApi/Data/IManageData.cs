using DemoApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DemoApi.Data
{
    public interface IManageData
    {
        void CreateOrUpdate(NetWorth model);
        NetWorth Read(string recordId);
        List<NetWorth> ReadAll();
        void Delete(string recordId);
    }
}
