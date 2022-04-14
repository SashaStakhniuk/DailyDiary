using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DailyDiary.Models
{
    public static class InitialIdentity
    {
        public static void Initialize(IdentityContext db) 
        {
            //Teacher teacher = new Teacher { LastName = "Klar", UserName = "Alex", Base64URL = "URL" };
            User student = new User { LastName = "Oliver", UserName = "Dnis" };
            //db.Users.Add(teacher);
            db.Users.Add(student);

            db.SaveChanges();
        }
    }
}
