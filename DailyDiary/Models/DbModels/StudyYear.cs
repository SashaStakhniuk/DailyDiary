using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace DailyDiary.Models
{
    public class StudyYear
    {
        public StudyYear()
        {
            StudyYearStudyPlans = new HashSet<StudyYearStudyPlan>();
            Groups = new HashSet<Group>();
        }
        [Key]
        public int Id { get; set; }
        [Required]
        public string Title { get; set; }
        public DateTime? StartYear { get; set; }
        public DateTime? FinishYear { get; set; }
        public virtual ICollection<StudyYearStudyPlan> StudyYearStudyPlans { get; set; }
        public virtual ICollection<Group> Groups { get; set; }
    }
}
