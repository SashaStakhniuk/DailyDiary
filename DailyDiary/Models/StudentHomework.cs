using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace DailyDiary.Models
{
    public class StudentHomework
    {
        public int GroupHomeworkId { get; set; }
        public GroupHomework GroupHomework { get; set; }
        public int StudentId { get; set; }
        public Student Student { get; set; }
        public byte[] PerformedHomework { get; set; }//base64
        public string StudentComment { get; set; }
        public float Mark { get; set; }
        public string TeacherComment { get; set; }
        [DataType(DataType.Date)]
        //[DisplayFormat(DataFormatString = "{0:dd-MM-yyyy}", ApplyFormatInEditMode = true)]
        public DateTime Published { get; set; }

    }
}
