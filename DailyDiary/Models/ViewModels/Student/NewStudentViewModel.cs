using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace DailyDiary.Models.ViewModels.Student
{
    public class NewStudentViewModel
    {
        [Required]
        public string Name { get; set; }
        [Required]
        public string LastName { get; set; }
        //[Required]
        public string MiddleName { get; set; }
        // [DataType(DataType.Date)]
        [Required(AllowEmptyStrings = false, ErrorMessage="Birthday field can't be empty")]
        public DateTime Birthday { get; set; }
        [Required(AllowEmptyStrings = false, ErrorMessage = "AdmissionDate field can't be empty")]
        public DateTime AdmissionDate { get; set; }
        [Required]
        public int Age { get; set; }
        [Required]
        [Range(minimum:1,maximum:int.MaxValue, ErrorMessage = "Group wasn't appointed")]
        public int GroupId { get; set; }
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        public string TgNickName { get; set; }
        [RegularExpression(@"^([\+]?380[-]?|[0])?[1-9][0-9]{8}$", ErrorMessage = "Check and enter phone number correctly")]
        public string PhoneNumber { get; set; }
        [Required]
        [Range(1, 11, ErrorMessage = "Year of study can't be < 1 and > 11")]
        public int YearOfStudy { get; set; }



    }
}
