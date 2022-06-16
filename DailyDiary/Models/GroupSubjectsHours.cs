using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DailyDiary.Models
{
    public class GroupSubjectsHours
    {
        public string Title { get; set; }
        public int Semester { get; set; }
        public Boolean? CurrentStudyPlan { get; set; }
        public List<int> SubjectsId { get; set; }
        public List<int> Hours { get; set; }
    }
}
