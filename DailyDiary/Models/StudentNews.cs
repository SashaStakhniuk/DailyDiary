using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DailyDiary.Models
{
    public class StudentNews
    {
        public int StudentId { get; set; }
        public Student Student { get; set; }
        public int NewsId { get; set; }
        public News News { get; set; }
        public bool isRead { get; set; }
    }
}
