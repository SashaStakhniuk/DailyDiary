﻿using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DailyDiary.Models
{
    public class User : IdentityUser
    {
<<<<<<< HEAD
=======
        public string? TgNickName { get; set; }
        public int? TeacherId { get; set; }
        public int? StudentId { get; set; }
        public virtual Teacher Teacher { get; set; }
        public virtual Student Student { get; set; }
    
        //UserName = Login
        //public string Name { get; set; } 
        //public string LastName { get; set; }
        //public string MiddleName { get; set; }
>>>>>>> refs/remotes/origin/main
        //public int? TeacherId { get; set; }
        //public int? StudentId { get; set; }
        //public virtual Teacher Teacher { get; set; }
        //public virtual Student Student { get; set; }
       public virtual Person Person { get; set; }
    }
}
