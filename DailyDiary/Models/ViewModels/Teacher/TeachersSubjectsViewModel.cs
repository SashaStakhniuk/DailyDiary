using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DailyDiary.Models.ViewModels.Teacher
{
    public class TeachersSubjectsViewModel
    {
        public int GroupId { get; set; }
        public List<TeachersSubjectsId> TeachersSubjectsId { get; set; }
    }
    public class TeachersSubjectsId
    {
        public int TeacherId { get; set; }
        public int SubjectId { get; set; }
    }
}
