using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace DailyDiary.Models
{
    public class InitialIdentity
    {
        private static string _mainAdminRoleName = "MainAdmin";
        private static string _mainAdminPassword = "Qwerty1!";

        public static async Task Initialize(IServiceProvider serviceProvider)
        {
            var roleManager = serviceProvider.GetRequiredService<RoleManager<IdentityRole>>();
            var userManager = serviceProvider.GetRequiredService<UserManager<User>>();

           
            var rolesExist = await roleManager.Roles.ToListAsync();
            if (rolesExist.Count() == 0)
            {
                await roleManager.CreateAsync(new IdentityRole(_mainAdminRoleName));
                await roleManager.CreateAsync(new IdentityRole("Admin"));
                await roleManager.CreateAsync(new IdentityRole("Teacher"));
                await roleManager.CreateAsync(new IdentityRole("Student"));
                //await roleManager.CreateAsync(new IdentityRole("User"));
                await roleManager.CreateAsync(new IdentityRole("Parrent"));
            }
            if (!userManager.Users.Any())
            {
                //var roles = await roleManager.Roles.ToListAsync();
                List<User> users = new List<User>();
                // User admin1 = new User { UserName = "Denis",LastName = "Rachkovskiy"};
                // User admin2 = new User { UserName = "Sasha",LastName="Stakhniuk", Email = "sstahnuk@gmail.com" };
                 User admin1 = new User { UserName = "DenisLogin"};
                 User admin2 = new User { UserName = "SashaLogin", Email = "sstahnuk@gmail.com" };
                users.Add(admin1);
                users.Add(admin2);
                foreach (var user in users)
                {
                    var result = await userManager.CreateAsync(user,_mainAdminPassword);
                    if (result.Succeeded)
                    {
                        //foreach(var role in roles)
                        //{
                        //    await userManager.AddToRoleAsync(user, role.Name);
                        //}
                        await userManager.AddToRoleAsync(user, _mainAdminRoleName);
                    }
                }
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
