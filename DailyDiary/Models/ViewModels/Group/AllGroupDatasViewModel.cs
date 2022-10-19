using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DailyDiary.Models.ViewModels.Group
{
    public class AllGroupDatasViewModel
    {
        public int GroupId { get; set; }
        public string GroupTitle { get; set; }
        public int YearOfStudyId { get; set; }
        public int YearOfStudy { get; set; }
        public int StudyPlanId { get; set; }
        public int AmountOfStudents { get; set; }
        public int AuditoryId { get; set; }
        public string AuditoryTitle { get; set; }
    }
}
