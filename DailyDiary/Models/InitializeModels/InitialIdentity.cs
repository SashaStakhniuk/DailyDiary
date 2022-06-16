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
            User student = new User { UserName = "Dnis"};
            db.Users.Add(student);
            db.SaveChanges();
        }
    }
}
