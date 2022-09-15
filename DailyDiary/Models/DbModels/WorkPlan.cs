using DailyDiary.Models.IntermediateModels;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace DailyDiary.Models.DbModels
{
    public class WorkPlan // робочий план викладача
    {
        public WorkPlan()
        {
            this.Tasks = new HashSet<Task>();
            this.LessonStudyMaterials = new HashSet<LessonStudyMaterial>();
        }
        [Key]
        public int Id { get; set; }
        public DateTime LessonDate { get; set; }
        [ForeignKey("LessonType")]
        public int LessonTypeId { get; set; }
        public virtual LessonType LessonType { get; set; }
        [ForeignKey("TeacherSubgroupDistribution")]
        public int TeacherSubgroupDistributionId { get; set; }
        public virtual TeacherSubgroupDistribution TeacherSubgroupDistribution { get; set; }
        [MaxLength(100)]
        public string Thema { get; set; }
        [MaxLength(100)]
        public string Comment { get; set; }
        public virtual ICollection<Task> Tasks { get; set; }
        public virtual ICollection<LessonStudyMaterial> LessonStudyMaterials { get; set; }

    }
}
