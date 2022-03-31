using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace DailyDiary.Models.ViewModels
{
    public class GroupClassworksViewModel
    {
        [Required]
        public int GroupClassworkId { get; set; }

        [Required]
        public int SubjectId { get; set; }

        [Required]
        public int GroupId { get; set; }

        [Required]
        public string Theme { get; set; }
        [Required]
        public string Classwork { get; set; }

        [Required]
        public int TeacherId { get; set; }

        //[Required]
        //[DataType(DataType.Date)]
        //[DisplayFormat(DataFormatString = "{0:dd-MM-yyyy}", ApplyFormatInEditMode = true)]
        public DateTime Published { get; set; }

        [Required]
        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:dd-MM-yyyy}", ApplyFormatInEditMode = true)]
        public DateTime Deadline { get; set; }
    }
}
