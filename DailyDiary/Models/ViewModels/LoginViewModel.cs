using System.ComponentModel.DataAnnotations;

namespace DailyDiary.Models.ViewModels
{
    public class LoginViewModel
    {
        //[EmailAddress] Login
        [Required(ErrorMessage = "Login is required")]
        public string Email { get; set; }
        [Required(ErrorMessage = "Pasword is required")]
        [DataType(DataType.Password)]
        public string Password { get; set; }
        public bool RememberMe { get; set; }
        public string ReturnUrl { get; set; }
    }
}
