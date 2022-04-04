using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DailyDiary.Models
{
    public class TeacherNews
    {
        public int TeacherId { get; set; }
        public Teacher Teacher { get; set; }
        public int NewsId { get; set; }
        public News News { get; set; }
    }
}
