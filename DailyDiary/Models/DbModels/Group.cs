using DailyDiary.Models.DbModels;
using System;
using System.Collections.Generic;
using System.ComponentModel;
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
            Subgroups = new HashSet<Subgroup>();
        }
        [Key]
        public int Id { get; set; }
        [MaxLength(45)]
        public string Title { get; set; }
        public int DefSubgroupId { get; set; }// основна підгрупа, для подальшої роботи з розкладом, зменшення к-сті таблиць, всі студенти групи знаходяться в підгрупах
        
        [ForeignKey("Auditory")]
        public int? PreferedAuditoryId { get; set; }
        [ForeignKey("StudyPlan")]
        public int? StudyPlanId { get; set; }
        public virtual Auditory Auditory { get; set; }//посилання на запис
        public virtual StudyPlan StudyPlan { get; set; }//посилання на StudyPlan

        public virtual ICollection<Subgroup> Subgroups { get; set; }
    }

    //public class Group
    //{
    //    public Group()
    //    {
    //        Students = new HashSet<Student>();
    //        Subgroups = new HashSet<Subgroup>();
    //        GroupHomeworks = new HashSet<GroupHomework>();
    //        GroupClassworks = new HashSet<GroupClasswork>();
    //        TeacherGroups = new HashSet<TeacherGroup>();
    //    }
    //    [Key]
    //    public int Id { get; set; }
    //    [MaxLength(80)]
    //    public string Title { get; set; }

    //    [ForeignKey("YearOfStudy")]
    //    public int YearOfStudyId { get; set; }
    //    public int? StudyYearId { get; set; }
    //    public virtual StudyYear StudyYear { get; set; }
    //    public virtual YearOfStudy YearOfStudy { get; set; }

    //    public virtual ICollection<Student> Students { get; set; }
    //    public virtual ICollection<Subgroup> Subgroups { get; set; }
    //    public virtual ICollection<GroupHomework> GroupHomeworks { get; set; }
    //    public virtual ICollection<GroupClasswork> GroupClassworks { get; set; }
    //    public virtual ICollection<TeacherGroup> TeacherGroups { get; set; }
    //}
}
