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
    public class TeachersGeneralTasksAmountViewModel
    {
        public int GivenTasksAmount { get; set; }
        public int ToCheckTasksAmount { get; set; }
        public int CheckedTasksAmount { get; set; }

    }
}
