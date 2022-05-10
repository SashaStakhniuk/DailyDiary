using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DailyDiary.Models
{
    public class StudyPlan
    {
        public StudyPlan()
        {
            Groups = new HashSet<Group>();
        }
        public int StudyPlanId { get; set; }
        public string Title { get; set; }
        public int GroupId { get; set; }
        public int Semester { get; set; }
        public ICollection<Group> Groups { get; set; }
        public ICollection<SubjectsStudyPlan> SubjectsStudyPlans { get; set; }
    }
}
