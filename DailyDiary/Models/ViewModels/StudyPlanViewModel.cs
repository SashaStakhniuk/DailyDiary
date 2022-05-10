using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DailyDiary.Models.ViewModels
{
    public class StudyPlanViewModel
    {
        public int GroupId { get; set; }
        public string Title { get; set; }
        public int Semester { get; set; }
        public List<int> Subjects { get; set; }
        public List<int> ListHouts { get; set; }
    }
}
