using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace DailyDiary.Models
{
    public class Subject
    {
       public Subject()
        {
            GroupClassworks = new HashSet<GroupClasswork>();
            GroupHomeworks = new HashSet<GroupHomework>();
        }
        public int Id { get; set; }
        public int SubjectCode { get; set; }
        public string Title { get; set; }
        public ICollection<GroupClasswork> GroupClassworks { get; set; }
        public ICollection<GroupHomework> GroupHomeworks { get; set; }

        public ICollection<TeacherSubject> TeacherSubjects { get; set; }
        public ICollection<SubjectsStudyPlan> SubjectsStudyPlans { get; set; }

        //public ICollection<GroupSubject> GroupSubjects { get; set; }
        //public ICollection<SemesterGroupSubject> SemesterGroupSubjects { get; set; }
    }
}
