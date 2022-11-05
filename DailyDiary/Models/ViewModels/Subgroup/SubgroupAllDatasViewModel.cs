using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace DailyDiary.Models.ViewModels.Subgroup
{
    public class SubgroupAllDataViewModel
    {
        public int SubgroupId { get; set; }
        public string SubgroupTitle { get; set; }
        public int SubgroupBlockId { get; set; }
        public string SubgroupBlockTitle { get; set; }
        public int GroupId { get; set; }
        public string GroupTitle { get; set; }
        public int StudentsAmount { get; set; }
        public List<Subject> Subjects { get; set; }
    }
}
