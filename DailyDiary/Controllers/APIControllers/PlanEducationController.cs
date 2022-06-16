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

namespace DailyDiary.Controllers.APIControllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class PlanEducationController : Controller
    {
        private readonly DailyDiaryDatasContext db;
        public PlanEducationController(DailyDiaryDatasContext db)
        {
            this.db = db;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<DM.StudyYear>>> Get()
        {
            return await db.StudyYears.ToListAsync();
        }

        [HttpPost]
        public async Task<ActionResult<Boolean>> NewPlanEducation(StudyYearViewModel model)
        {
            try
            {
                var st = await db.StudyYears.FirstOrDefaultAsync(x => x.StartYear == model.StartYear && x.FinishYea == model.FinishYea);
                if (st == null)
                {
                    if (model.FinishYea > model.StartYear)
                    {
                        string title = model.StartYear.ToLongDateString() + " - " + model.FinishYea.ToLongDateString();

                        StudyYear studyYear = new StudyYear
                        {
                            Title = title,
                            StartYear = model.StartYear,
                            FinishYea = model.FinishYea
                        };
                        db.StudyYears.Add(studyYear);
                        await db.SaveChangesAsync();
                        return Ok(studyYear);
                    }
                }

            } catch (Exception) { }
            return BadRequest();
        }

    }
}
