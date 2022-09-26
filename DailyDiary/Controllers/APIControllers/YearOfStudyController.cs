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
                    yearsOfStudy.ForEach((yearOfStudy) => yearsOfStudyToView.Add(new YearOfStudy { Id=yearOfStudy.Id, YearStudy = yearOfStudy.YearStudy })) ;

                    return yearsOfStudyToView;
                }
                else
                {
                    return NotFound("YearsOfStudy of current study year not found");
                }
            }
            return NotFound("Current study year not found");
        }
        [HttpGet("{studyYearId}")]
        public async Task<ActionResult<IEnumerable<YearOfStudy>>> GetYearsOfStudyByStudyYear(int studyYearId)
        {
            var yearsOfStudy = await db.YearOfStudy.Where(x => x.StudyYearId == studyYearId).ToListAsync();
            if (yearsOfStudy != null)
            {
                return yearsOfStudy;
            }
            return NotFound();
        }
    }
}
