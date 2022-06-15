using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace DailyDiary.Models
{
    public class SubjectsStudyPlan
    {
        [Key]
        public int Id { get; set; }
        public int StudyPlanId { get; set; }
        public int SubjectId {get;set;}
        public int Hours { get; set; }
        public virtual Subject Subject { get; set; }
        public virtual StudyPlan StudyPlan { get; set; }

    }
}
