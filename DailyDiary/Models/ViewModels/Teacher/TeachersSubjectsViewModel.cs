using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DailyDiary.Models.ViewModels.Teacher
{
    public class TeachersSubjectsViewModel
    {
        public int GroupId { get; set; } // використовується і для підгрупи
        public List<TeachersSubjectsId> TeachersSubjectsId { get; set; }
    }
    public class TeachersSubjectsId
    {
        public int TeacherId { get; set; } // ід викладача
        public int SubjectId { get; set; } // ід предмету
        public float AdditionalHours { get; set; } // додаткові години на предмет якщо необхідно (для підгруп)
        public int? AuditoryTypeId { get; set; } // тип аудиторії, у якій варто проводити предмет. Якщо не призначено, ід = 0. Урок може вестись в будь-якій аудиторії
    }
}
