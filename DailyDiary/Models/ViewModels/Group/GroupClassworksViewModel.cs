using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace DailyDiary.Models.ViewModels
{
    public class GroupClassworksViewModel
    {
        public int GroupClassworkId { get; set; }
        public int SubjectId { get; set; }
        [Required]
        public string Theme { get; set; }
        public int TeacherId { get; set; }
        public int GroupId { get; set; }
        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:dd-MM-yyyy}", ApplyFormatInEditMode = true)]
        [Required]
        public DateTime Date { get; set; }
    }
}
