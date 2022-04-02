using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace DailyDiary.Models.ViewModels
{
    public class GroupHomeworksViewModel
    {
        public int GroupHomeworkId { get; set; }
        public int GroupId { get; set; }
        public int SubjectId { get; set; }
        public string Theme { get; set; }
        //[Required]
        public string Homework { get; set; }//base64
        //public byte[] HomeworkInBytes { get; set; }
        public string FileName { get; set; }

        public int TeacherId { get; set; }

        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:dd-MM-yyyy}", ApplyFormatInEditMode = true)]
        public DateTime Published { get; set; }

        [DataType(DataType.Date)]
        //[DisplayFormat(DataFormatString = "{0:dd-MM-yyyy}", ApplyFormatInEditMode = true)]
        public DateTime Deadline { get; set; }
    }
}
