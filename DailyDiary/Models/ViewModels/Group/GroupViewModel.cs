using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace DailyDiary.Models.ViewModels
{
    public class GroupViewModel
    {
        public int Id { get; set; }
        [Required]
        public string Title { get; set; }
        [Required]
        public int YearOfStudyId { get; set; }
        [Required]
        public int StudyPlanId { get; set; }
        public int PreferedAuditoryId { get; set; }
        public int GroupId { get; set; }
    }
}
