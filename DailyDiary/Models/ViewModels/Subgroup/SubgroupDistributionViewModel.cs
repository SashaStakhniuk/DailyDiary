using DailyDiary.Models.DbModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DailyDiary.Models.ViewModels.Subgroup
{
    public class SubgroupDistributionViewModel
    {
        public int SubgroupDistributionId { get; set; } // ід розділу предмет-викладач-тип аудиторії
        public int SubjectId { get; set; } // ід предмету
        public string SubjectTitle { get; set; } // назва предмету
        public int? AuditoryTypeId { get; set; } // ід типу аудиторії
        public string AuditoryTypeTitle { get; set; } // тип аудиторії
        public List<Auditory> Auditories { get; set; } // всі аудиторії обраного типу
        public float AdditionalHours { get; set; } // додаткові години на предмет
        public int TeacherId { get; set; } // ід викладача
        public string TeacherName { get; set; } // ім'я 
        public string TeacherLastName { get; set; } // прізвище

    }
}
