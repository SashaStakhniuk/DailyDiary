using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace DailyDiary.Models
{
    public class StudentHomework
    {
        [Key]
        public int StudentHomeworkId { get; set; }
        public int? GroupHomeworkId { get; set; }
        public int? StudentId { get; set; }
        public byte[] PerformedHomework { get; set; }
        public string StudentComment { get; set; }
        public float Mark { get; set; }
        public string TeacherComment { get; set; }
        public DateTime Published { get; set; }
        public virtual Student Student { get; set; }
        public virtual GroupHomework GroupHomework { get; set; }
    }
}
