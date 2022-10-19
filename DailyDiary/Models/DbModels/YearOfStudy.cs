using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace DailyDiary.Models.DbModels
{
    public class YearOfStudy // рік навчання
    {
        public YearOfStudy()
        {
            StudyPlans = new HashSet<StudyPlan>();
        }
        [Key]
        public int Id { get; set; }
        public int YearStudy { get; set; } //1-11
        [ForeignKey("StudyYear")]
        public int StudyYearId { get; set; }
        public StudyYear StudyYear { get; set; }
        public virtual ICollection<StudyPlan> StudyPlans { get; set; }

    }
    //public class YearOfStudy // рік навчання
    //{
    //    public YearOfStudy()
    //    {
    //        Groups = new HashSet<Group>();
    //        StudyPlans = new HashSet<StudyPlan>();
    //    }
    //    [Key]
    //    public int Id { get; set; }
    //    public int YearStudy { get; set; } //1-11
    //    public int MaxAllowedLessonsPerDay { get; set; } // максимальна кількість уроків на день для групи(класу) даного року навчання
    //    public virtual ICollection<Group> Groups { get; set; }
    //    public virtual ICollection<StudyPlan> StudyPlans { get; set; }

    //}
}
