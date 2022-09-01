using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DailyDiary.Models.ViewModels
{
    public class StudyPlanViewModel
    {
        public string PlanTitle { get; set; }
        public int Semester { get; set; }
        public string StudyYear { get; set; }
        public string YearOfStudy { get; set; }
        public List<SubjectsToAdd> SubjectsToAdd { get; set; }
    }
    public class SubjectsToAdd
    {
        public string SubjectId { get; set; }
        public string Hours { get; set; }
    }
}
