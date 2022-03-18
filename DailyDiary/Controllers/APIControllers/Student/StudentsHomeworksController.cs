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
    public class StudentsHomeworksController : Controller
    {
        private readonly DailyDiaryDatasContext db;
        public StudentsHomeworksController(DailyDiaryDatasContext datasContext)
        {
            this.db = datasContext;
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<StudentHomework>>> GetAll()
        {
            return await db.StudentHomeworks.ToListAsync();
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<StudentHomework>>> GetAllByStudentId(int id)
        {
            var studentHomework = await db.StudentHomeworks.Where(x => x.StudentId == id).ToListAsync();
            if (studentHomework == null)
            {
                return NotFound();
            }
            return Ok(studentHomework);
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<StudentHomework>>> GetAllByHomeworkId(int id)
        {
            var studentHomework = await db.StudentHomeworks.Where(x => x.GroupHomeworkId == id).ToListAsync();
            if (studentHomework == null)
            {
                return NotFound();
            }
            return Ok(studentHomework);
        }
        [HttpPut]
        public async Task<IActionResult> CreateOrUpdateAsync(StudentHomeworksViewModel model)
        {
            if (ModelState.IsValid)
            {
                if (model != null)
                {
                    var studentHomeworkToEdit = await db.StudentHomeworks.FirstOrDefaultAsync(x => x.GroupHomeworkId ==model.GroupHomeworkId && x.StudentId == model.StudentId);
                    if (studentHomeworkToEdit == null)
                    {
                        studentHomeworkToEdit = new StudentHomework
                        {
                            PerformedHomework = model.PerformedHomework,
                            StudentComment = model.StudentComment,
                            Mark = model.Mark,
                            TeacherComment = model.TeacherComment,
                            Published = DateTime.Now
                        };

                    }
                    else
                    {
                        studentHomeworkToEdit.PerformedHomework = model.PerformedHomework;
                        studentHomeworkToEdit.StudentComment = model.StudentComment;
                        studentHomeworkToEdit.Mark = model.Mark;
                        studentHomeworkToEdit.TeacherComment= model.TeacherComment;
                        studentHomeworkToEdit.Published = DateTime.Now;
                    }
                    db.StudentHomeworks.Update(studentHomeworkToEdit);
                    await db.SaveChangesAsync();
                    return Ok(studentHomeworkToEdit);
                }
            }
            return BadRequest(ModelState);
        }
        [HttpPost]
        [Authorize(Roles = "MainAdmin,Admin,Teacher,Student")]
        public async Task<ActionResult<Student>> Delete(StudentHomeworksViewModel model)
        {
            var studentHomework = await db.StudentHomeworks.FirstOrDefaultAsync(x => x.GroupHomeworkId == model.GroupHomeworkId && x.StudentId == model.StudentId);
            if (studentHomework == null)
            {
                return NotFound();
            }
            db.StudentHomeworks.Remove(studentHomework);
            await db.SaveChangesAsync();
            return Ok(studentHomework);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<StudentHomework>>> GetStudentsHomeworksBySubjectIdAsync(int id)
        {          
                var homeworksId = await db.GroupHomeworks.Where(x => x.SubjectId == id).Select(x => x.GroupHomeworkId).ToListAsync();
                if (homeworksId != null)
                {
                    List<StudentHomework> studentHomeworks = new List<StudentHomework>();
                    foreach (var homeworkId in homeworksId)
                    {
                        studentHomeworks.Add(await db.StudentHomeworks.FirstOrDefaultAsync(x => x.GroupHomeworkId == homeworkId));
                    }
                    return Ok(studentHomeworks);
                }
                else
                {
                    return NotFound(new { error = "Homeworks not found" });
                }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<StudentClasswork>>> GetStudentsHomeworksByGroupIdAsync(int id)
        {
            var group = await db.Groups.FirstOrDefaultAsync(x => x.Id == id);

            if (group != null)
            {
                var homeworksId = await db.GroupHomeworks.Where(x => x.GroupId == group.Id).Select(x => x.GroupHomeworkId).ToListAsync();
                if (homeworksId != null)
                {
                    List<StudentHomework> studentsHomeworks = new List<StudentHomework>();
                    foreach (var homeworkId in homeworksId)
                    {
                        studentsHomeworks.Add(await db.StudentHomeworks.FirstOrDefaultAsync(x => x.GroupHomeworkId == homeworkId));
                    }
                    return Ok(studentsHomeworks);
                }
                else
                {
                    return NotFound(new { error = "Homeworks not found" });
                }
            }

            return NotFound(new { error = "Group not found" });
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<StudentHomework>>> GetStudentsHomeworksByTeacherIdAsync(int id)
        {
            var teacher = await db.Teachers.FirstOrDefaultAsync(x => x.TeacherId == id);

            if (teacher != null)
            {
                var homeworksId = await db.GroupHomeworks.Where(x => x.TeacherId == teacher.TeacherId).Select(x => x.GroupHomeworkId).ToListAsync();
                if (homeworksId != null)
                {
                    List<StudentHomework> studentsHomeworks = new List<StudentHomework>();
                    foreach (var homeworkId in homeworksId)
                    {
                        studentsHomeworks.Add(await db.StudentHomeworks.FirstOrDefaultAsync(x => x.GroupHomeworkId == homeworkId));
                    }
                    return Ok(studentsHomeworks);
                }
                else
                {
                    return NotFound(new { error = "Homeworks not found" });
                }
            }
            return NotFound(new { error = "Teacher not found" });
        }
        [HttpPost]
        public async Task<ActionResult<IEnumerable<StudentHomework>>> GetStudentsHomeworksByThemeAsync(GroupHomeworksViewModel model)
        {

            if (model != null)
            {
                var homeworksId = await db.GroupClassworks.Where(x => x.Theme.ToLower() == model.Theme.ToLower()).Select(x => x.GroupClassworkId).ToListAsync();
                if (homeworksId != null)
                {
                    List<StudentHomework> studentsHomeworks = new List<StudentHomework>();
                    foreach (var homeworkId in homeworksId)
                    {
                        studentsHomeworks.Add(await db.StudentHomeworks.FirstOrDefaultAsync(x => x.GroupHomeworkId == homeworkId));
                    }
                    return Ok(studentsHomeworks);
                }
                else
                {
                    return NotFound(new { error = "Homeworks not found" });
                }
            }
            return BadRequest(new { error = "Model is empty" });
        }
    }
}
