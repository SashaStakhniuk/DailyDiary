﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace DailyDiary.Models
{
    public class TeacherSubject
    {
        //[Key]
        //public int Id { get; set; }
        public int TeacherId { get; set; }
        public Teacher Teacher { get; set; }
        public int SubjectId { get; set; }
        public  Subject Subject { get; set; }
    }
}
