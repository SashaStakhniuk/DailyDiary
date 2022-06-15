using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace DailyDiary.Models
{
    public class Subgroup
    {
        public Subgroup()
        {
            Students = new HashSet<Student>();
        }
        [Key]
        public int Id { get; set; }
        [MaxLength(80)]
        public string Title { get; set; }
        public int? GroupId { get; set; }
        public virtual Group Group { get; set; }
        public virtual ICollection<Student> Students { get; set; }
        
    }
}
