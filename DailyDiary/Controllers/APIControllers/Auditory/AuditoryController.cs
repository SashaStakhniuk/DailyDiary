using DailyDiary.Models;
using DM = DailyDiary.Models;
using DailyDiary.Models.ViewModels;
using DailyDiary.Models.ViewModels.Group;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DailyDiary.Models.ViewModels.StudyPlan;
using System.Text.Json;
using DailyDiary.Models.DbModels;
using System.Globalization;

namespace DailyDiary.Controllers.APIControllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class AuditoryController : Controller
    {
        private readonly DailyDiaryDatasContext db;
        public AuditoryController(DailyDiaryDatasContext db)
        {
            this.db = db;
        }
        
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Auditory>>> GetAllAuditories()
        {
            try
            {
                var auditories = await db.Auditory.ToListAsync();
                if (auditories == null || auditories.Count() == 0)
                {
                    throw new Exception($"No one auditory found.");
                }
                foreach (var auditory in auditories)
                {
                    var auditoryType = await db.AuditoryType.FirstOrDefaultAsync(x=> x.Id == auditory.AuditoryTypeId);
                    auditory.AuditoryType = new AuditoryType { Id = auditoryType.Id, AuditoryTypeDescription = auditoryType.AuditoryTypeDescription };
                }
                return auditories;
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Auditory>>> GetFreeAuditories()
        {
            try
            {
                List<int?> busyAuditoriesId = null;
                //YearOfStudyController yearOfStudyController = new YearOfStudyController(db);
                //var allYearsOfStudyOfCurrentStudyYear = await yearOfStudyController.GetYearsOfStudyByCurrentStudyYear(); // всі роки навчання теперішнього навчального року
                //if (allYearsOfStudyOfCurrentStudyYear != null)
                //{
                //    var studyPlansId = new List<int>();// ід навчальних планів усіх років навчання теперішнього навчального року
                //    allYearsOfStudyOfCurrentStudyYear.Value?.ToList().ForEach(yearOfStudy => studyPlansId.AddRange(db.StudyPlans.Where(x => x.YearOfStudyId == yearOfStudy.Id).Select(x => x.Id).ToList()));
                //    studyPlansId?.ForEach(studyPlanId => busyAuditoriesId.AddRange(db.Groups.Where(x=> x.StudyPlanId == studyPlanId && x.PreferedAuditoryId!=null).Select(x => x.PreferedAuditoryId).ToList()));
                //}
                //else
                //{
                    busyAuditoriesId = await db.Groups.Where(x=> x.PreferedAuditoryId!=null).Select(x => x.PreferedAuditoryId).ToListAsync(); //шукаю ід аудиторій в які вже розподілені класи 
                //}
                var auditories = new List<Auditory>(); // список аудиторій для виводу

                if (busyAuditoriesId.Count == 0) // якщо зайнятих аудиторій немає
                {
                    auditories = await db.Auditory.ToListAsync(); //повертаю усі
                }
                else
                {
                    List<Auditory> busyAuditories = new List<Auditory>(); // список зайнятих аудиторій
                    busyAuditoriesId?.ForEach(busyAuditoryId => busyAuditories.Add(db.Auditory.FirstOrDefault(x=> x.Id==busyAuditoryId)));// усі зайняті аудиторії
                    auditories = await db.Auditory.ToListAsync(); // список усіх аудиторій
                    auditories = auditories.Except(busyAuditories).ToList(); // список усіх аудиторій, окрім зайнятих

                }
                if (auditories.Count() == 0) // якщо немає аудиторій
                {
                    return NotFound("No one auditory found.");
                }
                foreach (var auditory in auditories)
                {
                    var auditoryType = await db.AuditoryType.FirstOrDefaultAsync(x => x.Id == auditory.AuditoryTypeId);
                    if (auditoryType != null)
                    {
                        auditory.AuditoryType = new AuditoryType { Id = auditoryType.Id, AuditoryTypeDescription = auditoryType.AuditoryTypeDescription };
                    }
                }
                return auditories;
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }
    }
}