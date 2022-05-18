using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace DailyDiary.Models
{
    public class StudyYear
    {
        public StudyYear()
        {
            StudyYearStudyPlans = new HashSet<StudyYearStudyPlan>();
        }
        public int Id { get; set; }
        public string Title { get; set; }
        public DateTime StartYear { get; set; }
        public DateTime FinishYea { get; set; }
        public ICollection<StudyYearGroup> StudyYearGroups { get; set; }
        public ICollection<StudyYearStudyPlan> StudyYearStudyPlans { get; set; }
    }
}
