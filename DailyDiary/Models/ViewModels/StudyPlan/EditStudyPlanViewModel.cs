using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;


namespace DailyDiary.Models.ViewModels.StudyPlan
{
    public class EditStudyPlanViewModel
    {
        [Required]
        public int Id { get; set; }
        public string Title { get; set; } 
        public Boolean CurrentStudyPlan { get; set; }
        public int Semester { get; set; }
        public List<int> SubjsId { get; set; }
        public List<int> Hours { get; set; }
    }
}
