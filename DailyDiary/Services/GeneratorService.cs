using DailyDiary.Models;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DailyDiary.Services
{
    public  class GeneratorService
    {
        UserManager<User> userManager;
       public GeneratorService(UserManager<User> userManager)
        {
            this.userManager = userManager;
        }
        public async Task<string> GenerateNewLogin(string userLastName)
        {
            StringBuilder str = new StringBuilder();
            Random rand = new Random();
            char[] chr = { '_', '#', '-', '%' };

            bool firstVowel = rand.Next(0, 2) == 0;
            if (firstVowel)
            {
                
                str.Append(userLastName.Substring(0,rand.Next(userLastName.Length)));

                int index = rand.Next(3);
                int numbers = rand.Next(200);
                int randElement = rand.Next(str.Length);
                str.Insert(str.Length, chr[index].ToString(), 1);
                //str.Remove(randElement + 1, 1);

                str.Insert(str.Length, "_", 1);
                str.Insert(str.Length, Convert.ToString(numbers), 1);
            }
            else
            {
                //string upperStr = UserName.ToUpper();
                //str.Append(upperStr);

                int index = rand.Next(3);
                int numbers = rand.Next(100);
                int randElement = rand.Next(str.Length);
                str.Insert(randElement, chr[index].ToString(), 1);
                //str.Remove(randElement + 1, 1);

                str.Insert(str.Length, "_", 1);
                str.Insert(str.Length, Convert.ToString(numbers), 2);
            }
            
            return await userManager.FindByNameAsync(str.ToString()) == null? str.ToString(): await GenerateNewLogin(userLastName);
        }

        //public static string CreatePassword(int length = 0, string userName = "")
        //{
        //    const string valid = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
        //    const string chars = "@#$%&";
        //    int size = 2;
        //    StringBuilder res = new StringBuilder();
        //    Random rnd = new Random();
        //    while (0 < length--)
        //    {
        //        res.Append(valid[rnd.Next(valid.Length)]);
        //        while (0 < size--)
        //        {
        //            res.Append(chars[rnd.Next(chars.Length)]);
        //        }
        //    }
        //    res.Append(userName.ToUpper());
        //    return res.ToString();
        //}
        public string CreatePassword(PasswordOptions opts = null) //GenerateRandomPassword
        {
            if (opts == null) opts = new PasswordOptions()
            {
                RequiredLength = 8,
                RequiredUniqueChars = 4,
                RequireDigit = true,
                RequireLowercase = true,
                RequireNonAlphanumeric = true,
                RequireUppercase = true
            };

            string[] randomChars = new[] {
            "ABCDEFGHJKLMNOPQRSTUVWXYZ",    // uppercase 
            "abcdefghijkmnopqrstuvwxyz",    // lowercase
            "0123456789",                   // digits
            "!@$?_-"                        // non-alphanumeric
        };

            Random rand = new Random(Environment.TickCount);
            List<char> chars = new List<char>();

            if (opts.RequireUppercase)
                chars.Insert(rand.Next(0, chars.Count),
                    randomChars[0][rand.Next(0, randomChars[0].Length)]);

            if (opts.RequireLowercase)
                chars.Insert(rand.Next(0, chars.Count),
                    randomChars[1][rand.Next(0, randomChars[1].Length)]);

            if (opts.RequireDigit)
                chars.Insert(rand.Next(0, chars.Count),
                    randomChars[2][rand.Next(0, randomChars[2].Length)]);

            if (opts.RequireNonAlphanumeric)
                chars.Insert(rand.Next(0, chars.Count),
                    randomChars[3][rand.Next(0, randomChars[3].Length)]);

            for (int i = chars.Count; i < opts.RequiredLength
                || chars.Distinct().Count() < opts.RequiredUniqueChars; i++)
            {
                string rcs = randomChars[rand.Next(0, randomChars.Length)];
                chars.Insert(rand.Next(0, chars.Count),
                    rcs[rand.Next(0, rcs.Length)]);
            }

            return new string(chars.ToArray());
        }
    }
}
