using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DailyDiary.Models.ViewModels.WorkWithFiles
{
    public class HomeworkTaskViewModel
    {
        public int Id { get; set; } // taskId
        public string FileName { get; set; } // назва файлу
        public IFormFile FormFile { get; set; } // файл
        public List<IFormFile> FormFiles { get; set; } // для масиву файлів
        public DateTime PublishDate { get; set; } // дата публікації
        public DateTime Deadline { get; set; } // дедлайн
        public string Theme { get; set; } // тема
        public string Comment { get; set; } // коментар
        public int TaskTypeId { get; set; } // тип завдання
        //public int WorkPlanId { get; set; }
        public string TeacherUserId { get; set; } // ід викладача
        public int SubjectId { get; set; }// ід предмету
        public int SubgroupId { get; set; } // ід підгрупи

    }
}
