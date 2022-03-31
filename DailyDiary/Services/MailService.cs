using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;

namespace DailyDiary.Services
{
    public static class MailService
    {
        public static void SendLoginAndPassword(string Login, string Password, string StudentEmail)
        {
            MailMessage mail_message = new MailMessage();
            mail_message.IsBodyHtml = true;
            mail_message.Subject = "ItStep";
            mail_message.From = new MailAddress("itsteo@gmail.com", "Ваш новый логин и пароль");
            mail_message.To.Add(StudentEmail);
            //mail_message.Attachments.Add(new Attachment(@"C:\Users\Denis\Pictures\porshcke.jpg"));
            mail_message.Body = $"<h1>Вас приведствует ItStep</h1>\n<h1>Ваш логин и пароль для входа в личный кабинет:</h1>\n<h2>Login - {Login}\nPassword - {Password}</h2>";
            using (SmtpClient client = new SmtpClient("smtp.gmail.com"))
            {
                client.Credentials = new NetworkCredential("denisdrokson@gmail.com", "tolik050103SAND");
                client.Port = 587; //порт 587 (сервисы гугла) либо 465 (яндекс)
                client.EnableSsl = true;
                client.Send(mail_message);
            }
            //count++;
        }
    }
}
