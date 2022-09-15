using DailyDiary.Models.DbModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DailyDiary.Models.IntermediateModels
{
    public class UnionsSubgroup // які підгрупи включаються в юніони
    {
        public int UnionId { get; set; }
        public int SubgroupId { get; set; }
        public virtual Union Union { get; set; }
        public virtual Subgroup Subgroup { get; set; }
    }
}
