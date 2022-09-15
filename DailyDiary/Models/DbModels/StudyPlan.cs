using DailyDiary.Models.DbModels;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace DailyDiary.Models
{
    public class StudyPlan// Навчальний план
    {
        public StudyPlan()
        {
            Groups = new HashSet<Group>();
        }
        [Key]
        public int Id { get; set; }
        public string Title { get; set; }
        public int Semester { get; set; }
        [ForeignKey("YearOfStudy")]
        public int YearOfStudyId { get; set; }
        public string SubjectsHoursCollection { get; set; } // json предметів та виділених на них годин
        public int MaxAllowedLessonsPerDay { get; set; } // максимальна кількість уроків на день для групи(класу) даного року навчання
        public virtual YearOfStudy YearOfStudy { get; set; }
        public virtual ICollection<Group> Groups { get; set; }
    }
    //    public StudyPlan()
    //    {
    //        //SubjectsStudyPlans = new HashSet<SubjectsStudyPlan>();
    //        StudyYearStudyPlans = new HashSet<StudyYearStudyPlan>();
    //    }
    //    [Key]
    //    public int Id { get; set; }
    //    public string Title { get; set; }
    //    public int Semester { get; set; }
    //    [ForeignKey("YearOfStudy")]
    //    public int YearOfStudyId { get; set; }
    //    public int? GroupId { get; set; }
    //    public string SubjectsHoursCollection{get;set;}
    //    public virtual YearOfStudy YearOfStudy { get; set; }
    //    //public virtual ICollection<SubjectsStudyPlan> SubjectsStudyPlans { get; set; }
    //    public virtual ICollection<StudyYearStudyPlan> StudyYearStudyPlans { get; set; }
    //}
}
