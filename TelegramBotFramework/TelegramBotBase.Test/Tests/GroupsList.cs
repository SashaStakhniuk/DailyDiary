using DailyDiary.Models;
using DailyDiary_Bot;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using TelegramBotBase.Base;
using TelegramBotBase.Form;

namespace TelegramBotBaseTest.Tests
{
    class GroupsList : AutoCleanForm
    {

        public GroupsList()
        {
            this.DeleteSide = TelegramBotBase.Enums.eDeleteSide.Both;
            this.DeleteMode = TelegramBotBase.Enums.eDeleteMode.OnLeavingForm;

            this.Opened += GroupsList_Opened;
        }

        private async Task GroupsList_Opened(object sender, EventArgs e)
        {
            await this.Device.Send("Hello world! (send 'back' to get back to Start)\r\nOr\r\nhi, hello, maybe, bye and ciao");
        }

        public override async Task Load(MessageResult message)
        {
            var messageId = message.MessageId;

            switch (message.Command)
            {
                case "groups":
                case "hi":
                    List<Group> groups = Service.GetAllGroups();
                    break;
                case "bye":
                case "ciao":
                    await this.Device.Send("Ok, take care !");
                    break;
                case "back":
                    var st = new Menu();
                    await this.NavigateTo(st);
                    break;
            }
        }
    }
}
