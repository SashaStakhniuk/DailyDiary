using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DailyDiary.Models.ViewModels.Shedule
{
    public class SheduleFullDataViewModel
    {
        public int Id { get; set; }
        public int WeekId { get; set; } // парний-непарний тиждень 0 - без розподілення по тижнях, 1 - непарний тиждень, 2 - парний тиждень
        public int? DayId { get; set; } // день тижня
        public int? LessonId { get; set; } // номер уроку
        public int? TeacherSubgroupDistributionId { get; set; }
        public int? AuditoryId { get; set; }
        public int SubjectId { get; set; }
        public string SubjectTitle { get; set; }
        public int TeacherId { get; set; }
        public string TeacherName { get; set; }
        public string TeacherLastName { get; set; }
    }
}
