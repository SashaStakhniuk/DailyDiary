using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DailyDiary.Models
{
    public class StudentSubgroup
    {
        public int StudentId { get; set; }
        public Student Student { get; set; }
        public int SubgroupId { get; set; }
        public Subgroup Subgroup { get; set; }
    }
}
