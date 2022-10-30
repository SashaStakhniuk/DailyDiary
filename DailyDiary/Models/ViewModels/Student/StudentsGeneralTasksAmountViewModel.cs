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
    public class StudentsGeneralTasksAmountViewModel
    {
        public int GivenTasksAmount { get; set; }
        public int OverdueTasksAmount { get; set; }
        public int OnCheckingTasksAmount { get; set; }
        public int PassedTasksAmount { get; set; }

    }
}
