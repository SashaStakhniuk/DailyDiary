using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace DailyDiary.Models.ViewModels
{
    public class TeacherViewModel
    {
        internal int TeacherId { get; set; }
        /*[Required(ErrorMessage = "Name is required")]
        [StringLength(100, ErrorMessage = "Name length must be less than 100 characters")]
        [MinLength(2,ErrorMessage = "Name must include more than 1 characters")]*/
        internal string Name { get; set; }
        /*[Required]
        [StringLength(100, ErrorMessage = "LastName length must be less than 100 symbols")]
        [MinLength(2, ErrorMessage = "LastName must include more than 1 characters")]*/
        internal string LastName { get; set; }
        /*[DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:dd-MM-yyyy}", ApplyFormatInEditMode = true)]*/
        internal DateTime Birthday { get; set; }
        /*[Required]
        [Range(0,100)]*/
        internal int Age { get; set; }
        /*[Required]
        [StringLength(500)]*/
        internal string Specialty { get; set; } // вчителі початкових класів, вчителі-дефектологи,вихователі-методисти і т.п
        //public string Subjects { get; set; } // математика, фізика, інформатика і т.п
        /* [Required]
        [StringLength(500)]*/
        internal string Category { get; set; }// "спеціаліст", "спеціаліст другої категорії", "спеціаліст першої категорії", "спеціаліст вищої категорії".
        /*[Required]
        [StringLength(100)]*/
        internal string Degree { get; set; }// бакалавр, магістр, кандидат, доктор, професор, доцент, академік
        /*[Required]
        [StringLength(100)]*/
        internal string Education { get; set; }// професійно-технічна, повна середня, вища і т.п
        [Required]
        internal int Experience { get; set; }
        /*[Range(0.0, Double.MaxValue)]*/
        internal float Salary { get; set; }
        internal string Base64URL { get; set; }
        internal int Rate { get; set; }

        internal string Login { get; set; }
        internal string Password { get; set; }
        internal string Email { get; set; }
    }
}
