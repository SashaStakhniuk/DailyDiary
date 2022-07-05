using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace DailyDiary.Models.ViewModels.Teacher
{
    public class NewTeacherViewModel
    {
        public int Id { get; set; }
        /*[Required(ErrorMessage = "Name is required")]
        [StringLength(100, ErrorMessage = "Name length must be less than 100 characters")]
        [MinLength(2,ErrorMessage = "Name must include more than 1 characters")]*/
        public string Name { get; set; }
        /*[Required]
        [StringLength(100, ErrorMessage = "LastName length must be less than 100 symbols")]
        [MinLength(2, ErrorMessage = "LastName must include more than 1 characters")]*/
        public string LastName { get; set; }
        /*[DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:dd-MM-yyyy}", ApplyFormatInEditMode = true)]*/
        public Nullable<DateTime> Birthday { get; set; }
        /*[Required]
        [Range(0,100)]*/
        public int Age { get; set; }
        /*[Required]
        [StringLength(500)]*/
        public string Specialty { get; set; } // вчителі початкових класів, вчителі-дефектологи,вихователі-методисти і т.п
        //public string Subjects { get; set; } // математика, фізика, інформатика і т.п
        /* [Required]
        [StringLength(500)]*/
        public string Category { get; set; }// "спеціаліст", "спеціаліст другої категорії", "спеціаліст першої категорії", "спеціаліст вищої категорії".
        /*[Required]
        [StringLength(100)]*/
        public string Degree { get; set; }// бакалавр, магістр, кандидат, доктор, професор, доцент, академік
        /*[Required]
        [StringLength(100)]*/
        public string Education { get; set; }// професійно-технічна, повна середня, вища і т.п
        [Required]
        public int Experience { get; set; }
        /*[Range(0.0, Double.MaxValue)]*/
        public float Salary { get; set; }
        public int Rate { get; set; }
        public string Email { get; set; }
        public string Base64URL { get; set; }
        public List<int> SubjectsId { get; set; }
    }
}
