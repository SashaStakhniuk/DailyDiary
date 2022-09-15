using DailyDiary.Models.DbModels;
using DailyDiary.Models.IntermediateModels;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace DailyDiary.Models
{
    public class Student
    {
        public Student()
        {
            this.StudentsBySubgroups = new HashSet<StudentsBySubgroup>();
            this.StudentsWorks = new HashSet<StudentsWork>();
            this.ParentStudents = new HashSet<ParentStudent>();
            StudentNews = new HashSet<StudentNews>();
            StudentFeedback = new HashSet<StudentFeedback>();
        }

        [Key]
        public int Id { get; set; } //id
        public int? Rate { get; set; }
        public DateTime AdmissionDate { get; set; }
        public string AdditionalInfo { get; set; }
        public int? PersonId { get; set; }
        [ForeignKey("PersonId")]
        public virtual Person Person { get; set; }//посилання на запис
        public virtual ICollection<StudentsBySubgroup> StudentsBySubgroups { get; set; }
        public virtual ICollection<StudentsWork> StudentsWorks { get; set; }
        public virtual ICollection<StudentNews> StudentNews { get; set; }
        public virtual ICollection<StudentFeedback> StudentFeedback { get; set; }
        public virtual ICollection<ParentStudent> ParentStudents { get; set; }
    }
    //public class Student : Person
    //{
    //    public Student()
    //    {
    //        this.StudentsBySubgroups = new HashSet<StudentsBySubgroup>();
    //        StudentClassworks = new HashSet<StudentClasswork>();
    //        StudentHomeworks = new HashSet<StudentHomework>();
    //        StudentNews = new HashSet<StudentNews>();
    //        StudentFeedback = new HashSet<StudentFeedback>();
    //    }

    //    [Key]
    //    public int StudentId { get; set; } //id
    //    public string Base64URL { get; set; }//фото
    //    public int? Rate { get; set; }

    //    [ForeignKey("User")]
    //    public string UserId { get; set; }
    //    public virtual User User { get; set; }//посилання на запис
    //    public virtual ICollection<StudentsBySubgroup> StudentsBySubgroups { get; set; }
    //    public virtual ICollection<StudentClasswork> StudentClassworks { get; set; }
    //    public virtual ICollection<StudentHomework> StudentHomeworks { get; set; }
    //    public virtual ICollection<StudentNews> StudentNews { get; set; }
    //    public virtual ICollection<StudentFeedback> StudentFeedback { get; set; }
    //}
}
