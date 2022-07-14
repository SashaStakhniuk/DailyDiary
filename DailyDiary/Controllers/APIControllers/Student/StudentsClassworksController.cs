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
    public class StudentsClassworksController : Controller
    {
        private readonly IdentityContext db;
        public StudentsClassworksController(IdentityContext datasContext)
        {
            this.db = datasContext;
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<StudentClasswork>>> GetAll()
        {
            return await db.StudentClassworks.ToListAsync();
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<StudentClasswork>>> GetAllByStudentId(int id)
        {
            var studentClasswork = await db.StudentClassworks.Where(x => x.StudentId == id).ToListAsync();
            if (studentClasswork == null)
            {
                return NotFound();
            }
            return Ok(studentClasswork);
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<StudentClasswork>>> GetAllByClassworkId(int id)
        {
            var studentClasswork = await db.StudentClassworks.Where(x => x.GroupClassworkId == id).ToListAsync();
            if (studentClasswork == null)
            {
                return NotFound();
            }
            return Ok(studentClasswork);
        }
        [HttpPut]
        public async Task<IActionResult> /*CreateOr*/UpdateAsync(StudentClassworksViewModel model)
        {
            if (ModelState.IsValid)
            {
                if (model != null)
                {
                    var studentClassworkToEdit = await db.StudentClassworks.FirstOrDefaultAsync(x => x.GroupClassworkId ==model.ClassworkId && x.StudentId == model.StudentId);
                    if (studentClassworkToEdit == null)
                    {
                        return NotFound(new { error = "Student's classwork not found"});
                        //studentClassworkToEdit = new StudentClasswork
                        //{
                            
                        //};
                    }
                    else
                    {
                        studentClassworkToEdit.Mark = model.Mark;
                        studentClassworkToEdit.TeacherComment= model.TeacherComment;                       
                    }
                    db.StudentClassworks.Update(studentClassworkToEdit);
                    await db.SaveChangesAsync();
                    return Ok(studentClassworkToEdit);
                }
            }
            return BadRequest(ModelState);
        }
        [HttpPost]
        [Authorize(Roles = "MainAdmin,Admin")]
        public async Task<ActionResult<Student>> Delete(StudentClassworksViewModel model)
        {
            var studentClasswork = await db.StudentClassworks.FirstOrDefaultAsync(x => x.GroupClassworkId == model.ClassworkId && x.StudentId == model.StudentId);
            if (studentClasswork == null)
            {
                return NotFound();
            }
            db.StudentClassworks.Remove(studentClasswork);
            await db.SaveChangesAsync();
            return Ok(studentClasswork);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<StudentClasswork>>> GetStudentsClassworksBySubjectIdAsync(int id)
        {          
                var clasworksId = await db.GroupClassworks.Where(x => x.SubjectId == id).Select(x => x.GroupClassworkId).ToListAsync();
                if (clasworksId != null)
                {
                    List<StudentClasswork> studentsClassworks = new List<StudentClasswork>();
                    foreach (var classworkId in clasworksId)
                    {
                        studentsClassworks.Add(await db.StudentClassworks.FirstOrDefaultAsync(x => x.GroupClassworkId == classworkId));
                    }
                    return Ok(studentsClassworks);
                }
                else
                {
                    return NotFound(new { error = "Classworks not found" });
                }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<StudentClasswork>>> GetStudentsClassworksByGroupIdAsync(int id)
        {
            var group = await db.Groups.FirstOrDefaultAsync(x => x.Id == id);

            if (group != null)
            {
                var clasworksId = await db.GroupClassworks.Where(x => x.GroupId == group.Id).Select(x => x.GroupClassworkId).ToListAsync();
                if (clasworksId != null)
                {
                    List<StudentClasswork> studentsClassworks = new List<StudentClasswork>();
                    foreach (var classworkId in clasworksId)
                    {
                        studentsClassworks.Add(await db.StudentClassworks.FirstOrDefaultAsync(x => x.GroupClassworkId == classworkId));
                    }
                    return Ok(studentsClassworks);
                }
                else
                {
                    return NotFound(new { error = "Classworks not found" });
                }
            }
            // List<StudentClasswork> studentsClassworks = db.GroupClassworks.Include(x => x.StudentClassworks.Where(x=> x.GroupClassworkId==id));
            //db.GroupClassworks.Where(x => x.GroupId == id).Select(x => x.GroupClassworkId);

            return NotFound(new { error = "Group not found" });
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<StudentClasswork>>> GetStudentsClassworksByTeacherIdAsync(int id)
        {
            var teacher = await db.Teachers.FirstOrDefaultAsync(x => x.TeacherId == id);

            if (teacher != null)
            {
                var clasworksId = await db.GroupClassworks.Where(x => x.TeacherId == teacher.TeacherId).Select(x => x.GroupClassworkId).ToListAsync();
                if (clasworksId != null)
                {
                    List<StudentClasswork> studentsClassworks = new List<StudentClasswork>();
                    foreach (var classworkId in clasworksId)
                    {
                        studentsClassworks.Add(await db.StudentClassworks.FirstOrDefaultAsync(x => x.GroupClassworkId == classworkId));
                    }
                    return Ok(studentsClassworks);
                }
                else
                {
                    return NotFound(new { error = "Classworks not found" });
                }
            }
            return NotFound(new { error = "Teacher not found" });
        }
        [HttpPost]
        public async Task<ActionResult<IEnumerable<StudentClasswork>>> GetStudentsClassworksByThemeAsync(GroupClassworksViewModel model)
        {

            if (model != null)
            {
                var clasworksId = await db.GroupClassworks.Where(x => x.Theme.ToLower() == model.Theme.ToLower()).Select(x => x.GroupClassworkId).ToListAsync();
                if (clasworksId != null)
                {
                    List<StudentClasswork> studentsClassworks = new List<StudentClasswork>();
                    foreach (var classworkId in clasworksId)
                    {
                        studentsClassworks.Add(await db.StudentClassworks.FirstOrDefaultAsync(x => x.GroupClassworkId == classworkId));
                    }
                    return Ok(studentsClassworks);
                }
                else
                {
                    return NotFound(new { error = "Classworks not found" });
                }
            }
            return BadRequest(new { error = "Model is empty" });
        }
    }
}
