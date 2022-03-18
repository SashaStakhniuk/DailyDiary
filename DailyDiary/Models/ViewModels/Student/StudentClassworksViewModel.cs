using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace DailyDiary.Models.ViewModels
{
    public class StudentClassworksViewModel
    {
        public int ClassworkId { get; set; }
        public int StudentId { get; set; }
        [Required]
        public float Mark { get; set; }
        [Required]
        public string TeacherComment { get; set; }
    }
}
