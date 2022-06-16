using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace DailyDiary.Models
{
    public class StudentFeedback
    {
        [Key]
        public int Id { get; set; }
        public int StudentId { get; set; }
        public int FeedbackId { get; set; }
        public virtual Feedback Feedback { get; set; }
        public virtual Student Student { get; set; }
    }
}
