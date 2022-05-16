using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DailyDiary.Models
{
    public class StudyYearGroup
    {
        public int StudyYearId { get; set; }
        public StudyYear StudyYear { get; set; }
        public int GroupId { get; set; }
        public Group Group { get; set; }
    }
}
