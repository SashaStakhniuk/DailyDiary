using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DailyDiary.Models.ViewModels.Student
{
    public class NewStudentViewModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string LastName { get; set; }
        public DateTime Birthday { get; set; }
        public DateTime AdmissionDate { get; set; }
        public int Age { get; set; }
        public int StudyYear { get; set; }
        public int GroupId { get; set; }
        public int SubgroupId { get; set; }
        public string Email { get; set; }
    }
}
