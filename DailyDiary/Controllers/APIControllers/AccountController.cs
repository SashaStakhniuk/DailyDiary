using DailyDiary.JWTConfig;
using DailyDiary.Models;
using DailyDiary.Models.ViewModels;
using DailyDiary.Models.ViewModels.Account;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using MVCBikeShop.Models.ViewModels;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace DailyDiary.Controllers.APIControllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class AccountController : Controller
    {

        private readonly RoleManager<IdentityRole> roleManager;
        private readonly UserManager<User> userManager;
        private readonly SignInManager<User> signInManager;
        private readonly IdentityContext db;

        public AccountController(UserManager<User> userManager, SignInManager<User> signInManager, RoleManager<IdentityRole> roleManager,IdentityContext db)
        {
            this.db = db;
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
        //[ValidateAntiForgeryToken]
        public async Task<IActionResult> Login(LoginViewModel model)
        {
            if (ModelState.IsValid)
            {
                //foreach(var account in userManager.Users)
                //{

                //}
                var user = await userManager.FindByNameAsync(model.UserName);
                if (user != null)
                {
                    var result = await signInManager.PasswordSignInAsync(user.UserName, model.Password, model.RememberMe, false);
                    if (result.Succeeded)
                    {
                        var identity = await GetIdentity(user.Email, model.Password);
                        if (identity == null)
                        {
                            return BadRequest("Invalid login or password");
                        }
                        var jwt = new JwtSecurityToken(
                            issuer: AuthOptions.ISSURER,
                            audience: AuthOptions.AUDIENCE,
                            claims: identity.Claims,
                            expires: DateTime.Now.AddMinutes(AuthOptions.LIFETIME),
                            signingCredentials: new SigningCredentials(AuthOptions.GetSymmetricSecurityKey(), SecurityAlgorithms.HmacSha256)
                            );
                        var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);
                        return Json(new
                        {
                            access_token = encodedJwt,
                            userId = user.Id,
                            roles = await userManager.GetRolesAsync(user)
                        });
                        //if (user.Student != null)
                        //{

                        //} 
                        //else if(user.Teacher != null)
                        //{
                        //    // JWT 
                        //}

                        //if (!string.IsNullOrEmpty(model.ReturnUrl) && Url.IsLocalUrl(model.ReturnUrl))
                        //{
                        //    return Redirect(model.ReturnUrl);
                        //}
                        //else
                        //{
                        //    return RedirectToAction("Index", "Home"); // перенаправлення на сторінку входу

                        //    //return RedirectToAction("Index", "Home");
                        //}
                    }
                    else
                    {
                        ModelState.AddModelError("", "Invalid login or password");
                        return BadRequest(ModelState);
                    }
                }
                return BadRequest(new {error="User not found" });
            }
            return BadRequest(model);
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
                    await roleManager.CreateAsync(new IdentityRole("Parrent"));
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

        //[HttpPost]
        //public async Task<IActionResult> Token(LoginViewModel model)
        //{
        //    if (ModelState.IsValid)
        //    {
        //        var user = await userManager.FindByEmailAsync(model.UserName);
        //        //var result = await signInManager.PasswordSignInAsync(user.UserName, model.Password, false, false);
        //        if (user != null)
        //        {
        //            var identity = await GetIdentity(user.Email, model.Password);
        //            if (identity == null)
        //            {
        //                return BadRequest(new { error = "Invalid login or password" });
        //            }
        //            var jwt = new JwtSecurityToken(
        //                issuer: AuthOptions.ISSURER,
        //                audience: AuthOptions.AUDIENCE,
        //                claims: identity.Claims,
        //                expires: DateTime.Now.AddMinutes(AuthOptions.LIFETIME),
        //                signingCredentials: new SigningCredentials(AuthOptions.GetSymmetricSecurityKey(), SecurityAlgorithms.HmacSha256)
        //                );
        //            var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);
        //            return Json(new
        //            {
        //                access_token = encodedJwt,
        //                userId = user.Id
        //            });
        //        }
        //        else
        //        {
        //            //ModelState.AddModelError("errorText", "Invalid login or password");
        //            return BadRequest(new {errorText = "Invalid login or password" });
        //        }
        //    }
        //    return View(model);
        //}
        private async Task<ClaimsIdentity> GetIdentity(string email, string password)
        {
            var user = await userManager.FindByEmailAsync(email);
            var result = await signInManager.PasswordSignInAsync(user.UserName, password, false, false);
            if (result.Succeeded)
            {
                var claims = new List<Claim>
                {
                    new Claim(ClaimsIdentity.DefaultNameClaimType,user.Email),
                    new Claim(ClaimsIdentity.DefaultNameClaimType, password)
                };
                ClaimsIdentity claimsIdentity = new ClaimsIdentity(claims, "Token", ClaimsIdentity.DefaultNameClaimType, ClaimsIdentity.DefaultRoleClaimType);
                return claimsIdentity;
            }
            else
            {
                ModelState.AddModelError("", "Invalid login or password");
            }
            return null;
        }
        /*___________________________________________________________Change Password____________________________________________________*/

        [HttpPost]
        public async Task<IActionResult> CheckEmail(ChangePasswordViewModel model)
        {
            var user = await userManager.FindByEmailAsync(model.Email);
            if (user != null)
            {
                return Ok();
            }
            return NotFound("User not found");
        }
        [HttpPost]
        public async Task<IActionResult> CheckUserByEmailAsync(ChangePasswordViewModel model) // для скидання паролю через пошту
        {
            var user = await userManager.FindByEmailAsync(model.Email);
            if (user != null)
            {
                var token = await userManager.GeneratePasswordResetTokenAsync(user);
                var confirmationLink = Url.Action("ResetPassword", "Account", new { token, email = user.Email }, Request.Scheme);
                //EmailTwoFactor emailHelper = new EmailTwoFactor();
                bool emailResponse = EmailTwoFactor.SendEmailTwoFactorCode(user.Email, confirmationLink, "Confirm password changing", "Click on link to confirm password changing");
                if (emailResponse)
                {
                    return Ok("We sent an email on this address, check your messages and click on link to reset your password");
                }
                else
                {
                    return StatusCode(500,"Email sending error");
                }
            }
            return NotFound("Such user doesn't exist");
        }
        public IActionResult ResetPassword(string token = null, string email = null) // повертається після переходу на лінк
        {
            if (!string.IsNullOrEmpty(token) && !string.IsNullOrEmpty(email))
            {
                return RedirectPermanent($"https://localhost:44364/passwordreset/?email={email}&token={token}");
            }
            return Redirect($"https://localhost:44364/passwordreset/");
        }
        [HttpPost]
        public async Task<IActionResult> ResetPassword(ChangePasswordViewModel model) // для скидання паролю
        {
            var user = await userManager.FindByEmailAsync(model.Email);
            if (user != null)
            {
                var result = await userManager.ResetPasswordAsync(user, model.Token, model.NewPassword);
                if (result.Succeeded)
                    return Ok("Password changed successfully");
                else
                {
                    return BadRequest("Invalid token");
                }
            }
            return BadRequest("Password wasn't changed");
        }

        //[HttpPost]
        public async Task<IActionResult> ConfirmPasswordChanging(string token, string email, string oldPassword, string newPassword)
        {
            var user = await userManager.FindByEmailAsync(email);
            if (user == null)
                return BadRequest(new { error = "Error" });
            var result = await userManager.ResetPasswordAsync(user, token, oldPassword);
            if (result.Succeeded)
            {
                var passwordChangeResult = await userManager.ChangePasswordAsync(user, oldPassword, newPassword);
                if (passwordChangeResult.Succeeded)
                {
                    //return Ok(new { message = "Password was changed" });
                    return Redirect($"http://localhost:44364/userdatassettings/success");

                }
                else
                {
                    //return BadRequest(new { error = passwordChangeResult.Errors });
                    var error = passwordChangeResult.Errors.ToList().FirstOrDefault().Description;
                    return Redirect($"http://localhost:44364/userdatassettings/{error}");
                }


            }
            else
            {
                //return BadRequest(new { error = "Password wasn't changed" });
                return Redirect($"http://localhost:44364/userdatassettings/failure");

            }
            //return Redirect("http://localhost:44364/");
        }
        /*_______________________________________________________________________________________________________________________*/
    }
}
