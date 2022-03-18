using DailyDiary.Models;
using DailyDiary.Models.ViewModels;
using Microsoft.AspNetCore.Authorization;
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
    [Authorize(Roles = "MainAdmin,Admin,Teacher")]
    public class GroupClassworksController : Controller
    {              
         private readonly DailyDiaryDatasContext db;
         public GroupClassworksController(DailyDiaryDatasContext datasContext)
         {
             this.db = datasContext;
         }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<GroupClasswork>>> Get()
        {
            return await db.GroupClassworks.ToListAsync();
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<GroupClasswork>> Get(int id)
        {
            var classwork = await db.GroupClassworks.FirstOrDefaultAsync(x => x.GroupClassworkId == id);
            if (classwork == null)
            {
                return NotFound();
            }
            return Ok(classwork);
        }

        [HttpPut]
        [Authorize(Roles = "MainAdmin,Admin")]
        public async Task<IActionResult> CreateOrUpdateTeacherAsync(GroupClassworksViewModel model)
        {
            if (ModelState.IsValid)
            {
                if (model != null)
                {

                    // тут зробити перевірку моделі
                    //if (model.Salary <= 0)
                    //{
                    //    ModelState.AddModelError("SalaryError", "Salary must be bigger than 0");
                    //}
                    //if (!ModelState.IsValid)
                    //{
                    //    //ModelState.AddModelError("DatasModelError", "Please,enter all required datas correctly");
                    //    return BadRequest(ModelState);
                    //}


                    var classworkDatasToEdit = await db.GroupClassworks.FirstOrDefaultAsync(x => x.GroupClassworkId == model.GroupClassworkId);
                    if (classworkDatasToEdit == null)
                    {
                        classworkDatasToEdit = new GroupClasswork
                        {
                            SubjectId = model.SubjectId,
                            Theme = model.Theme,
                            TeacherId = model.TeacherId,
                            GroupId = model.GroupId,
                            Date = model.Date                        
                        };
                    }
                    else
                    {
                        //classworkDatasToEdit.GroupClassworkId = model.GroupClassworkId;
                        classworkDatasToEdit.SubjectId = model.SubjectId;
                        classworkDatasToEdit.Theme = model.Theme;
                        classworkDatasToEdit.TeacherId = model.TeacherId;
                        classworkDatasToEdit.GroupId = model.GroupId;
                        classworkDatasToEdit.Date = model.Date;
                    }
                    db.GroupClassworks.Update(classworkDatasToEdit);
                    await db.SaveChangesAsync();
                    return Ok(classworkDatasToEdit);
                }
            }

            return BadRequest(ModelState);
        }
        [HttpDelete("{id}")]
        [Authorize(Roles = "MainAdmin,Admin")]
        public async Task<ActionResult<GroupClasswork>> Delete(int id)
        {
            var classwork = await db.GroupClassworks.FirstOrDefaultAsync(x => x.GroupClassworkId == id);
            if (classwork == null)
            {
                return NotFound();
            }
            db.GroupClassworks.Remove(classwork);
            await db.SaveChangesAsync();
            return Ok(classwork);
        }

        [HttpGet("id")]
        public async Task<ActionResult<IEnumerable<GroupClasswork>>> GetBySubjectId(int id)
        {
            var classworks = await db.GroupClassworks.Where(x=> x.SubjectId == id).ToListAsync();
            if(classworks==null)
            return NotFound();
            return Ok(classworks);
        }
        [HttpGet("id")]
        public async Task<ActionResult<IEnumerable<GroupClasswork>>> GetByTeacherId(int id)
        {
            var classworks = await db.GroupClassworks.Where(x => x.TeacherId == id).ToListAsync();
            if (classworks == null)
                return NotFound();
            return Ok(classworks);
        }
        
        [HttpGet("id")]
        public async Task<ActionResult<IEnumerable<GroupClasswork>>> GetByGroupId(int id)
        {
            var classworks = await db.GroupClassworks.Where(x => x.GroupId == id).ToListAsync();
            if (classworks == null)
                return NotFound();
            return Ok(classworks);
        }
        [HttpPost]
        public async Task<ActionResult<IEnumerable<GroupClasswork>>> GetByTheme(GroupClassworksViewModel model)
        {

            var classworks = await db.GroupClassworks.Where(x => x.Theme.ToLower() == model.Theme.ToLower()).ToListAsync();
            if (classworks == null)
                return NotFound();
            return Ok(classworks);
        }
        [HttpPost]
        public async Task<ActionResult<IEnumerable<GroupClasswork>>> GetByDate(GroupClassworksViewModel model)
        {
            if(model!=null)
            {
                var classworks = await db.GroupClassworks.Where(x => x.Date.ToShortDateString() == model.Date.ToShortDateString()).ToListAsync();
                if (classworks == null)
                    return NotFound();
                return Ok(classworks);
            }
            return BadRequest(new { error = "Model is empty"});            
        }

        [HttpPost]
        public async Task<ActionResult<IEnumerable<GroupClasswork>>> GetBySubjectIdAndDate(GroupClassworksViewModel model)
        {
            if (model != null)
            {
                var classworks = await db.GroupClassworks.Where(x => x.Date.ToShortDateString() == model.Date.ToShortDateString() && x.SubjectId == model.SubjectId).ToListAsync();
                if (classworks == null)
                    return NotFound();
                return Ok(classworks);
            }
            return BadRequest(new { error = "Model is empty" });
        }
    }
}
