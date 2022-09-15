using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace DailyDiary.Models.ViewModels
{
    public class PersonToAddViewModel
    {
        [EmailAddress]
        [Required(ErrorMessage = "Email can't be empty")]
        public string Email { get; set; } 
        [Phone]
        [Required]
        public string PhoneNumber { get; set; }
        [Required]
        public List<string> Roles { get; set; }// ролі користувача, для відображення. Ролі зберігаються в іншій бд

        [MaxLength(45)]
        [Required(ErrorMessage = "Name can't be empty")]
        public string Name { get; set; }
        [MaxLength(45)]
        public string MiddleName { get; set; }
        [Required(ErrorMessage = "LastName can't be empty")]
        [MaxLength(45)]
        public string LastName { get; set; }
        [MaxLength(80)]
        public string Address { get; set; } // Адреса проживання
        public string Base64URL { get; set; }//фото

         [DataType(DataType.Date)]
        // [DisplayFormat(DataFormatString = "{0:dd-MM-yyyy}", ApplyFormatInEditMode = true)]
        [Required]
        public DateTime Birthday { get; set; }
        [DataType(DataType.Date)]
        public DateTime AdmissionDate { get; set; }
        [MaxLength(45)]
        public string Speciality { get; set; }
        [MaxLength(45)]
        public string Category { get; set; }
        [MaxLength(45)]
        public string Degree { get; set; }
        [MaxLength(45)]
        public string Education { get; set; }
    }
}
