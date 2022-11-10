using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace DailyDiary.Models.ViewModels
{
    public class StudentToDisplayViewModel
    {
        public int PersonId { get; set; }
        public string UserId { get; set; }
        public int StudentId { get; set; }
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
        public DateTime AdmissionDate { get; set; }
        public int? Rate { get; set; }
        public string AdditionalInfo { get; set; }
        public string Login { get; set; }
        [MaxLength(45)]
        [EmailAddress]
        [Required(ErrorMessage = "Email can't be empty")]
        public string Email { get; set; }
        [Phone]
        public string PhoneNumber { get; set; }
        public int YearOfStudy { get; set; }
        public int GroupId { get; set; }
        public string GroupTitle { get; set; }

    }
}
