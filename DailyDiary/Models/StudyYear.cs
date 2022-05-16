using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace DailyDiary.Models
{
    public class StudyYear
    {
        public int Id { get; set; }
        public int MaxStudentYear { get; set; }
        public int MinStudentYear { get; set; }
        public DateTime StartYear { get; set; }
        public DateTime FinishYea { get; set; }
        public StudyYear()
        {
            StudyPlans = new HashSet<StudyPlan>();
            StudyYearGroups = new HashSet<StudyYearGroup>();
        }

        public ICollection<StudyPlan> StudyPlans { get; set; }
        public ICollection<StudyYearGroup> StudyYearGroups { get; set; }
    }
}
