using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace DailyDiary.Models.ViewModels
{
    public class StudentViewModel
    {
        [Required]
        public int Id { get; set; }
        /*  [Required(ErrorMessage = "Name is required")]*/
        /*[StringLength(100, ErrorMessage = "Name length must be less than 100 characters")]
        [MinLength(2,ErrorMessage = "Name must include more than 1 characters")]*/
        public string Name { get; set; }
       /* [Required(ErrorMessage = "LastName is required")]*/
       /* [StringLength(100, ErrorMessage = "LastName length must be less than 100 symbols")]
        [MinLength(2, ErrorMessage = "LastName must include more than 1 characters")]*/
        public string LastName { get; set; }
        /*[DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:dd-MM-yyyy}", ApplyFormatInEditMode = true)]*/
       /* [Required]*/
        public Nullable<DateTime> Birthday { get; set; }
        /* [DataType(DataType.Date)]
         [DisplayFormat(DataFormatString = "{0:dd-MM-yyyy}", ApplyFormatInEditMode = true)]*/
       /* [Required]   */
        public  Nullable<DateTime> AdmissionDate { get; set; }
        /*[Required(ErrorMessage = "Age is required")]*/
        /* [Range(0,100)]*/
        public int Age { get; set; }
       /* [Required(ErrorMessage = "StudyYear is required")]*/
        public int StudyYear { get; set; } //year of study
       /* [Required(ErrorMessage = "GroupId is required")]*/
        public int GroupId { get; set; }
        public int SubgroupId { get; set; }
        public string Login { get; set; }
        public string Password { get; set; }
     /*   [Compare("Password")]
        public string ConfirmPassword { get; set; }*/
        public string Email { get; set; }
    }
}
