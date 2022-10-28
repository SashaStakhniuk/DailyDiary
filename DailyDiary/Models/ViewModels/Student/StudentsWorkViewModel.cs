using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace DailyDiary.Models.DbModels
{
    public class StudentsWorkViewModel
    {
        public int Id { get; set; }
        public int TaskId { get; set; }
        public int StudentId { get; set; }
        //public byte[] StudentWork { get; set; }
        public string FileName { get; set; } // назва файлу
        public string FileType { get; set; } // тип файлу
        public IFormFile FormFile { get; set; } // файл
        public string StudentComment { get; set; }
        public int TeacherId { get; set; }
        public string TeacherComment { get; set; }
        public int Mark { get; set; } // оцінка
    }
}
