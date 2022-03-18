using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DailyDiary.Models
{
    public class StudentSubjectMark
    {
        public int StudentId { get; set; }
        public int SubjectId { get; set; }
        public float Mark { get; set; }
        public DateTime Date {get;set;}
        public int TeacherId { get; set; }
        public Student Student { get; set; }
        public Subject Subject { get; set; }
        public Teacher Teacher { get; set; }
    }
}
