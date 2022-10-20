using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TelegramBotBase.Base;
using TelegramBotBase.Form;

namespace TelegramBotBaseTest.Tests
{
    public class Menu : AutoCleanForm
    {
        public Menu()
        {
            this.DeleteMode = TelegramBotBase.Enums.eDeleteMode.OnLeavingForm;
        }

        public override async Task Load(MessageResult message)
        {

            if (message.Message.Chat.Type == Telegram.Bot.Types.Enums.ChatType.Group | message.Message.Chat.Type == Telegram.Bot.Types.Enums.ChatType.Supergroup)
            {
                var sf = new TelegramBotBaseTest.Tests.Groups.WelcomeUser();

                await this.NavigateTo(sf);
            }
            await Device.HideReplyKeyboard();
        }

        public override async Task Action(MessageResult message)
        {
            var call = message.GetData<CallbackData>();

            await message.ConfirmAction();

            if (call == null)
                return;

            message.Handled = true;

            switch (call.Value)
            {
                case "groups":
                    var sf = new GroupsList();
                    await this.NavigateTo(sf);
                    break;
                case "students":

                default:
                    message.Handled = false;
                    break;
            }
        }

        public override async Task Render(MessageResult message)
        {

            ButtonForm btn = new ButtonForm();

            btn.AddButtonRow(new ButtonBase("Get all Groups", new CallbackData("a", "groups").Serialize()), new ButtonBase("Get all Students", new CallbackData("a", "students").Serialize()));

            await this.Device.Send("Choose your test:", btn);
        }
    }
}
