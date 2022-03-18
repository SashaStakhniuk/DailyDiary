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

        public static string GenerateNewPassword()
        {
            StringBuilder password = new StringBuilder();
            Random rand = new Random();
            int nums = rand.Next(10, 100);
            for (int i = 0; i < 6; i++)
            {
                password.Append((char)rand.Next(50, 100));

            }
            password.Insert(password.Length, nums.ToString(), 2);
            return password.ToString();
        }
    }
}
