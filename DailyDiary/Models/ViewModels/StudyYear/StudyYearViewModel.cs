using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace DailyDiary.Models.ViewModels.StudyYear
{
    public class StudyYearViewModel
    {
        [Required]
        public DateTime StartYear { get; set; }
        [Required]
        public DateTime FinishYear { get; set; }
        [Required]
        public int YearsOfStudy { get; set; }
    }
}
