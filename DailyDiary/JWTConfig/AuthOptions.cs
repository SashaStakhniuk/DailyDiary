using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DailyDiary.JWTConfig
{
    public class AuthOptions
    {
        public const string ISSURER = "MVCDailyDiary";
        public const string AUDIENCE = "SomeClient";
        const string KEY = "MyKeyWith_256_BIT_Information";
        public const int LIFETIME = 65;
        public static SymmetricSecurityKey GetSymmetricSecurityKey()
        {
            return new SymmetricSecurityKey(Encoding.Default.GetBytes(KEY));
        }
    }
}
