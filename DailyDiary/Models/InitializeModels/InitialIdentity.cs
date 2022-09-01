using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
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
                Subject subject1 = new Subject { Title = "C#" };
                Subject subject2 = new Subject { Title = "Math" };
                Subject subject3 = new Subject { Title = "Health" };
                Subject subject4 = new Subject { Title = "Art" };
                Subject subject5 = new Subject { Title = "Music" };
                Subject subject6 = new Subject { Title = "English" };
                Subject subject7 = new Subject { Title = "Algebra" };
                Subject subject8 = new Subject { Title = "Geometry" };
                Subject subject9 = new Subject { Title = "Physical Science" };
                Subject subject10 = new Subject { Title = "Geography" };
                Subject subject11 = new Subject { Title = "Computer Science" };
                
                if(!db.Subjects.Any())
                {
                    db.Subjects.AddRange(subject1, subject2, subject3, subject4, subject5, subject6, subject7, subject8, subject9) ;
                    db.SaveChangesAsync();
                }

                //RegistaratinAdmins(db);
                db.SaveChanges();
            }
        }
        private async static void RegistaratinAdmins(IdentityContext context)
        {
            var store = new UserStore<User>(context);
            var manager = new UserManager<User>(store, null, null, null, null, null, null, null, null);

            User admin1 = new User { UserName = "Denis Rachkovskiy" };
            User admin2 = new User { UserName = "Sasha Stakhniuk", Email = "sstahnuk@gmail.com" };

            IdentityResult result = await manager.CreateAsync(admin1, "DenisRachkovskyADMIN12345admin007");
            IdentityResult result2 = await manager.CreateAsync(admin2, " SashaStakhniukADMIN12345admin007");

            if(result.Succeeded & result2.Succeeded)
            {
                context.Users.AddRange(admin1, admin2);
                context.SaveChanges();
            }
        }
    }
}
