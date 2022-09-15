using DailyDiary.Models.DbModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DailyDiary.Models.IntermediateModels
{
    public class LessonStudyMaterial // навчальний матеріал до уроку/теми/предмету з робочого плану
    {
        public int StudyMaterialId { get; set; }
        public int WorkPlanId { get; set; }
        public virtual StudyMaterial StudyMaterial { get; set; }
        public virtual WorkPlan WorkPlan { get; set; }

    }
}
