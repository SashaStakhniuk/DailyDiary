using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace DailyDiary.Models
{
    public class Teacher : Person
    {
        public Teacher()
        {
            GroupClassworks = new HashSet<GroupClasswork>();
            GroupHomeworks = new HashSet<GroupHomework>();
            TeacherGroups = new HashSet<TeacherGroup>();
            TeacherSubjects = new HashSet<TeacherSubject>();
            TeacherNews = new HashSet<TeacherNews>();
        }

        [Key]
        public int TeacherId { get; set; }
        // [MaxLength(80)]
        public string Specialty { get; set; } 
        public string Category { get; set; }
        public string Degree { get; set; }
        public string Education { get; set; }
        public int Experience { get; set; }
        public float Salary { get; set; }
        public string Base64URL { get; set; }
        //[MaxLength(80)]
        //public string Login { get; set; }
        //[MaxLength(80)]
        //public string Email { get; set; }
        //[MaxLength(80)]
        //public string Passsword { get; set; }
        public int Rate { get; set; }

        [ForeignKey("UserId")]
        public string UserId { get; set; }
        public virtual User User { get; set; }

        public virtual ICollection<GroupClasswork> GroupClassworks { get; set; }
        public virtual ICollection<GroupHomework> GroupHomeworks { get; set; }
        public virtual ICollection<TeacherSubject> TeacherSubjects { get; set; }
        public virtual ICollection<TeacherGroup> TeacherGroups { get; set; }
        public virtual ICollection<TeacherNews> TeacherNews { get; set; }
    }
}
