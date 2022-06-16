using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace DailyDiary.Models
{
    public class Person 
    {
        [MaxLength(80)]
        public string Name { get; set; }
        [MaxLength(80)]
        public string LastName { get; set; }
        // [DataType(DataType.Date)]
        // [DisplayFormat(DataFormatString = "{0:dd-MM-yyyy}", ApplyFormatInEditMode = true)]
        public DateTime? Birthday { get; set; }
        public int? Age { get; set; }
        
    }
}
