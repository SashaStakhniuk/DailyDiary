using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace DailyDiary.Models
{
    public class TeacherGroup
    {
        [Key]
        public int Id { get; set; }
        public int TeacherId { get; set; }
        public int GroupId { get; set; }
        public virtual Teacher Teacher { get; set; }
        public virtual Group Group { get; set; }
    }
}
