using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DailyDiary.Models
{
    public static class InitialIdentity
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
                User admin1 = new User { UserName = "DenisLogin" };
                User admin2 = new User { UserName = "SashaLogin", Email = "sstahnuk@gmail.com" };
                users.Add(admin1);
                users.Add(admin2);
                foreach (var user in users)
                {
                    var result = await userManager.CreateAsync(user, _mainAdminPassword);
                    if (result.Succeeded)
                    {
                        //foreach(var role in roles)
                        //{
                        //    await userManager.AddToRoleAsync(user, role.Name);
                        //}
                        await userManager.AddToRoleAsync(user, _mainAdminRoleName);
                    }
                }
            }
        }
    }
}
