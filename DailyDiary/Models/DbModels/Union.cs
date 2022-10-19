using DailyDiary.Models.IntermediateModels;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace DailyDiary.Models.DbModels
{
    public class Union //об'єднання підгруп різних груп
    {
        public Union()
        {
            this.UnionsSubgroups = new HashSet<UnionsSubgroup>();
            this.TeacherSubgroupDistributions = new HashSet<TeacherSubgroupDistribution>();
        }
        [Key]
        public int Id { get; set; }
        public string UnionTitle { get; set; }
        [ForeignKey("UnionBlock")]
        public int UnionBlockId { get; set; }
        public virtual UnionBlock UnionBlock { get; set; }
        public virtual ICollection<UnionsSubgroup> UnionsSubgroups { get; set; }
        public virtual ICollection<TeacherSubgroupDistribution> TeacherSubgroupDistributions { get; set; }

    }
}
