using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace DailyDiary.Models.DbModels
{
    public class AuditoryType // історичний, математичний кабінет, актова/спорт зал
    {
        public AuditoryType()
        {
            this.TeacherSubgroupDistributions = new HashSet<TeacherSubgroupDistribution>();
            this.Auditories = new HashSet<Auditory>();
        }
        [Key]
        public int Id { get; set; }
        [Required]
        [MaxLength(45)]
        public string AuditoryTypeDescription { get; set; }
        public virtual ICollection<TeacherSubgroupDistribution> TeacherSubgroupDistributions { get; set; }
        public virtual ICollection<Auditory> Auditories { get; set; }

    }
}
