using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DailyDiary.Models
{
    public class User : IdentityUser
    {
        public string? TgNickName { get; set; }
        public int? TeacherId { get; set; }
        public int? StudentId { get; set; }
        public virtual Teacher Teacher { get; set; }
        public virtual Student Student { get; set; }

        //UserName = Login
        //public string Name { get; set; } 
        //public string LastName { get; set; }
        //public string MiddleName { get; set; }
        //public int? TeacherId { get; set; }
        //public int? StudentId { get; set; }
        //public virtual Teacher Teacher { get; set; }
        //public virtual Student Student { get; set; }
    }
}
