using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace DailyDiary.Models.ViewModels.Subgroup
{
    public class SubgroupViewModel
    {
        [Required]
        public int SubgroupId { get; set; }
        [MaxLength(45)]
        public string SubgroupTitle { get; set; }
        [MaxLength(45)]
        public string SubgroupBlockTitle { get; set; }
        [Required]
        public int GroupId { get; set; }
    }
}
