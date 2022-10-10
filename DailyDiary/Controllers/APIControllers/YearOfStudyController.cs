using DailyDiary.Models;
using DailyDiary.Models.DbModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DailyDiary.Controllers.APIControllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class YearOfStudyController : Controller
    {
        private readonly DailyDiaryDatasContext db;

        public YearOfStudyController(DailyDiaryDatasContext db)
        {
            this.db = db;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<YearOfStudy>>> GetYearsOfStudyByCurrentStudyYear()
        {
            var currentDate = DateTime.Today; // 26.09.2022 0:00:00
            //                                                             01.09.2021 <= 26.09.2022  &&  30.06.2022 >= 26.09.2022 - ne ok
            //                                                             01.09.2022 <= 26.09.2022  &&  30.06.2023 >= 26.09.2022 - Ok
            //                                                             01.09.2023 <= 01.01.2023  &&  30.06.2024 >= 01.01.2023 - ne ok
            var studyYear = await db.StudyYears.FirstOrDefaultAsync(x => x.StartYear <= currentDate && x.FinishYear >= currentDate);
            if (studyYear != null)
            {
                var yearsOfStudy = await db.YearOfStudy.Where(x => x.StudyYearId == studyYear.Id).ToListAsync();
                if (yearsOfStudy != null)
                {
                    List<YearOfStudy> yearsOfStudyToView = new List<YearOfStudy>();
                    yearsOfStudy.ForEach((yearOfStudy) => yearsOfStudyToView.Add(new YearOfStudy { Id = yearOfStudy.Id, YearStudy = yearOfStudy.YearStudy }));
                    return yearsOfStudyToView;
                }
                else
                {
                    return NotFound("Years of study of current study year not found");
                }
            }
            return NotFound("Current study year not found");
        }

        [HttpGet("{studyYearId}")]
        public async Task<ActionResult<IEnumerable<YearOfStudy>>> GetYearsOfStudyByStudyYear(int studyYearId)
        {
            try
            {
                if (studyYearId <= 0)
                {
                    return BadRequest("Study year id can't be <= 0");
                }
                var studyYear = await db.StudyYears.FirstOrDefaultAsync(x => x.Id == studyYearId);
                {
                    if (studyYear == null)
                    {
                        return NotFound("Selected study year not found");
                    }
                    var yearsOfStudy = await db.YearOfStudy.Where(x => x.StudyYearId == studyYearId).ToListAsync();
                    if (yearsOfStudy != null)
                    {
                        List<YearOfStudy> yearsOfStudyToDisplay = new List<YearOfStudy>();
                        foreach (var yearOfStudy in yearsOfStudy)
                        {
                            yearsOfStudyToDisplay.Add(new YearOfStudy { Id = yearOfStudy.Id, YearStudy = yearOfStudy.YearStudy });
                        }
                        return yearsOfStudyToDisplay;
                    }
                    return NotFound("No one year of study of selected study year found");
                }
            }
            catch(Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }
    }
}
