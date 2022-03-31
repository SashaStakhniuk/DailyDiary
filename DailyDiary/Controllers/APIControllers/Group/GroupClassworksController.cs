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
    //[Authorize(Roles = "MainAdmin,Admin,Teacher")]
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
        [HttpGet("details")]
        public async Task<ActionResult<IEnumerable<GroupClasswork>>> GetSomeClassworksByGroupIdAndTeacherId(int groupId, int teacherId, int skip, int take)
        {
            var classworks = await db.GroupClassworks.OrderByDescending(x => x.GroupClassworkId).Where(x => x.GroupId == groupId && x.TeacherId == teacherId).Skip(skip).Take(take).ToListAsync();
            //foreach (var homework in classworks)
            //{
            //    homework.Homework = Encoding.ASCII.GetString(homework.HomeworkInBytes);
            //    homework.HomeworkInBytes = null;
            //}
            //var classworks = db.GroupHomeworks.Where(x => x.GroupId == groupId && x.TeacherId == teacherId).ToList();
            if (classworks != null)
            {
                return Ok(classworks);
            }
            else
            {
                return NotFound(new { error = "No more files" });
            }
        }
        [HttpPost] // для вставки, для оновлення треба зробити PUT і новий метод!
        //[Authorize(Roles = "MainAdmin,Admin")]
        public async Task<IActionResult> CreateClassworkAsync(GroupClassworksViewModel model)
        {
            if (model != null)
            {

                if (string.IsNullOrEmpty(model.Theme))
                {
                    ModelState.AddModelError("Theme error", "Enter theme");
                }
                if (string.IsNullOrEmpty(model.Classwork))
                {
                    ModelState.AddModelError("Homework error", "You should add homework");
                }
                if (model.TeacherId <= 0)
                {
                    ModelState.AddModelError("Teacher id error", "Teacher id must be > 0");
                }
                if (model.SubjectId <= 0)
                {
                    ModelState.AddModelError("Subject's id error", "Subject's id must be > 0");
                }
                if (model.GroupId <= 0)
                {
                    ModelState.AddModelError("Group's id error", "Group's id must be > 0");
                }
                if (model.Deadline == null)
                {
                    ModelState.AddModelError("Deadline error", "Deadline can't be null");
                }
                if (!ModelState.IsValid)
                {
                    //ModelState.AddModelError("DatasModelError", "Please,enter all required datas correctly");
                    return BadRequest(ModelState);
                }


                var classworkDatasToEdit = await db.GroupClassworks.FirstOrDefaultAsync(x => x.GroupClassworkId == model.GroupClassworkId);
                if (classworkDatasToEdit == null)
                {
                    var group = await db.Groups.FindAsync(model.GroupId);
                    var subject = await db.Subjects.FindAsync(model.SubjectId);
                    var teacher = await db.Teachers.FindAsync(model.TeacherId);

                    classworkDatasToEdit = new GroupClasswork
                    {
                        //SubjectId = model.SubjectId,
                        Subject = subject,
                        Theme = model.Theme,
                        //TeacherId = model.TeacherId,
                        Teacher = teacher,
                        //GroupId = model.GroupId,
                        Group = group,
                        Classwork = model.Classwork,                       
                        // Published = model.Published,
                        Published = DateTime.Now,
                        Deadline = model.Deadline
                    };
                    db.GroupClassworks.Add(classworkDatasToEdit);
                    await db.SaveChangesAsync();
                    return Ok(new { success = "Classwork was added successfully" });
                }
                else
                {
                    return BadRequest(new { error = "Such classwork is already exist" });
                }
                //db.GroupHomeworks.Update(homeworkDatasToEdit);
                //db.SaveChanges();
            }
            return BadRequest(ModelState);
        }
        [HttpPut] 
        //[Authorize(Roles = "MainAdmin,Admin")]
        public async Task<IActionResult> UpdateClassworkAsync(GroupClassworksViewModel model)
        {
            if (model != null)
            {

                if (string.IsNullOrEmpty(model.Theme))
                {
                    ModelState.AddModelError("Theme error", "Enter theme");
                }
                if (string.IsNullOrEmpty(model.Classwork))
                {
                    ModelState.AddModelError("Homework error", "You should add homework");
                }
                if (model.TeacherId <= 0)
                {
                    ModelState.AddModelError("Teacher id error", "Teacher id must be > 0");
                }
                if (model.SubjectId <= 0)
                {
                    ModelState.AddModelError("Subject's id error", "Subject's id must be > 0");
                }
                if (model.GroupId <= 0)
                {
                    ModelState.AddModelError("Group's id error", "Group's id must be > 0");
                }
                if (model.Deadline == null)
                {
                    ModelState.AddModelError("Deadline error", "Deadline can't be null");
                }
                if (!ModelState.IsValid)
                {
                    //ModelState.AddModelError("DatasModelError", "Please,enter all required datas correctly");
                    return BadRequest(ModelState);
                }


                var classworkDatasToEdit = await db.GroupClassworks.FirstOrDefaultAsync(x => x.GroupClassworkId == model.GroupClassworkId);
                if (classworkDatasToEdit != null)
                {
                    var group = await db.Groups.FindAsync(model.GroupId);
                    var subject = await db.Subjects.FindAsync(model.SubjectId);
                    var teacher = await db.Teachers.FindAsync(model.TeacherId);

                    classworkDatasToEdit.Subject = subject;
                    classworkDatasToEdit.Theme = model.Theme;
                    classworkDatasToEdit.Teacher = teacher;
                    classworkDatasToEdit.Group = group;
                    classworkDatasToEdit.Published = model.Published;
                    classworkDatasToEdit.Deadline = model.Deadline;
                    db.GroupClassworks.Update(classworkDatasToEdit);
                    await db.SaveChangesAsync();
                    return Ok(new { success = "Classwork was updated successfully" });
                }
                else
                {
                    return NotFound(new { error="No such classwork"});
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
        [HttpGet("details")]
        public async Task<ActionResult<IEnumerable<GroupClasswork>>> GetByGroupIdAndTeacherId(int groupId, int teacherId)
        {
            var classworks = await db.GroupClassworks.Where(x => x.GroupId == groupId && x.TeacherId == teacherId).ToListAsync();
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
        //[HttpPost]
        //public async Task<ActionResult<IEnumerable<GroupClasswork>>> GetByDate(GroupClassworksViewModel model)
        //{
        //    if(model!=null)
        //    {
        //        var classworks = await db.GroupClassworks.Where(x => x.Date.ToShortDateString() == model.Date.ToShortDateString()).ToListAsync();
        //        if (classworks == null)
        //            return NotFound();
        //        return Ok(classworks);
        //    }
        //    return BadRequest(new { error = "Model is empty"});            
        //}

        //[HttpPost]
        //public async Task<ActionResult<IEnumerable<GroupClasswork>>> GetBySubjectIdAndDate(GroupClassworksViewModel model)
        //{
        //    if (model != null)
        //    {
        //        var classworks = await db.GroupClassworks.Where(x => x.Date.ToShortDateString() == model.Date.ToShortDateString() && x.SubjectId == model.SubjectId).ToListAsync();
        //        if (classworks == null)
        //            return NotFound();
        //        return Ok(classworks);
        //    }
        //    return BadRequest(new { error = "Model is empty" });
        //}
    }
}
