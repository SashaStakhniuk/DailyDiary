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
        public DateTime UploadDate { get; set; }
        public byte[] StudentWork { get; set; }
        public int Mark { get; set; }
        [MaxLength(400)]
        public string TeacherComment { get; set; }
        [MaxLength(400)]
        public string StudentComment { get; set; }
    }
}
