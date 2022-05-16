using DailyDiary.Models.ViewModels.StudyYear;
using DM = DailyDiary.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DailyDiary.Controllers.APIControllers.StudyYear
{

    [ApiController]
    [Route("api/[controller]/[action]")]
    public class StudyYearController : Controller
    {
        public async Task<ActionResult<DM.StudyYear>> Create(StudyYearViewModel model)
        {
            DM.StudyYear studyYear = new DM.StudyYear();

            return Ok(studyYear);
        }
    }
}
