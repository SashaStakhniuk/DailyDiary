using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace DailyDiary.Models
{
    public class Teacher : Person
    {
        //public Teacher()
        //{
        //    Subjects = new HashSet<Subject>();
        //}
        //[Key]
        public int TeacherId { get; set; }
        public string Specialty { get; set; } // вчителі початкових класів, вчителі-дефектологи,вихователі-методисти і т.п
        //public string Subjects { get; set; } // математика, фізика, інформатика і т.п
        public string Category { get; set; }// "спеціаліст", "спеціаліст другої категорії", "спеціаліст першої категорії", "спеціаліст вищої категорії".
        public string Degree { get; set; }// бакалавр, магістр, кандидат, доктор, професор, доцент, академік
        public string Education { get; set; }// професійно-технічна, повна середня, вища і т.п
        public int Experience { get; set; }
        public float Salary { get; set; }
        //public ICollection<Subject> Subjects { get; set; }
        public ICollection<TeacherSubject> TeacherSubjects { get; set; }

        //public string Percent { get; set; } // ставка зарплати
    }
}
