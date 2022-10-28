using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace DailyDiary.Models.DbModels
{
    public class StudentsWork
    {
        [Key]
        public int Id { get; set; }
        [ForeignKey("Task")]
        public int TaskId { get; set; }
        public virtual Task Task { get; set; }
        [ForeignKey("Student")]
        public int StudentId { get; set; }
        public virtual Student Student { get; set; }
        public byte[] StudentWork { get; set; }
        public string FileName { get; set; } // назва файлу
        public string FileType { get; set; } // тип файлу
        [MaxLength(400)]
        public string StudentComment { get; set; }
        public DateTime UploadDate { get; set; } // дата завантаження роботи студентом
        [ForeignKey("Teacher")]
        public int? TeacherId { get; set; }
        public virtual Teacher Teacher { get; set; }
        public string TeacherComment { get; set; }
        public int? Mark { get; set; } // оцінка
        [MaxLength(400)]
        public DateTime? CheckDate { get; set; } // дата перевірки

    }
}
