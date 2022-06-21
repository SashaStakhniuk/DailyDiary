using DailyDiary.Models;
using DailyDiary.Models.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DailyDiary.Controllers.APIControllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    //[Authorize(Roles = "MainAdmin,Admin,Teacher")]
    public class StudentsHomeworksController : Controller
    {
        private readonly IdentityContext db;
        public StudentsHomeworksController(IdentityContext datasContext)
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
        public async Task<ActionResult<StudentHomework>> GetByHomeworkId(int id)
        {
            var studentHomework = await db.StudentHomeworks.FirstOrDefaultAsync(x => x.GroupHomeworkId == id);
            if (studentHomework == null)
            {
                return NotFound();
            }
            return Ok(studentHomework);
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<StudentHomework>>> GetAssignedHomeworks(int studentId)
        {
            var student = await db.Students.FindAsync(studentId);
            if (student != null)
            {
                var assignedHomeworks = await db.GroupHomeworks.Where(x=> x.GroupId==student.GroupId).Select(x=> x.GroupHomeworkId).ToListAsync(); // всі завдання, які задані групі
                var passedHomeworks = await db.StudentHomeworks?.Where(x => x.StudentId == studentId).Select(x=> x.GroupHomeworkId).ToListAsync(); // всі здані домашки студента
                foreach (var assignedHomework in assignedHomeworks)
                {
                    var homework = await db.StudentHomeworks.FirstOrDefaultAsync(x => x.StudentId == studentId && x.GroupHomeworkId == assignedHomework);
                    assignedHomeworks.Remove((int)homework.GroupHomeworkId);
                }
                return Ok(assignedHomeworks);
            }
            return NotFound(new { error = "Student not found" });

        }
        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<StudentHomework>>> GetHomeworksUnderReview(int studentId)
        {
            var student = await db.Students.FindAsync(studentId);
            if (student != null)
            {
                var homeworksUnderReview = await db.StudentHomeworks?.Where(x => x.StudentId == studentId && x.Mark<=0).ToListAsync(); // всі домашки студента, які знаходяться на перевірці (без оцінки)
                if (homeworksUnderReview != null)
                {
                    foreach (var homeworkUnderReview in homeworksUnderReview)
                    {
                        homeworkUnderReview.PerformedHomework = null;
                    }
                    return Ok(homeworksUnderReview);
                }
                else
                {
                    return NotFound(new { error = "Homeworks under review not found" });
                }
            }
            return NotFound(new { error = "Student not found" });

        }
        [HttpGet("{details}")]
        public async Task<ActionResult<bool>> GetByStudentAndHomeworkId(int studentId, int id)
        {
            var studentHomework = await db.StudentHomeworks.FirstOrDefaultAsync(x => x.StudentId == studentId && x.GroupHomeworkId == id);
            if (studentHomework == null)
            {
                return false;
            }
            return true;
        }

        [HttpGet("{details}")]
        public async Task<ActionResult<StudentHomework>> GetPassedByStudentAndHomeworkId(int studentId, int id)
        {
            var studentHomeworks = await db.StudentHomeworks.Where(x => x.StudentId == studentId && x.GroupHomeworkId == id).ToListAsync();
            if (studentHomeworks == null)
            {
                return NotFound(new { error = "There are no passed homework" });
            }
            return Ok(studentHomeworks);
        }
        [HttpPost]
        public async Task<IActionResult> AddDoneHomeworkAsync(StudentHomeworksViewModel model)
        {
            if (ModelState.IsValid)
            {
                var student = await db.Students.FindAsync(model.StudentId);
                if (student != null)
                {
                    var studentHomeworkToEdit = await db.StudentHomeworks.FirstOrDefaultAsync(x => x.GroupHomeworkId == model.GroupHomeworkId && x.StudentId == model.StudentId);
                    if (studentHomeworkToEdit == null)
                    {
                        studentHomeworkToEdit = new StudentHomework
                        {
                            StudentId = model.StudentId,
                            GroupHomeworkId = model.GroupHomeworkId,
                            PerformedHomework = Encoding.ASCII.GetBytes(model.PerformedHomeworkBase64),
                            StudentComment = model.StudentComment,

                            //Mark = model.Mark,
                            //TeacherComment = model.TeacherComment,
                            Published = DateTime.Now
                        };
                        await db.StudentHomeworks.AddAsync(studentHomeworkToEdit);
                        await db.SaveChangesAsync();
                        return Ok(new { success = "Homework was added successfully" });
                    }
                    else
                    {
                        return BadRequest(new { error = "Homework adready done" });
                    }
                }
                else
                {
                    return NotFound(new { error = "Student not found" });
                }
            }
            else
            {
                return BadRequest(ModelState);
            }
        }
        [HttpPut]
        public async Task<IActionResult> UpdateAsync(StudentHomeworksViewModel model)
        {
            if (ModelState.IsValid)
            {
                if (model != null)
                {
                    var studentHomeworkToEdit = await db.StudentHomeworks.FirstOrDefaultAsync(x => x.GroupHomeworkId == model.GroupHomeworkId && x.StudentId == model.StudentId);
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
                        studentHomeworkToEdit.TeacherComment = model.TeacherComment;
                        studentHomeworkToEdit.Published = DateTime.Now;
                    }
                    db.StudentHomeworks.Update(studentHomeworkToEdit);
                    await db.SaveChangesAsync();
                    return Ok(studentHomeworkToEdit);
                }
            }
            return BadRequest(ModelState);
        }
        [HttpDelete]
        //[Authorize(Roles = "MainAdmin,Admin,Teacher,Student")]
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
