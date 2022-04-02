using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace DailyDiary.Models
{
    public class GroupHomework
    {
        public int GroupHomeworkId { get; set; }
        public int GroupId { get; set; }
        public int SubjectId { get; set; }
        public string Theme { get; set; }
        public byte[] HomeworkInBytes { get; set; }
        public string Homework { get; set; }//base64    
        public string FileName { get; set; }

        public int TeacherId { get; set; }

        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:dd-MM-yyyy}", ApplyFormatInEditMode = true)]
        public DateTime Published { get; set; }

        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:dd-MM-yyyy}", ApplyFormatInEditMode = true)]
        public DateTime Deadline { get; set; }
        public Subject Subject { get; set; }

        public Teacher Teacher { get; set; }
        //public Subject Subject { get; set; }
        public Group Group { get; set; }
        public ICollection<StudentHomework> StudentHomeworks { get; set; }
    }
}
