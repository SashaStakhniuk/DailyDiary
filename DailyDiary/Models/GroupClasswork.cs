using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace DailyDiary.Models
{
    public class GroupClasswork
    {
        public int GroupClassworkId { get; set; }
        public int SubjectId { get; set; }
        public Subject Subject { get; set; }
        public string Theme { get; set; }
        public int TeacherId { get; set; }
        public Teacher Teacher { get; set; }
        public int GroupId { get; set; }
        public Group Group { get; set; }
        [DataType(DataType.Date)]
        //[DisplayFormat(DataFormatString = "{0:dd-MM-yyyy}", ApplyFormatInEditMode = true)]
        public DateTime Date { get; set; }
        public ICollection<StudentClasswork> StudentClassworks { get; set; }


    }
}
