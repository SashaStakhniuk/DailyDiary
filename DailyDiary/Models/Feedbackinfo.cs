using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DailyDiary.Models
{
    public class Feedbackinfo
    {
        public Feedbackinfo() { }
        public int Id { get; set; }
        public string SubjectTitle { get; set; }
        public string MainInformation { get; set; }
        public string TeacherName { get; set; }
        public string TeacherLastName { get; set; }
        public bool IsRead { get; set; }
        public Nullable<DateTime> DataPublication { get; set; }
    }
}
