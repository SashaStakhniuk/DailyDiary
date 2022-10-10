using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace DailyDiary.Models.ViewModels
{
    public class StudentsByGroupsDistributionViewModel
    {
       [Required]
        public int GroupId { get; set; }
        public List<int> StudentsId { get; set; }
    }
}
