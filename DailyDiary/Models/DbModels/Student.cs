using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace DailyDiary.Models
{
    public class Student : Person
    {
        public Student() 
        {
            StudentClassworks = new HashSet<StudentClasswork>();
            StudentHomeworks = new HashSet<StudentHomework>();
            StudentNews = new HashSet<StudentNews>();
            StudentFeedback = new HashSet<StudentFeedback>();
        }

        [Key]
        public int StudentId { get; set; }
        public int? Order { get; set; }
        public int? YearOfStudy { get; set; } 
        // [DataType(DataType.Date)]
        // [DisplayFormat(DataFormatString = "{0:dd-MM-yyyy}", ApplyFormatInEditMode = true)]
        public DateTime? AdmissionDate{ get; set; }
        [MaxLength(80)]
        public string Login { get; set; }
        [MaxLength(80)]
        public string Password { get; set; }
        [MaxLength(80)]
        public string Email { get; set; }
        public string Base64URL { get; set; }
        public int? Rate { get; set; }
        public int? UserId { get; set; }
        public int? GroupId { get; set; }
        public int? SubgroupId { get; set; }
        public virtual User User { get; set; }
        public virtual Subgroup Subgroup { get; set; }
        public virtual Group Group { get; set; }
        public virtual ICollection<StudentClasswork> StudentClassworks { get; set; }
        public virtual ICollection<StudentHomework> StudentHomeworks { get; set; }
        public virtual ICollection<StudentNews> StudentNews { get; set; }
        public virtual ICollection<StudentFeedback> StudentFeedback { get; set; }
    }
}
