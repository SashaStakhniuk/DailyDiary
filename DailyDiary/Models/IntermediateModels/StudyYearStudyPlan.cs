using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace DailyDiary.Models
{
    public class StudyYearStudyPlan
    {
        [Key]
        public int StudyYearStudyPlanId { get; set; }
        public int StudyYearId { get; set; }
        public int StudyPlanId { get; set; }
        public virtual StudyPlan StudyPlan { get; set; }
        public virtual StudyYear StudyYear { get; set; }
    }
}
