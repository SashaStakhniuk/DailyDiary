using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DailyDiary.Models
{
    public class StudentClasswork
    {
        public int GroupClassworkId { get; set; }
        public GroupClasswork GroupClasswork { get; set; }
        public int StudentId { get; set; }
        public Student Student { get; set; }
        public float Mark { get; set; }
        public string TeacherComment { get; set; }
    }
}
