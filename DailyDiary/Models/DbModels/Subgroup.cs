using DailyDiary.Models.DbModels;
using DailyDiary.Models.IntermediateModels;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace DailyDiary.Models
{
    public class Subgroup
    {
        public Subgroup()
        {
            this.StudentsBySubgroups = new HashSet<StudentsBySubgroup>();
            this.UnionsSubgroups = new HashSet<UnionsSubgroup>();
            this.TeacherSubgroupDistributions = new HashSet<TeacherSubgroupDistribution>();
        }
        [Key]
        public int Id { get; set; }
        [MaxLength(45)]
        [Required]
        public string Title { get; set; }
        [ForeignKey("Group")]
        public int GroupId { get; set; }
        public virtual Group Group { get; set; }
        [ForeignKey("SubgroupBlock")]
        public int SubgroupBlockId { get; set; }
        public virtual SubgroupBlock SubgroupBlock { get; set; }
        public virtual ICollection<StudentsBySubgroup> StudentsBySubgroups { get; set; }
        public virtual ICollection<UnionsSubgroup> UnionsSubgroups { get; set; }
        public virtual ICollection<TeacherSubgroupDistribution> TeacherSubgroupDistributions { get; set; }

    }
    //public class Subgroup
    //{
    //    public Subgroup()
    //    {
    //        Students = new HashSet<Student>();
    //    }
    //    [Key]
    //    public int Id { get; set; }
    //    [MaxLength(80)]
    //    public string Title { get; set; }
    //    public int? GroupId { get; set; }
    //    public virtual Group Group { get; set; }
    //    public virtual ICollection<Student> Students { get; set; }

    //}
}
