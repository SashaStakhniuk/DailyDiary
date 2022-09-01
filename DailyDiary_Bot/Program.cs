using System;
using System.Threading;
using System.Threading.Tasks;
using Telegram.Bot;
using Telegram.Bot.Extensions.Polling;
using Telegram.Bot.Types;
using Telegram.Bot.Exceptions;
using System.Net;
using System.IO;
using DailyDiary.Models;
using System.Collections.Generic;
using System.Linq;
using System.Xml.Serialization;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;
using Nancy.Json;
using System.Text;
using Telegram.Bot.Types.ReplyMarkups;

namespace TelegramBotExperiments
{

    class Program
    {
        private static string token { get; } = "5686227033:AAGiHsMQfF9aFUKaazCODMGrG3Z-zOl7A6M";
        private static ITelegramBotClient bot = new TelegramBotClient(token);
        public static async Task HandleUpdateAsync(ITelegramBotClient botClient, Update update, CancellationToken cancellationToken)
        {
            Console.WriteLine(JsonConvert.SerializeObject(update));
            if (update.Type == Telegram.Bot.Types.Enums.UpdateType.Message)
            {
                var message = update.Message;
                if (message.Text.ToLower() == "/start")
                {
                    await botClient.SendTextMessageAsync(message.Chat, "Добро пожаловать на борт, добрый путник!");
                    return;
                }
                if (message.Text.ToLower() == "get all groups")
                {
                    try
                    {
                        InlineKeyboardMarkup keyboard = GetAllGroups();

                        await bot.SendTextMessageAsync(message.Chat, "Message", replyMarkup: keyboard);
                    }
                    catch(Exception e) { }
                }
                if (message.Text.ToLower() == "span")
                {
                    //await bot.SendTextMessageAsync("https://t.me/@rachkovskyi_denis", "Test message");
                }
                if(message.Text.ToLower() == "options")
                {
                    InlineKeyboardButton urlButton = new InlineKeyboardButton("Url 1");
                    InlineKeyboardButton urlButton2 = new InlineKeyboardButton("Url 2");
                    InlineKeyboardButton urlButton3 = new InlineKeyboardButton("Url 3");
                    InlineKeyboardButton urlButton4 = new InlineKeyboardButton("Url 4");

                    urlButton.Text = "Go URL1";
                    
                    urlButton.Url = "https://www.google.com/";

                    urlButton2.Text = "Go URL2";
                    urlButton2.Url = "https://www.bing.com/";

                    urlButton3.Text = "Go URL3";
                    urlButton3.Url = "https://www.duckduckgo.com/";

                    urlButton4.Text = "Go URL4";
                    urlButton4.Url = "https://stackoverflow.com/";

                    InlineKeyboardButton[] row1 = new InlineKeyboardButton[] { urlButton };
                    InlineKeyboardButton[] row2 = new InlineKeyboardButton[] { urlButton2, urlButton3 };
                    InlineKeyboardButton[] row3 = new InlineKeyboardButton[] { urlButton4 };

                    InlineKeyboardButton[][] buttons = new InlineKeyboardButton[][] { row1, row2, row3 };
                    InlineKeyboardMarkup keyboard = new InlineKeyboardMarkup(buttons);

                    InlineKeyboardMarkup inline = new InlineKeyboardMarkup(buttons);

                    await bot.SendTextMessageAsync(message.Chat, "Message", replyMarkup: keyboard);
                }
            }
        }

        private static InlineKeyboardMarkup GetAllGroups()
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

                InlineKeyboardButton urlButton = new InlineKeyboardButton("Title");
                InlineKeyboardButton[] row1 = new InlineKeyboardButton[] { urlButton };
                List<InlineKeyboardButton[]> buttons = new List<InlineKeyboardButton[]>() { row1 };

                InlineKeyboardMarkup keyboard = new InlineKeyboardMarkup(buttons);
                
                /*foreach (var group in groups)
                {
                    InlineKeyboardButton urlButton = new InlineKeyboardButton(group.Title);
                    buttons.Add(row);
                }*/

                InlineKeyboardMarkup inline = new InlineKeyboardMarkup(buttons);
                return keyboard;
            }
            catch(Exception ex) { }
            return null;
        }

        public static async Task HandleErrorAsync(ITelegramBotClient botClient, Exception exception, CancellationToken cancellationToken)
        {
            Console.WriteLine(Newtonsoft.Json.JsonConvert.SerializeObject(exception));
        }
        /*Console.WriteLine("Запущен бот " + bot.GetMeAsync().Result.FirstName);

 var cts = new CancellationTokenSource();
 var cancellationToken = cts.Token;
 var receiverOptions = new ReceiverOptions
 {
     AllowedUpdates = { },
 };
 bot.StartReceiving(
     HandleUpdateAsync,
     HandleErrorAsync,
     receiverOptions,
     cancellationToken
 );*/
        static void Main(string[] args)
        {

        }
    }
}
