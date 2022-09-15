using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace DailyDiary.Models.DbModels
{
    public class LessonType // тип уроку. лабораторні, практичні заняття 
    {
        public LessonType()
        {
            this.WorkPlans = new HashSet<WorkPlan>();
        }
        [Key]
        public int Id { get; set; }
        [MaxLength(45)]
        public string LessonTypeDescription { get; set; }
        public virtual ICollection<WorkPlan> WorkPlans { get; set; }
    }
}
