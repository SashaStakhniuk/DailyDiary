using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace DailyDiary.Models
{
    public class StudentClasswork
    {
        [Key]
        public int StudentClassworkId { get; set; }
        public int? GroupClassworkId { get; set; }
        public int? StudentId { get; set; }
        public float Mark { get; set; }
        public string TeacherComment { get; set; }
        public virtual Student Student { get; set; }
        public virtual GroupClasswork GroupClasswork { get; set; }
    }
}
