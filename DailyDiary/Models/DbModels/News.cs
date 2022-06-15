using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace DailyDiary.Models
{
    public class News
    {
        public News() 
        {
            TeacherNews = new HashSet<TeacherNews>();
            StudentNews = new HashSet<StudentNews>();
        }
        [Key]
        public int Id { get; set; }
        [MaxLength(80)]
        public string Title { get; set; }
        public string MainInfo { get; set; }
        [MaxLength(80)]
        public string Sender { get; set; }
        public string Base64Url { get; set; }
        public bool IsRed { get; set; }
        public DateTime? DataPublication { get; set; }
        public virtual ICollection<TeacherNews> TeacherNews { get; set; }
        public virtual ICollection<StudentNews> StudentNews { get; set; }
    }
}
