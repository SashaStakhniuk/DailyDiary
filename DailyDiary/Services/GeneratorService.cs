using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DailyDiary.Services
{
    public static class GeneratorService
    {
        public static string GenerateNewLogin(string UserName)
        {
            StringBuilder str = new StringBuilder();
            Random rand = new Random();
            char[] chr = { '_', '#', '-', '%' };

            bool firstVowel = rand.Next(0, 2) == 0 ? true : false;
            if (true)
            {
                str.Append(UserName);

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
                string upperStr = UserName.ToUpper();
                str.Append(upperStr);

                int index = rand.Next(3);
                int numbers = rand.Next(100);
                int randElement = rand.Next(str.Length);
                str.Insert(randElement, chr[index].ToString(), 1);
                //str.Remove(randElement + 1, 1);

                str.Insert(str.Length, "_", 1);
                str.Insert(str.Length, Convert.ToString(numbers), 2);
            }

            return str.ToString();
        }

        public static string CreatePassword(int length = 0, string userName = "")
        {
            const string valid = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
            const string chars = "@#$%&";
            int size = 2;
            StringBuilder res = new StringBuilder();
            Random rnd = new Random();
            while (0 < length--)
            {
                res.Append(valid[rnd.Next(valid.Length)]);
                while (0 < size--)
                {
                    res.Append(chars[rnd.Next(chars.Length)]);
                }
            }
            res.Append(userName.ToUpper());
            return res.ToString();
        }
    }
}
