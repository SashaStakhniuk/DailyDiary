using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace DailyDiary.Models
{
    public class StudyPlan
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public int? StudyYearId { get; set; }
        [NotMapped]
        public StudyYear StudyYear { get; set; }
        public int Semester { get; set; }
        public Boolean CurrentStudyPlan { get; set; }
        public ICollection<SubjectsStudyPlan> SubjectsStudyPlans { get; set; }
    }
}
