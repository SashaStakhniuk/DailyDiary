using DailyDiary.Models.DbModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DailyDiary.Models.IntermediateModels
{
    public class ParentStudent
    {
        public int? ParentId { get; set; }
        public int? StudentId { get; set; }
        public virtual Parent Parent { get; set; }
        public virtual Student Student { get; set; }

    }
}
