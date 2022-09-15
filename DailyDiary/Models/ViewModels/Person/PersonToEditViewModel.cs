using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace DailyDiary.Models.ViewModels
{
    public class PersonViewModel
    {
        [MaxLength(45)]
        [Required(ErrorMessage = "Login can't be empty")]
        public string Login { get; set; }
        [MaxLength(45)]
        [EmailAddress]
        [Required(ErrorMessage = "Email can't be empty")]
        public string Email { get; set; } 
        [Phone]
        public string PhoneNumber { get; set; }
        [Required]
        [MinLength(1)]
        public List<string> Roles { get; set; }// ролі користувача, для відображення. Ролі зберігаються в іншій бд
        [MaxLength(45)]
        [Required]
        public string Name { get; set; }
        [MaxLength(45)]
        [Required]
        public string MiddleName { get; set; }
        [MaxLength(45)]
        [Required]
        public string LastName { get; set; }
        [MaxLength(80)]
        //[Required]
        public string Address { get; set; } // Адреса проживання
        public string Base64URL { get; set; }//фото
        [Required]
        public DateTime Birthday { get; set; }
        public DateTime AdmissionDate { get; set; }
        [MaxLength(45)]
        public string Speciality { get; set; }
        [MaxLength(45)]
        public string Category { get; set; }
        [MaxLength(45)]
        public string Degree { get; set; }
        [MaxLength(45)]
        public string Education { get; set; }
        [Required(ErrorMessage = "PersonId can't be empty")]
        public int PersonId { get; set; }
        public int TeacherId { get; set; }
        public int StudentId { get; set; }
        public int ParentId { get; set; }

    }
}
