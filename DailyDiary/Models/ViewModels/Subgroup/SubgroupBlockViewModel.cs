using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace DailyDiary.Models.ViewModels.Subgroup
{
    public class SubgroupBlockViewModel
    {
        public int SubgroupId { get; set; }
        [MaxLength(45)]
        public string SubgroupBlockTitle { get; set; }
    }
}
