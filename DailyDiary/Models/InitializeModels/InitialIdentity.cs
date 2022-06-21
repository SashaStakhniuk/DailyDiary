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
            if (!db.Users.Any())
            {
                User student = new User { UserName = "Denis Rachkovskiy" };
                User student1 = new User { UserName = "Sasha Stakhniuk", Email = "sstahnuk@gmail.com"};
                db.Users.AddRange(student,student1);
                db.SaveChanges();
            }
         
        }
    }
}
