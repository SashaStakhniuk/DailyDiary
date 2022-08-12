using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
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
        public int StudentId { get; set; } //id
        public int? Order { get; set; }// для сортировки студента
        public int? YearOfStudy { get; set; }//рік навчання
        // [DataType(DataType.Date)]
        // [DisplayFormat(DataFormatString = "{0:dd-MM-yyyy}", ApplyFormatInEditMode = true)]
        public DateTime? AdmissionDate{ get; set; }//дата вступу
     
        //[MaxLength(80)]
        //public string Email { get; set; }
        public string Base64URL { get; set; }//фото
        public int? Rate { get; set; }
        public int? GroupId { get; set; }
        public int? SubgroupId { get; set; }

        [ForeignKey("UserId")]
        public string UserId { get; set; }
        public virtual User User { get; set; }//посилання на запис
        public virtual Subgroup Subgroup { get; set; }
        public virtual Group Group { get; set; }

        public virtual ICollection<StudentClasswork> StudentClassworks { get; set; }
        public virtual ICollection<StudentHomework> StudentHomeworks { get; set; }
        public virtual ICollection<StudentNews> StudentNews { get; set; }
        public virtual ICollection<StudentFeedback> StudentFeedback { get; set; }
    }
}
