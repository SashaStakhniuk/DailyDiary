using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace DailyDiary.Models.DbModels
{
    public class Task // задане завдання 
    {
        public Task()
        {
            this.StudentsWorks = new HashSet<StudentsWork>();
        }
        [Key]
        public int Id { get; set; }
        public byte[] TaskInBytes { get; set; }
        public DateTime PublishDate { get; set; }
        public DateTime Deadline { get; set; }
        [ForeignKey("TaskType")]
        public int TaskTypeId { get; set; }
        public virtual TaskType TaskType { get; set; }

        [ForeignKey("WorkPlan")]
        public int WorkPlanId { get; set; }
        public virtual WorkPlan WorkPlan { get; set; }

        public virtual ICollection<StudentsWork> StudentsWorks { get; set; }
    }
}
