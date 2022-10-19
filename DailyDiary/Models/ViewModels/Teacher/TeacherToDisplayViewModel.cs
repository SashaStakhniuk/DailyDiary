using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace DailyDiary.Models.ViewModels
{
    public class TeacherToDisplayViewModel
    {
        public int PersonId { get; set; }
        public string UserId { get; set; }
        public int TeacherId { get; set; }
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
        public DateTime Birthday { get; set; }
        public int SpecialityId { get; set; }
        public string Speciality { get; set; }
        public int CategoryId { get; set; }
        public string Category { get; set; }
        public int DegreeId { get; set; }
        public string Degree { get; set; }
        public int EducationId { get; set; }
        public string Education { get; set; }
        public int Experience { get; set; } // ?
        public float Salary { get; set; }
        public int Rate { get; set; }
        public string AdditionalInfo { get; set; }
        public string Login { get; set; }
        [MaxLength(45)]
        [EmailAddress]
        [Required(ErrorMessage = "Email can't be empty")]
        public string Email { get; set; }
        [Phone]
        public string PhoneNumber { get; set; }
        public List<TeacherSubject> TeacherSubjects { get; set; }
    }
}
