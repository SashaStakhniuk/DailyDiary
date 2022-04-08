using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DailyDiary.Models
{
    public class StudentFeedback
    {
        public int StudentId { get; set; }
        public Student Student { get; set; }
        public int FeedbackId { get; set; }
        public Feedback Feedback { get; set; }
    }
}
