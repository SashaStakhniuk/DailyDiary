using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;

namespace DailyDiary.Models
{
    public class EmailTwoFactor
    {
        public static bool SendEmailTwoFactorCode(string userEmail, string code, string subject, string messageForUser)
        {

            var fromAddress = new MailAddress("messagess40@gmail.com", "DairyLine");
            var toAddress = new MailAddress(userEmail, "User");
            //const string fromPassword = "MessageForYou";
            const string fromPassword = "gpxwyuybsafwdgdm";

            //const string subject = "Confirm your email";//"Two Factor Authorization Code";
            string body = $"<div style='text-align:center;'>" +
                          $"<div>" +
                          $"<h1>{messageForUser}</h1>" +
                          $"<h2 style='text-align: justify;'>{code}</h2>" +
                          $"</<div>" +
                          $"</<div>";

            var smtp = new SmtpClient
            {
                Host = "smtp.gmail.com",
                Port = 587,//587
                DeliveryMethod = SmtpDeliveryMethod.Network,
                UseDefaultCredentials = false,
                EnableSsl = true,
                Credentials = new NetworkCredential(fromAddress.Address, fromPassword)
            };
            using (var message = new MailMessage(fromAddress, toAddress)
            {
                Subject = subject,
                IsBodyHtml = true,
                Body = body
            })
                try
                {
                    
                    smtp.SendMailAsync(message).Wait();
                    //smtp.Send(message);     
                    //client.Send(mailMessage);
                    return true;
                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex);
                }
            return false;
        }
    }
}
