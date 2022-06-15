using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace DailyDiary.Models
{
    public class Group
    {
        public Group()
        {
            Students = new HashSet<Student>();
            Subgroups = new HashSet<Subgroup>();
            GroupHomeworks = new HashSet<GroupHomework>();
            GroupClassworks = new HashSet<GroupClasswork>();
            TeacherGroups = new HashSet<TeacherGroup>();
        }
        [Key]
        public int Id { get; set; }
        [MaxLength(80)]
        public string Title { get; set; }
        public int? StudyYearId { get; set; }
        public virtual StudyYear StudyYear { get; set; }
        public virtual ICollection<Student> Students { get; set; }
        public virtual ICollection<Subgroup> Subgroups { get; set; }
        public virtual ICollection<GroupHomework> GroupHomeworks { get; set; }
        public virtual ICollection<GroupClasswork> GroupClassworks { get; set; }
        public virtual ICollection<TeacherGroup> TeacherGroups { get; set; }
    }
}
