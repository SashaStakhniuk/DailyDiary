using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace DailyDiary.Models.DbModels
{
    public class TeacherEducation
    {
        public TeacherEducation()
        {
            this.Teachers = new HashSet<Teacher>();
        }
        [Key]
        public int Id { get; set; }
        [MaxLength(45)]
        public string Description { get; set; }
        public ICollection<Teacher> Teachers { get; set; } 
    }
}
