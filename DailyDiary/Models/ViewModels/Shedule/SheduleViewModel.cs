using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DailyDiary.Models.ViewModels.Shedule
{
    public class SheduleViewModel
    {
       public List<SheduleData> SheduleDatas { get; set; }
    }
   public class SheduleData
    {
        public int Id { get; set; }
        public int WeekId { get; set; } // парний-непарний тиждень 0 - без розподілення по тижнях, 1 - непарний тиждень, 2 - парний тиждень
        public int DayId { get; set; } // день тижня
        public int LessonId { get; set; } // номер уроку
        public int TeacherSubgroupDistributionId { get; set; }
        public int AuditoryId { get; set; }
    }
}
