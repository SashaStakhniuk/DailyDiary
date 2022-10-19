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
        public int WeekId { get; set; } // парний-непарний тиждень
        public int DayId { get; set; } // день тижня 1-понеділок, 7-неділя
        public int LessonNumber { get; set; } // номер уроку
        [ForeignKey("TeacherSubgroupDistribution")]
        public int? TeacherSubgroupDistributionId { get; set; }
        [ForeignKey("Auditory")]
        public int AuditoryId { get; set; }
        public virtual Auditory Auditory { get; set; }
        public virtual TeacherSubgroupDistribution TeacherSubgroupDistribution { get; set; }

    }
}
