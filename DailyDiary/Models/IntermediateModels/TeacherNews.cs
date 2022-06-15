using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace DailyDiary.Models
{
    public class TeacherNews
    {
        [Key]
        public int Id { get; set; }
        public int TeacherId { get; set; }
        public int NewsId { get; set; }
        public virtual Teacher Teacher { get; set; }
        public virtual News News { get; set; }
    }
}
