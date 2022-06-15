using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace DailyDiary.Models
{
    public class StudentSubjectMark
    {
        [Key]
        public int StudentSubjectMarkId { get; set; }
        public float Mark { get; set; }
        public DateTime Date {get;set;}
        public int? StudentId { get; set; }
        public int? SubjectId { get; set; }
        public int? TeacherId { get; set; }
        public virtual Student Student { get; set; }
        public virtual Subject Subject { get; set; }
        public virtual Teacher Teacher { get; set; }
    }
}
