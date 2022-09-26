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
        public async Task<ActionResult<IEnumerable<StudyYear>>> Get()
        {
            return await db.StudyYears.ToListAsync();
        }

        [HttpPost]
        public async Task<IActionResult> NewPlanEducation(StudyYearViewModel model)
        {
            try
            {
                if (model.FinishYear == model.StartYear)
                {
                    return BadRequest("Check datas then try again");
                }
                if (model.FinishYear < model.StartYear)
                {
                    DateTime temp = model.StartYear;
                    model.FinishYear = temp;
                    model.StartYear = model.FinishYear;
                }
                //var st1 = await db.StudyYears.FirstOrDefaultAsync(x => x.StartYear == model.StartYear && x.FinishYear == model.FinishYear);

                var startYear = await db.StudyYears.FirstOrDefaultAsync(x => x.StartYear == model.StartYear);
                var finishYear = await db.StudyYears.FirstOrDefaultAsync(x => x.FinishYear == model.FinishYear);
                if (startYear == null && finishYear == null)
                {

                    string title = model.StartYear.Year + " / " + model.FinishYear.Year;

                    StudyYear studyYear = new StudyYear
                    {
                        Title = title,
                        StartYear = model.StartYear,
                        FinishYear = model.FinishYear
                    };
                    db.StudyYears.Add(studyYear);
                    await db.SaveChangesAsync();
                    //for (int i = model.YearsOfStudy; i >= 1; i--)

                    for (int i = 1; i <= model.YearsOfStudy; i++)
                    {
                        db.YearOfStudy.Add(new YearOfStudy { YearStudy = i, StudyYear = studyYear });
                    }
                    await db.SaveChangesAsync();
                    return Ok();
                }
                else
                {
                    if (startYear != null && finishYear != null)
                    {
                        return BadRequest("Study year already exist");
                    }
                    else if (startYear != null)
                    {
                        return BadRequest("Study year that started with entered data already exist");
                    }
                    else
                    {
                        return BadRequest("Study year that finished with entered data already exist");
                    }
                }
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

    }
}
