using DailyDiary.Models.IntermediateModels;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace DailyDiary.Models.DbModels
{
    public class Parent
    {
        public Parent()
        {
            this.ParentStudents = new HashSet<ParentStudent>();
        }
        [Key]
        public int Id { get; set; } //id
        public int? PersonId { get; set; }
        [ForeignKey("PersonId")]
        public virtual Person Person { get; set; }//посилання на запис
        public virtual ICollection<ParentStudent> ParentStudents { get; set; }
    }
}
