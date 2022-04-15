using DailyDiary.Models;
using DailyDiary.Models.ViewModels;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MVCBikeShop.Models.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DailyDiary.Controllers.APIControllers
{
    public class AccountController : Controller
    {
        private readonly RoleManager<IdentityRole> roleManager;
        private readonly UserManager<User> userManager;
        private readonly SignInManager<User> signInManager;

        public AccountController(UserManager<User> userManager, SignInManager<User> signInManager, RoleManager<IdentityRole> roleManager)
        {
            this.userManager = userManager;
            this.roleManager = roleManager;
            this.signInManager = signInManager;
        }
        //public IActionResult Login(string returnUrl = null)
        //{
        //    //LoginViewModel model=new LoginViewModel();
        //    return View(new LoginViewModel { ReturnUrl = returnUrl });
        //    //return View(model);
        //}

        [HttpPost]
        [AutoValidateAntiforgeryToken]
        public async Task<IActionResult> Login(LoginViewModel model)
        {
            if (ModelState.IsValid)
            {
                var user = await userManager.FindByEmailAsync(model.Email);
                var result = await signInManager.PasswordSignInAsync(user.UserName, model.Password, model.RememberMe, false);
                if (result.Succeeded)
                {
                    if (!string.IsNullOrEmpty(model.ReturnUrl) && Url.IsLocalUrl(model.ReturnUrl))
                    {
                        return Redirect(model.ReturnUrl);
                    }
                    else
                    {
                        return RedirectToAction("Index", "Home"); // перенаправлення на сорінку входу

                        //return RedirectToAction("Index", "Home");
                    }
                }
                else
                {
                    ModelState.AddModelError("", "Invalid login or password");
                    return BadRequest(ModelState);
                }
            }
            return Ok(model);
        }
        //public IActionResult Register()
        //{
        //    RegisterViewModel model = new RegisterViewModel();
        //    return View(model);
        //}
        [HttpPost]
        [AutoValidateAntiforgeryToken]
        public async Task<IActionResult> Register(RegisterViewModel model)
        {
            if (ModelState.IsValid)
            {
                var roles = await roleManager.Roles.ToListAsync();
                if (roles.Count() == 0)
                {
                    await roleManager.CreateAsync(new IdentityRole("MainAdmin"));
                    await roleManager.CreateAsync(new IdentityRole("Admin"));
                    await roleManager.CreateAsync(new IdentityRole("Teacher"));
                    await roleManager.CreateAsync(new IdentityRole("Student"));
                    await roleManager.CreateAsync(new IdentityRole("User"));
                }

                User user = new User { Email = model.Email, UserName = model.UserName };
                IdentityResult result = await userManager.CreateAsync(user, model.Password);
                if (result.Succeeded)
                {
                    List<string> role = new List<string>();

                    if (user.Email == "MainAdmin@gmail.com" && user.UserName == "Main")
                    {
                        role.Add("MainAdmin");
                    }
                    else
                    {
                        role.Add("User");
                    }
                    await userManager.AddToRolesAsync(user, role);
                    await signInManager.SignInAsync(user, false);
                    return RedirectToAction("Index", "Home"); // перенаправити на сторінку входу

                    //return RedirectToAction("Index", "Home");
                }
                else
                {
                    foreach (var error in result.Errors)
                    {
                        ModelState.AddModelError("", error.Description);
                    }
                    return BadRequest(ModelState);
                }
            }
            return Ok(model);
        }

        [HttpPost]
        [AutoValidateAntiforgeryToken]
        public async Task<IActionResult> Logout()
        {
            await signInManager.SignOutAsync();
            return RedirectToAction("Index", "Home");
        }
    }
}
