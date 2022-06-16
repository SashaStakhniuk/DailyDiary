using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace DailyDiary.Models
{
    public class StudentNews
    {
        [Key]
        public int Id { get; set; }
        public int StudentId { get; set; }
        public int NewsId { get; set; }
        public bool? IsRead { get; set; }
        public virtual News News { get; set; }
        public virtual Student Student { get; set; }
    }
}
