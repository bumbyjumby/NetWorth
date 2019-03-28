using DemoApi.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace DemoApi.Data
{
    public class FileDataManager : IManageData
    {
        private string fileName = "TheRecord.json";
        
        public void CreateOrUpdate(NetWorth model)
        {
            List<NetWorth> database;
            using (StreamReader file = File.OpenText(fileName))
            {
                JsonSerializer serializer = new JsonSerializer();
                database = (List<NetWorth>)serializer.Deserialize(file, typeof(List<NetWorth>));

                if(database == null)
                {
                    database = new List<NetWorth>();
                }

                var found = database.Find(x => x.RecordId == model.RecordId);
                if (found != null)
                {
                    var index = database.IndexOf(found);
                    database[index] = model;
                } else
                {
                    database.Add(model);
                }
                file.Close();
            }

            using (StreamWriter file = File.CreateText(fileName))
            {
                JsonSerializer serializer = new JsonSerializer();
                //serialize object directly into file stream
                serializer.Serialize(file, database);
                file.Close();
            }
        }

        public void Delete(string recordId)
        {
            List<NetWorth> database;
            using (StreamReader file = File.OpenText(fileName))
            {
                JsonSerializer serializer = new JsonSerializer();
                database = (List<NetWorth>)serializer.Deserialize(file, typeof(List<NetWorth>));

                var found = database.Find(x => x.RecordId == recordId);
                database.Remove(found);
                file.Close();

            }

            using (StreamWriter file = File.CreateText(fileName))
            {
                JsonSerializer serializer = new JsonSerializer();
                //serialize object directly into file stream
                serializer.Serialize(file, database);
                file.Close();
            }
        }

        public NetWorth Read(string recordId)
        {
            using (StreamReader file = File.OpenText(fileName))
            {
                JsonSerializer serializer = new JsonSerializer();
                var database = (List<NetWorth>)serializer.Deserialize(file, typeof(List<NetWorth>));

                var found = database.Find(x => x.RecordId == recordId);
                file.Close();
                return found;
            }
        }   
        
        public List<NetWorth> ReadAll()
        {
            using (StreamReader file = File.OpenText(fileName))
            {
                JsonSerializer serializer = new JsonSerializer();
                var database = (List<NetWorth>)serializer.Deserialize(file, typeof(List<NetWorth>));
                file.Close();
                return database;
            }
        }
    }
}
