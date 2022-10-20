using DailyDiary.Models;
using Nancy.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using Telegram.Bot.Types.ReplyMarkups;

namespace DailyDiary_Bot
{
    public static class Service
    {
        public static List<Group> GetAllGroups()
        {
            try
            {
                var URL = "https://localhost:44364/api/group/get";
                var request = WebRequest.Create(URL);
                request.Method = "GET";

                using var webResponse = request.GetResponse();
                using var webStream = webResponse.GetResponseStream();
                using var reader = new StreamReader(webStream);
                var jsonData = reader.ReadToEnd();
                List<Group> groups = new JavaScriptSerializer().Deserialize<List<Group>>(jsonData);
                return groups;
            }
            catch (Exception ex) { }
            return null;
        }
    }
}
