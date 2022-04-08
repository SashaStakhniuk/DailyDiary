using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DailyDiary.Models
{
    public class Feedback
    {
        public Feedback() { }
        public int Id { get; set; }
        public int SubjectId { get; set; }
        public Subject Subject { get; set; }
        public string MainInformation { get; set; }
        public int TeacherId { get; set; }
        public Teacher Teacher { get; set; }
        public bool IsRead { get; set; }
        public Nullable<DateTime> DataPublication { get; set; }
        public ICollection<StudentFeedback> StudentFeedback { get; set; }
    }
}
