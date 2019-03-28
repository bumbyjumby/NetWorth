using DemoApi.Data;
using DemoApi.Models;
using NUnit.Framework;
using System;
using System.Collections.Generic;

namespace Tests
{
    public class FileManagerTests
    {
        [SetUp]
        public void Setup()
        {
            var fileManager = new FileDataManager();
            var database = fileManager.ReadAll();
            if (database != null)
            {
                database.ForEach(x => fileManager.Delete(x.RecordId));
            }
        }

        [Test]
        public void mustWriteDocumentIfDoesntExists()
        {
            var fileManager = new FileDataManager();

            var model = new NetWorth
            {
                RecordId = "bingo",
                Entries = new List<FinancialRecord>
                {
                    new FinancialRecord{
                        Id=3,
                        Currency="CDN",
                        RecordType=RecordType.ShortTermAsset,
                        Name="Chequing",
                        Rate=10.5,
                        Value=1000},
                    new FinancialRecord{
                        Id=4,
                        Currency="CDN",
                        RecordType=RecordType.ShortTermLiability,
                        Name="Mortgage",
                        Rate=10.5,
                        Value=1000}
                }
            };
            fileManager.CreateOrUpdate(model);

            var foundModel = fileManager.Read(model.RecordId);
            Assert.IsNotNull(foundModel);


        }

        [Test]
        public void mustUpdateDocumentIftExists()
        {
            var fileManager = new FileDataManager();

            var model = new NetWorth
            {
                RecordId = "bingo",
                Entries = new List<FinancialRecord>
                {
                    new FinancialRecord{
                        Id=3,
                        Currency="CDN",
                        RecordType=RecordType.ShortTermAsset,
                        Name="Chequing",
                        Rate=10.5,
                        Value=1000},
                    new FinancialRecord{
                        Id=4,
                        Currency="CDN",
                        RecordType=RecordType.ShortTermLiability,
                        Name="Mortgage",
                        Rate=10.5,
                        Value=1000}
                }
            };
            fileManager.CreateOrUpdate(model);

            var model2 = new NetWorth
            {
                RecordId = "bingo",
                Entries = new List<FinancialRecord>
                {
                    new FinancialRecord{
                        Id=model.Entries[0].Id,
                        Currency="CDN",
                        RecordType=RecordType.ShortTermAsset,
                        Name="Chequing",
                        Rate=999,
                        Value=1000},
                    new FinancialRecord{
                        Id=model.Entries[1].Id,
                        Currency="CDN",
                        RecordType=RecordType.ShortTermLiability,
                        Name="Mortgage",
                        Rate=999,
                        Value=1000}
                }
            };
            fileManager.CreateOrUpdate(model2);

            var found = fileManager.Read("bingo");
            Assert.IsNotNull(found);
            Assert.AreEqual(model2.Entries[0].Rate, found.Entries[0].Rate);


        }

        // Test read nonexistent record


        [Test]
        public void getNullIfNoRecordExists()
        {
            var fileManager = new FileDataManager();

            var model = new NetWorth
            {
                RecordId = "bingo",
                Entries = new List<FinancialRecord>
                {
                    new FinancialRecord{
                        Id=3,
                        Currency="CDN",
                        RecordType=RecordType.ShortTermAsset,
                        Name="Chequing",
                        Rate=10.5,
                        Value=1000},
                    new FinancialRecord{
                        Id=4,
                        Currency="CDN",
                        RecordType=RecordType.ShortTermLiability,
                        Name="Mortgage",
                        Rate=10.5,
                        Value=1000}
                }
            };
            fileManager.CreateOrUpdate(model);

            var foundModel = fileManager.Read("hoogeRecord");
            Assert.IsNull(foundModel);
        }
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
