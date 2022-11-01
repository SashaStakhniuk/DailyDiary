using DailyDiary.Models.ViewModels.WorkWithFiles;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace DailyDiary.Models.DbModels
{
    public class StudentsWorkToCheckViewModel
    {
        public int Id { get; set; } // ід виконаної домашки студента
        public int TaskId { get; set; } // ід заданого завдання
        //public bool CheckIfAlreadyRated { get; set; } // перевірка чи завдання вже було оцінене
        public DateTime PublishDate { get; set; } // дата публікації завдання
        public DateTime Deadline { get; set; } // дедлайн здачі завдання
        public string Theme { get; set; }
        public string Comment { get; set; }
        //public string FileName { get; set; } // назва файлу
        //public string FileType { get; set; } // тип файлу
        //public byte[] StudentWork { get; set; }
        public DateTime PassedDate { get; set; } // дата завантаження домашки
        public string StudentComment { get; set; }
        public int TeacherId { get; set; }
        public string TeacherComment { get; set; }

        public int Mark { get; set; } // оцінка
        public DateTime CheckedDate { get; set; } // дата перевірки домашки

        public Subject Subject { get; set; }
        public Subgroup Group { get; set; }
        public StudentData StudentData { get; set; }
    }
    public class StudentData
    {
        public int StudentId { get; set; }
        public string StudentFullName { get; set; }
    }
}
