using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DailyDiary.Models.ViewModels.WorkWithFiles
{
    public class TaskFullDataViewModel
    {
        public int Id { get; set; } // taskId
        public DateTime PublishDate { get; set; } // дата публікації
        public DateTime Deadline { get; set; } // дедлайн
        public string Theme { get; set; } // тема
        public string Comment { get; set; } // коментар
        public Subject Subject { get; set; }// предмет
        public TeacherData TeacherData { get; set; } // викладач
    }
    public class TeacherData
    {
        public int TeacherId { get; set; } // ід викладача
        public string TeacherFullName { get; set; } // ід викладача
    }
}
