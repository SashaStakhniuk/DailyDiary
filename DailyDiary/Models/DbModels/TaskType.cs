using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace DailyDiary.Models.DbModels
{
    public class TaskType // тип завдання: домашка, самостійна, екзамен
    {
        public TaskType()
        {
            this.Tasks = new HashSet<Task>();
        }
        [Key]
        public int Id { get; set; }
        [MaxLength(45)]
        public string TaskTypeDescription { get; set; }
        public virtual ICollection<Task> Tasks { get; set; }
    }
}
