using DailyDiary.Models;
using DM = DailyDiary.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DailyDiary.Models.ViewModels.StudyYear;
using Microsoft.EntityFrameworkCore;
using DailyDiary.Models.ViewModels;
using DailyDiary.Models.DbModels;
using DailyDiary.Models.ViewModels.Teacher;
using DailyDiary.Models.ViewModels.Subgroup;

namespace DailyDiary.Controllers.APIControllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class StudyProcessController : Controller
    {
        private readonly DailyDiaryDatasContext db;
        public StudyProcessController(DailyDiaryDatasContext db)
        {
            this.db = db;
        }

        
    }
}