﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace DailyDiary.Models.ViewModels.Student
{
    public class NewStudentViewModel
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string LastName { get; set; }
        [Required]
        public DateTime Birthday { get; set; }
        [Required]
        public DateTime AdmissionDate { get; set; }
        [Required]
        public int Age { get; set; }
        public int GroupId { get; set; }
        public string Email { get; set; }
    }
}
