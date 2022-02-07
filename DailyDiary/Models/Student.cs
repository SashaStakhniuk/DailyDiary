using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DailyDiary.Models
{
    public class Student : Person
    {
        public int StudentId { get; set; }
        public int StudyYear { get; set; } //year of study
        public string Group { get; set; }
    }
}
