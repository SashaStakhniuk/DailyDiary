using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace DailyDiary.Models.DbModels
{
    public class TeacherSubgroupDistribution // Розподіл навантаження на викладачів та підгруп/union-ів. 
    {
        public TeacherSubgroupDistribution()
        {
            this.WorkPlans = new HashSet<WorkPlan>();
            this.Tasks = new HashSet<Task>(); // тимчасово // завдання необхідно додавати через робочий план, але оскільки його поки немає, роблю зв'язок напряму із Tasks
            this.Shedules = new HashSet<Shedule>();
        }
        [Key]
        public int Id { get; set; }
        [ForeignKey("Subgroup")]
        public int? SubgroupId { get; set; } // яка підгрупа. може бути або тільки підгрупа або тільки юніон (замість групи вказується її дефолтна підгрупа)

        [ForeignKey("Teacher")]
        public int? TeacherId { get; set; } // викладач
        [ForeignKey("Subject")]
        public int SubjectId { get; set; } // предмет

        [ForeignKey("Union")]
        public int? UnionId { get; set; } // або тільки юніон.  може бути або тільки підгрупа або тільки юніон
        [ForeignKey("AuditoryType")]
        public int? AuditoryTypeId { get; set; } // в якому типі аудиторії необхідно провести пару
        public float? AdditionalHours { get; set; } //якщо це предмет на який виділяються додаткові години (для підгруп)
        public virtual Subgroup Subgroup { get;set;}
        public virtual Teacher Teacher { get; set; }
        public virtual Subject Subject { get; set; }
        public virtual Union Union { get; set; }
        public virtual AuditoryType AuditoryType { get; set; }
        public virtual ICollection<WorkPlan> WorkPlans { get; set; }

        public virtual ICollection<Task> Tasks { get; set; } // тимчасово

        public virtual ICollection<Shedule> Shedules { get; set; }

    }
}
