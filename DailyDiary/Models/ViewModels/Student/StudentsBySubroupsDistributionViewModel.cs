using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace DailyDiary.Models.ViewModels
{
    public class StudentsBySubroupsDistributionViewModel
    {
       [Required]
        public int GroupId { get; set; }
        [Required]
        public int SubgroupId { get; set; }
        public List<int> StudentsId { get; set; }
    }
}
