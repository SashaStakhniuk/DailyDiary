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
            this.TeacherNews = new HashSet<TeacherNews>();
            this.StudentsWorks = new HashSet<StudentsWork>();
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
        public virtual ICollection<StudentsWork> StudentsWorks { get; set; }
    }
}