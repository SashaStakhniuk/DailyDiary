using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace DailyDiary.Models
{
    public class StudyYearGroup
    {
        [Key]
        public int Id { get; set; }
        public int StudyYearId { get; set; }
        public int GroupId { get; set; }
        public virtual Group Group { get; set; }
        public virtual StudyYear StudyYear { get; set; }
    }
}
