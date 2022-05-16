using System;
using System.Collections.Generic;
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
            StudyYearGroups = new HashSet<StudyYearGroup>();
        }
        public int Id { get; set; }
        public string Title { get; set; }
        public int? StudyYearId { get; set; }
        [NotMapped]
        public StudyYear StudyYear { get; set; }
        public ICollection<Student> Students { get; set; }
        public ICollection<Subgroup> Subgroups { get; set; }
        public ICollection<GroupHomework> GroupHomeworks { get; set; }
        public ICollection<GroupClasswork> GroupClassworks { get; set; }
        public ICollection<TeacherGroup> TeacherGroups { get; set; }
        public ICollection<StudyYearGroup> StudyYearGroups { get; set; }

    }
}
