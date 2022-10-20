using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DailyDiary.Models
{
    public class User : IdentityUser
    {
       public virtual Person Person { get; set; }
    }
}
