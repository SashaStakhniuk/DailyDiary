using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DailyDiary.Models
{
    public class StudyYearStudyPlan
    {
        public int StudyYearId { get; set; }
        public StudyYear StudyYear { get; set; }
        public int StudyPlanId { get; set; }
        public StudyPlan StudyPlan { get; set; }
    }
}
