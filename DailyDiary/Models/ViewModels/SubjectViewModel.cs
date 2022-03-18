using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace DailyDiary.Models.ViewModels
{
    public class SubjectViewModel
    {
        public int Id { get; set; }
        [Required]
        public string Title { get; set; }
    }
}
