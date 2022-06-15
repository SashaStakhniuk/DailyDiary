using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace DailyDiary.Models
{
    public class StudyPlan
    {
        public StudyPlan()
        {
            SubjectsStudyPlans = new HashSet<SubjectsStudyPlan>();
            StudyYearStudyPlans = new HashSet<StudyYearStudyPlan>();
        }
        [Key]
        public int Id { get; set; }
        public string Title { get; set; }
        public int Semester { get; set; }
        public Boolean? CurrentStudyPlan { get; set; }
        public virtual ICollection<SubjectsStudyPlan> SubjectsStudyPlans { get; set; }
        public virtual ICollection<StudyYearStudyPlan> StudyYearStudyPlans { get; set; }
    }
}
