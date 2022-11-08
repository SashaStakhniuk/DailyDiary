using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DailyDiary.Models.ViewModels.Shedule
{
    public class JournalFullDataViewModel
    {
        public int LessonId { get; set; }
        public string LessonThema { get; set; }
        public int GroupId { get; set; }
        public string GroupTitle { get; set; }
        public int SubjectId { get; set; }
        public string SubjectTitle { get; set; }
        public List<StudentJournalData> Students { get; set; }
    }
    public class StudentJournalData
    {
        public int StudentId { get; set; }
        public string Name { get; set; }
        public string MiddleName { get; set; }
        public string LastName { get; set; }
    }
}
