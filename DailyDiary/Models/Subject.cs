using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace DailyDiary.Models
{
    public class Subject
    {
        //public Subject()
        //{
        //}
        //[Key]
        public int Id { get; set; }
        public string Title { get; set; }
        //public int TeacherId { get; set; }
        //public ICollection<Teacher> Teachers { get; set; }
        public ICollection<TeacherSubject> TeacherSubjects { get; set; }

    }
}
