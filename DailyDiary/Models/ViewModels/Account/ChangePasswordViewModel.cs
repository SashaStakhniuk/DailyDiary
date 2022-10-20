using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace DailyDiary.Models.ViewModels.Account
{
    public class ChangePasswordViewModel
    {
            [EmailAddress]
            public string Email { get; set; }
            public string NewPassword { get; set; }
            public string Token { get; set; }
    }
}
