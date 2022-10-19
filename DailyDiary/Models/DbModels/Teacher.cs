using DailyDiary.Models.DbModels;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace DailyDiary.Models
{
    public class Teacher
    {
        public Teacher()
        {
            this.TeacherSubjects = new HashSet<TeacherSubject>();
            this.TeacherSubgroupDistributions = new HashSet<TeacherSubgroupDistribution>();
            TeacherNews = new HashSet<TeacherNews>();
        }

        [Key]
        public int Id { get; set; }
        //[MaxLength(45)]
        //public string Speciality { get; set; }
        //[MaxLength(45)]
        //public string Category { get; set; }
        //[MaxLength(45)]
        //public string Degree { get; set; }
        //[MaxLength(45)]
        //public string Education { get; set; }
        [ForeignKey("Speciality")]
        public int SpecialityId { get; set; }
        [ForeignKey("Category")]
        public int CategoryId { get; set; }
        [ForeignKey("Degree")]
        public int DegreeId { get; set; }
        [ForeignKey("Education")]
        public int EducationId { get; set; }


        public int Experience { get; set; } // ?
        public float Salary { get; set; }
        public int Rate { get; set; }
        public int? PersonId { get; set; }
        [ForeignKey("PersonId")]
        public virtual Person Person { get; set; }
        public virtual TeacherEducation Education { get; set; }
        public virtual TeacherSpeciality Speciality { get; set; }
        public virtual TeacherCategory Category { get; set; }
        public virtual TeacherDegree Degree { get; set; }

        public virtual ICollection<TeacherSubject> TeacherSubjects { get; set; }
        public virtual ICollection<TeacherSubgroupDistribution> TeacherSubgroupDistributions { get; set; }
        public virtual ICollection<TeacherNews> TeacherNews { get; set; }
    }
    //public class Teacher : Person
    //{
    //    public Teacher()
    //    {
    //        GroupClassworks = new HashSet<GroupClasswork>();
    //        GroupHomeworks = new HashSet<GroupHomework>();
    //        TeacherGroups = new HashSet<TeacherGroup>();
    //        TeacherSubjects = new HashSet<TeacherSubject>();
    //        TeacherNews = new HashSet<TeacherNews>();
    //    }

    //    [Key]
    //    public int TeacherId { get; set; }
    //    // [MaxLength(80)]
    //    public string Specialty { get; set; } 
    //    public string Category { get; set; }
    //    public string Degree { get; set; }
    //    public string Education { get; set; }
    //    public int Experience { get; set; }
    //    public float Salary { get; set; }
    //    public string Base64URL { get; set; }
    //    //[MaxLength(80)]
    //    //public string Login { get; set; }
    //    //[MaxLength(80)]
    //    //public string Email { get; set; }
    //    //[MaxLength(80)]
    //    //public string Passsword { get; set; }
    //    public int Rate { get; set; }

    //    [ForeignKey("UserId")]
    //    public string UserId { get; set; }
    //    public virtual User User { get; set; }

    //    public virtual ICollection<GroupClasswork> GroupClassworks { get; set; }
    //    public virtual ICollection<GroupHomework> GroupHomeworks { get; set; }
    //    public virtual ICollection<TeacherSubject> TeacherSubjects { get; set; }
    //    public virtual ICollection<TeacherGroup> TeacherGroups { get; set; }
    //    public virtual ICollection<TeacherNews> TeacherNews { get; set; }
    //}
}
