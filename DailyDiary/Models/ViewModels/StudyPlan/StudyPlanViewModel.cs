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
        public int StudyYearId { get; set; }
        public int YearOfStudy { get; set; }
        public List<SubjectsHours> SubjectsToAdd { get; set; }
    }
    public class SubjectsHours
    {
        public string SubjectId { get; set; }
        public string Hours { get; set; }
    }
}
