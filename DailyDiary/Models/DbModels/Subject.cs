using DailyDiary.Models.DbModels;
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
            this.TeacherSubjects = new HashSet<TeacherSubject>();
            this.TeacherSubgroupDistributions = new HashSet<TeacherSubgroupDistribution>();
        }

        [Key]
        public int Id { get; set; }
        [MaxLength(45)]
        public string Title { get; set; }
        public int Priority { get; set; } // по тяжкості сприйняття предмету
        public virtual ICollection<TeacherSubject> TeacherSubjects { get; set; }
        public virtual ICollection<TeacherSubgroupDistribution> TeacherSubgroupDistributions { get; set; }

    }
    //public class Subject
    //{
    //   public Subject()
    //    {
    //        GroupClassworks = new HashSet<GroupClasswork>();
    //        GroupHomeworks = new HashSet<GroupHomework>();
    //        TeacherSubjects = new HashSet<TeacherSubject>();
    //        //SubjectsStudyPlans = new HashSet<SubjectsStudyPlan>();
    //    }

    //    [Key]
    //    public int Id { get; set; }
    //    public int? SubjectCode { get; set; }
    //    [MaxLength(80)]
    //    public string Title { get; set; }
    //    public virtual ICollection<GroupClasswork> GroupClassworks { get; set; }
    //    public virtual ICollection<GroupHomework> GroupHomeworks { get; set; }
    //    public virtual ICollection<TeacherSubject> TeacherSubjects { get; set; }
    //    //public virtual ICollection<SubjectsStudyPlan> SubjectsStudyPlans { get; set; }
    //}
}
