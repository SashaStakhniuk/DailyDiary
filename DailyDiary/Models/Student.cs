using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace DailyDiary.Models
{
    public class Student 
    {
        public Student()
        {
            StudentNews = new HashSet<StudentNews>();
        }
        public int StudentId { get; set; }
        public string Name { get; set; }
        public string LastName { get; set; }
       /* [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:dd-MM-yyyy}", ApplyFormatInEditMode = true)]*/
        public Nullable<DateTime> Birthday { get; set; }
        public int Age { get; set; }
        public int StudyYear { get; set; } //year of study
        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:dd-MM-yyyy}", ApplyFormatInEditMode = true)]
        public Nullable<DateTime> AdmissionDate{ get; set; } //Date of learning start
        //public string Group { get; set; }
        public int? GroupId { get; set; }
        public Group Group { get; set; }
        public int? SubgroupId { get; set; }
        public Subgroup Subgroup { get; set; }
        public string Login { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public string PrevName { get; set; }
        public string Base64URL { get; set; }
        public int Rate { get; set; } 
        public ICollection<StudentClasswork> StudentClassworks { get; set; }
        public ICollection<StudentHomework> StudentHomeworks { get; set; }
        public ICollection<StudentNews> StudentNews { get; set; }
    }
}
