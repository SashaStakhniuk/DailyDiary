using System;
using System.Collections.Generic;
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
            //Semesters = new HashSet<Semester>();
        }
        public int Id { get; set; }
        public string Title { get; set; }
        public int? StudyPlanId { get; set; }
        public StudyPlan StudyPlan { get; set; }

        public ICollection<Student> Students { get; set; }
        public ICollection<Subgroup> Subgroups { get; set; }
        public ICollection<GroupHomework> GroupHomeworks { get; set; }
        public ICollection<GroupClasswork> GroupClassworks { get; set; }
        public ICollection<TeacherGroup> TeacherGroups { get; set; }
        //public ICollection<GroupSubject> GroupSubjects { get; set; }
    }
}
