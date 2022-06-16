using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace DailyDiary.Models
{
    public class GroupHomework
    {
        public GroupHomework()
        {
            StudentHomeworks = new HashSet<StudentHomework>();
        }
        [Key]
        public int GroupHomeworkId { get; set; }
        [MaxLength(80)]
        public string Theme { get; set; }
        public byte[] HomeworkInBytes { get; set; }
        [MaxLength(80)]
        public string Homework { get; set; }
        [MaxLength(80)]
        public string FileName { get; set; }
        public int? TeacherId { get; set; }
        public int? GroupId { get; set; }
        public int? SubjectId { get; set; }
        // [DataType(DataType.Date)]
        // [DisplayFormat(DataFormatString = "{0:dd-MM-yyyy}", ApplyFormatInEditMode = true)]
        public DateTime Published { get; set; }

        // [DataType(DataType.Date)]
        // [DisplayFormat(DataFormatString = "{0:dd-MM-yyyy}", ApplyFormatInEditMode = true)]
        public DateTime Deadline { get; set; }
        public virtual Subject Subject { get; set; }
        public virtual Teacher Teacher { get; set; }
        public virtual Group Group { get; set; }
        public virtual ICollection<StudentHomework> StudentHomeworks { get; set; }
    }
}
