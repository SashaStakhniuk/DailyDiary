using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace DailyDiary.Models.DbModels
{
    public class LessonShedule
    {
        public LessonShedule()
        {
            this.Shedules = new HashSet<Shedule>();
        }
        [Key]
        public int Id { get; set; }
        public int LessonNumber { get; set; }
        public string StartTime { get; set; }
        public string EndTime { get; set; }

        public virtual ICollection<Shedule> Shedules { get; set; }
    }
}
