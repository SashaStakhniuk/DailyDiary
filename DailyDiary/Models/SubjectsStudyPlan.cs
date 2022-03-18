using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DailyDiary.Models
{
    public class SubjectsStudyPlan
    {
        public int StudyPlanId { get; set; }
        public int SubjectId {get;set;}
        public float Hours { get; set; }
        public Subject Subject { get; set; }
        public StudyPlan StudyPlan { get; set; }

    }
}
