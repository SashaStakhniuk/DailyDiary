using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace DailyDiary.Models
{
    public class Feedback
    {
        public Feedback() 
        {
            StudentFeedback = new HashSet<StudentFeedback>();
        }

        [Key]
        public int Id { get; set; }
        public bool IsRead { get; set; }
        public DateTime? DataPublication { get; set; }
        [MaxLength(80)]
        public string MainInformation { get; set; }
        public int? SubjectId { get; set; }
        public int? TeacherId { get; set; }
        public virtual Subject Subject { get; set; }
        public virtual Teacher Teacher { get; set; }
        public virtual ICollection<StudentFeedback> StudentFeedback { get; set; }
    }
}
