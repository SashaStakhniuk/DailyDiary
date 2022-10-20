using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace DailyDiary.Models.DbModels
{
    public class Shedule
    {
        [Key]
        public int Id { get; set; }
        public int WeekId { get; set; } // парний-непарний тиждень 0 - без розподілення по тижнях, 1 - непарний тиждень, 2 - парний тиждень
        [ForeignKey("DayOfWeek")]
        public int? DayId { get; set; } // день тижня

        [ForeignKey("LessonShedule")]
        public int? LessonId { get; set; } // номер уроку
        [ForeignKey("TeacherSubgroupDistribution")]
        public int? TeacherSubgroupDistributionId { get; set; }
        [ForeignKey("Auditory")]
        public int? AuditoryId { get; set; }
        public virtual DayOfWeek DayOfWeek { get; set; }
        public virtual Auditory Auditory { get; set; }
        public virtual LessonShedule LessonShedule { get; set; }
        public virtual TeacherSubgroupDistribution TeacherSubgroupDistribution { get; set; }

    }
}
