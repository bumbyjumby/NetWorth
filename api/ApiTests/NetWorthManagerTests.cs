using DemoApi.Controllers;
using DemoApi.Data;
using DemoApi.Models;
using Microsoft.AspNetCore.Mvc;
using Moq;
using NUnit.Framework;
using System;
using System.Collections.Generic;

namespace Tests
{
    public class NetWorthManagerTests
    {
        Mock<IManageData> _mockDataManager;
        Mock<IManageCurrency> _mockCurrencyManager;
        NetWorth _model;
        [SetUp]
        public void Setup()
        {
            _model = new NetWorth
            {
                RecordId = "bingo",
                Entries = new List<FinancialRecord>
                {
                    new FinancialRecord{
                        Id=1,
                        Currency="CDN",
                        RecordType=RecordType.ShortTermAsset,
                        Name="Chequing",
                        Rate=10.5,
                        Value=1000},
                    new FinancialRecord{
                        Id=2,
                        Currency="CDN",
                        RecordType=RecordType.ShortTermLiability,
                        Name="Mortgage",
                        Rate=10.5,
                        Value=1000}
                }
            };

            _mockDataManager = new Mock<IManageData>();
            _mockDataManager.Setup(x => x.Read(It.IsAny<string>())).Returns<string>(y => _model);

            _mockCurrencyManager = new Mock<IManageCurrency>();
            _mockCurrencyManager.Setup(x => x.GetExchangeRate(It.IsAny<string>())).Returns<double>(y => .5);

        }

        [Test]
        public void CalculateNetWorthMustCalculateCorrectly()
        {
            _mockCurrencyManager = new Mock<IManageCurrency>();
            _mockCurrencyManager.Setup(x => x.GetExchangeRate(It.IsAny<string>())).Returns<string>(y => 1);
            var controller = new MainController(_mockCurrencyManager.Object, _mockDataManager.Object);

            var netWorth = new NetWorth
            {
                Currency = "CDN",
                Entries = new List<FinancialRecord>
               {
                   new FinancialRecord{
                        Id=1,
                        RecordType=RecordType.ShortTermAsset,
                        Name="Chequing",
                        Rate=10.5,
                        Value=2000},
                    new FinancialRecord{
                        Id=2,
                        RecordType=RecordType.ShortTermLiability,
                        Name="Mortgage",
                        Rate=10.5,
                        Value=1000}
                },
                RecordId="TheRecord"
               
            };
            _mockDataManager.Setup(x => x.Read(It.IsAny<string>())).Returns<string>(y => netWorth);
            var result = controller.CalculateNetWorth(netWorth);

            Assert.NotNull(result);
            Assert.AreEqual(2000, result.TotalAssets);
            Assert.AreEqual(1000, result.TotalLiabilities);
            Assert.AreEqual(1000, result.TotalNetWorth);

        }

        [Test]
        public void CalculateNetWorthMustReturnNullIfNullGiven()
        {
            _mockCurrencyManager = new Mock<IManageCurrency>();
            _mockCurrencyManager.Setup(x => x.GetExchangeRate(It.IsAny<string>())).Returns<string>(y => 1);
            var controller = new MainController(_mockCurrencyManager.Object, _mockDataManager.Object);

            var netWorth = new NetWorth
            {
                Currency = "CDN",
                Entries = new List<FinancialRecord>
               {
                   new FinancialRecord{
                        Id=1,
                        RecordType=RecordType.ShortTermAsset,
                        Name="Chequing",
                        Rate=10.5,
                        Value=2000},
                    new FinancialRecord{
                        Id=2,
                        RecordType=RecordType.ShortTermLiability,
                        Name="Mortgage",
                        Rate=10.5,
                        Value=1000}
                }
            };
            _mockDataManager.Setup(x => x.Read(It.IsAny<string>())).Returns<string>(y => netWorth);
            var result = controller.CalculateNetWorth(null);
            Assert.Null(result);
           
        }

        [Test]
        public void CalculateNetWorthMustReturnNullIfNoEntries()
        {
            _mockCurrencyManager = new Mock<IManageCurrency>();
            _mockCurrencyManager.Setup(x => x.GetExchangeRate(It.IsAny<string>())).Returns<string>(y => 1);
            var controller = new MainController(_mockCurrencyManager.Object, _mockDataManager.Object);

            var netWorth = new NetWorth
            {
                Currency = "CDN",
                Entries = null
            };
            _mockDataManager.Setup(x => x.Read(It.IsAny<string>())).Returns<string>(y => netWorth);
            var result = controller.CalculateNetWorth(netWorth);
            Assert.Null(result);

        }
        /*
              [Test]
              public void updateSpecificFinancialRecordShouldOnlyUpdateThatRecord()
              {
                  var manager = new NetWorthManager(_mockDataManager.Object);
                  var netWorth = manager.GetNetWorth("bingo");
                  Assert.IsNotNull(netWorth);

                  var model = new UpdateFinancialRecord
                  {
                      RecordId = "bingo",
                      FrId = _model.Entries[0].Id,
                      NewRate = 1234,
                      NewValue = 4321
                  };
                  manager.UpdateNetWorth(model);

                  var newNetWorth = manager.GetNetWorth("bingo");
                  Assert.AreEqual(model.NewRate, newNetWorth.Entries[0].Rate);
                  Assert.AreEqual(model.NewValue, newNetWorth.Entries[0].Value);
              }

              [Test]
              public void PostingNetWorthRecordShouldReturnCorrectTotals()
              {
                  var model = new NetWorth
                  {
                      RecordId = "myrecord",
                      Entries = new List<FinancialRecord>
                      {
                          new FinancialRecord{
                              Id=1,
                              Currency="CDN",
                              RecordType=RecordType.ShortTermAsset,
                              Name="Chequing",
                              Rate=10.5,
                              Value=1000},
                          new FinancialRecord{
                              Id=2,
                              Currency="CDN",
                              RecordType=RecordType.LongTermAsset,
                              Name="Mortgage",
                              Rate=10.5,
                              Value=2000},
                          new FinancialRecord{
                              Id=1,
                              Currency="CDN",
                              RecordType=RecordType.ShortTermLiability,
                              Name="Chequing",
                              Rate=10.5,
                              Value=3000},
                          new FinancialRecord{
                              Id=2,
                              Currency="CDN",
                              RecordType=RecordType.LongTermLiability,
                              Name="Mortgage",
                              Rate=10.5,
                              Value=4000}
                      }
                  };
                  _mockDataManager.Setup(x => x.Read(It.IsAny<string>())).Returns<string>(y => model);
                  var manager = new NetWorthManager(_mockDataManager.Object);
                  var result = manager.CalculateNetWorth(model);

                  Assert.AreEqual(3000, result.TotalAssets);
                  Assert.AreEqual(7000, result.TotalLiabilities);
                  Assert.AreEqual(-4000, result.TotalNetWorth);
              }*/


        // setting value should update total and net worth
        // changing currency should return correct exchange rate
        // changing currency should adjust editable rows

        // ui tests
        // changing currency should change row value
        // changing row should reflect in the totals
    }
}

/*Problem statement - net worth calculator for assets and liabilities																				
																				
You want to design a simple web based net worth calculator for people to use.  You have a mockup in a spreadsheet - see the Net Worth Tracker tab in this workbook. You will track assets and liabilities only.  For your proof of concept, you will populate the rows in the tables by default, the user will not be able to add or remove rows.																				
																				
																				
Requirements																				
The client web UI will display two tables, assets and liabilities. Initially, the data should be stored in the front end in javascript and rendered to the UI using templates (react, backbone, angular).																				
Account line amounts should be editable.																				
When an account line amount is edited, a request should be sent to the server which will calculate the totals and net worth and return them.																				
The UI will render the calculated amounts upon response from the server.																				
The "Select Currency" list should be a drop down with ten hard coded currency code values of your choice. The currency should be included in the payload to the service, and the service should call an upstream service to get an exchange rate to apply to the totals. 																				
The service should also return adjusted account line amounts in the new currency for each of the editable rows. The updated values should be formatted for the currency of selection and include the new currency sign on the left for each of the updated values. 																				
The service should include unit tests to cover all API calls.	


    Edit field, send to controller { currency, value, fieldName }, returns {currency, networth, total assets/liabilities};
    Edit currency, send to controller { currency }, return {currency, assets, liabilities, networth, total} 

    array of assets, array of liabilities
*/
