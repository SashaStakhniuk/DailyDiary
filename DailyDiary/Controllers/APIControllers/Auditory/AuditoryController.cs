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

                //var auditories = db.Auditory.Include(x => x.AuditoryType).ToListAsync();
                //var audTypes = db.AuditoryType.Include(x => x.Auditories).ToList();
                //if (audTypes == null || audTypes.Count() == 0)
                //{
                //    throw new Exception($"No one auditory type found.");
                //}
                //return audTypes;
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }
    }
}