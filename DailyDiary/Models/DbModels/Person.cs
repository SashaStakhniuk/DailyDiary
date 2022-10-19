using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace DailyDiary.Models
{
    public class Person 
    {
        [Key]
        public int Id { get; set; }
        [Required]
        [MaxLength(45)]
        public string Name { get; set; }
        [MaxLength(45)]
        public string MiddleName { get; set; }
        [Required]
        [MaxLength(45)]
        public string LastName { get; set; }
        [MaxLength(80)]
        public string Status { get; set; } // статус 
        [MaxLength(80)]
        public string Address { get; set; } // Адреса проживання
        public string Base64URL { get; set; }//фото

        // [DataType(DataType.Date)]
        // [DisplayFormat(DataFormatString = "{0:dd-MM-yyyy}", ApplyFormatInEditMode = true)]
        public DateTime Birthday { get; set; }

        [ForeignKey("User")]
        public string UserId { get; set; }
        public virtual User User { get; set; }//посилання на запис
    }
}
