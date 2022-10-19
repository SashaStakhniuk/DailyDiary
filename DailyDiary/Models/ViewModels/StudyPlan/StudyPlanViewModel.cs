using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace DailyDiary.Models.ViewModels
{
    public class StudyPlanViewModel
    {
        [Required]
        [MaxLength(100, ErrorMessage = "Plan description must include less than 100 characters")]
        public string PlanTitle { get; set; }
        [Required]
        [Range(0, 2, ErrorMessage = "Semester should has value 0 if study plan created for all year, or else semester number")]
        public int Semester { get; set; }
        [Required]
        [Range(0, Int32.MaxValue, ErrorMessage = "Study year id can't be less than 0")] //  and bigger than 2147483647
        public int StudyYearId { get; set; }
        [Required]
        [Range(0, Int32.MaxValue, ErrorMessage = "Year of study id can't be less than 0")]
        public int YearOfStudyId { get; set; }
        [Required]
        [Range(1, Int32.MaxValue, ErrorMessage = "Max allowed lessons per day can't be 0")]
        public int MaxAllowedLessonsPerDay { get; set; } // максимальна кількість уроків на день для групи(класу) даного року навчання
        [Required]
        public List<SubjectsHours> SubjectsToAdd { get; set; }
    }
    public class SubjectsHours
    {
        public string SubjectId { get; set; }
        public string Hours { get; set; }
    }
}
