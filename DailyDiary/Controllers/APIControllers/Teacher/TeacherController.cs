using DailyDiary.Models;
using DailyDiary.Models.ViewModels;
using DailyDiary.Models.ViewModels.Teacher;
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
    public class TeacherController : Controller
    {
        private readonly DailyDiaryDatasContext db;

        public TeacherController(DailyDiaryDatasContext datasContext)
        {
            this.db = datasContext;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Teacher>>> Get()//GetAllTeachersAsync
        {
            return await db.Teachers.ToListAsync();
        }

        [HttpGet("{lastName}")]
        public async Task<ActionResult<IEnumerable<Teacher>>> GetByLastName(string lastName)
        {
            return await db.Teachers.Where(s => s.LastName.Contains(lastName)).ToListAsync();
        }

        [HttpGet("{teachersSkip}")]
        public async Task< ActionResult<IEnumerable<Teacher>>> GetRangTeachers(int teachersSkip)
        {
            return await db.Teachers.Skip(teachersSkip).Take(5).ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Teacher>> Get(int id)//GetTeacherByIdAsync
        {
            var teacher = await db.Teachers.FirstOrDefaultAsync(x=> x.TeacherId==id);
            if (teacher == null)
            {
                return NotFound();
            }
            return Ok(teacher);
        }

        [HttpPost]
        public async Task<IActionResult> CreateNew(CreateNewTeacherViewModel model)
        {
            if (ModelState.IsValid)
            {
                Teacher teacher = new Teacher();

                string Login = Services.GeneratorService.GenerateNewLogin(model.LastName);
                string Password = Services.GeneratorService.GenerateNewPassword();

                teacher = new Teacher
                {
                    Name = model.Name,
                    LastName = model.LastName,
                    Birthday = model.Birthday,
                    Age = model.Age,
                    Specialty = model.Specialty,
                    Category = model.Category,
                    Degree = model.Degree,
                    Education = model.Education,
                    Experience = model.Experience,
                    Salary = model.Salary,
                    Rate = model.Rate,
                    Email = model.Email,
                    Login = Login,
                    Password = Password
                };
                Services.MailService.SendLoginAndPassword(Login, Password, model.Email);
                db.Teachers.Add(teacher);
                await db.SaveChangesAsync();
                return Ok();                
            }
            return BadRequest();
        }

        [HttpPost]
        public async Task<IActionResult> Edit(TeacherViewModel model)
        {
            if(ModelState.IsValid)
            {
                if (model != null)
                {

                    var teacer = await db.Teachers.FirstOrDefaultAsync(x => x.TeacherId == model.TeacherId);
                    if (teacer != null)
                    {

                        teacer.Name = model.Name;
                        teacer.LastName = model.LastName;
                        teacer.Birthday = model.Birthday;
                        teacer.Age = model.Age;
                        teacer.Specialty = model.Specialty;
                        teacer.Category = model.Category;
                        teacer.Degree = model.Degree;
                        teacer.Education = model.Education;
                        teacer.Experience = model.Experience;
                        teacer.Salary = model.Salary;
                        teacer.Rate = model.Rate;
                        teacer.Login = model.Login;
                        teacer.Email = model.Email;

                        db.Teachers.Update(teacer);
                        await db.SaveChangesAsync();
                        return Ok(teacer);
                    }
                    else
                    {
                        return BadRequest();
                    }
                }
            }
            
            return BadRequest(ModelState);
        }

        /*[HttpDelete("{id}")]
        [Authorize(Roles = "MainAdmin,Admin")]*/
        public async Task<ActionResult<Teacher>> Delete(int id)
        {
            Teacher teacher = await db.Teachers.FirstOrDefaultAsync(x => x.TeacherId == id);
            if (teacher == null)
            {
                return NotFound();
            }
            db.Teachers.Remove(teacher);
            await db.SaveChangesAsync();
            return Ok(teacher);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<Subject>>> GetTeacherSubjectsById(int id)
        {
            List<Subject> subjects = new List<Subject>();
            var teacherSubjects = await db.TeacherSubjects.Where(x => x.TeacherId == id).Select(x => x.SubjectId).ToListAsync(); // можливі повтори!!!
            if (teacherSubjects.Count != 0)
            {
                foreach (var sudjectId in teacherSubjects)
                {
                    subjects.Add(await db.Subjects.FirstOrDefaultAsync(x => x.Id == sudjectId));
                }
                return Ok(subjects);
            }
            return NotFound(new { error = "Teacher's groups not found" });
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<Group>>> GetTeacherGroupsById(int id)
        {
            List<Group> groups = new List<Group>();
            var teacherGroups = await db.TeacherGroups.Where(x => x.TeacherId == id).Select(x => x.GroupId).ToListAsync(); // можливі повтори!!!
            if (teacherGroups.Count != 0)
            {
                foreach (var teacherGroup in teacherGroups)
                {
                    groups.Add(await db.Groups.FirstOrDefaultAsync(x => x.Id == teacherGroup));
                }
                return Ok(groups);
            }
            return NotFound(new { error = "Teacher's groups not found" });
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Group>>> GetAllGroups()
        {
            return await db.Groups.ToListAsync();
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Subject>>> GetAllSubjects()
        {
            return await db.Subjects.Distinct().ToListAsync();
        }

        [HttpPost]
        public async Task<ActionResult> AddBase64(Base64ViewModel model)
        {
            Teacher teacher = await db.Teachers.FirstOrDefaultAsync(x => x.TeacherId == model.Id);
            if (teacher != null)
            {
                teacher.Base64URL = model.Base64URL;
                await db.SaveChangesAsync();
                return Ok();
            }
            else
            {
                return NotFound();
            }
        }

        [HttpPost("{id}/{subjectId}")]
        public ActionResult<bool> SubjectsExizst(int id, int subjectId)
        {
            var subjwct = db.TeacherSubjects.FirstOrDefault(x => x.TeacherId == id && x.SubjectId == subjectId);
            if (subjwct != null)
            {
                return Ok(true);
            }
            else
            {
                return Ok(false);
            }
        }

        [HttpPost]
        public async Task<ActionResult> ChangePassword(ChangePasswordViewModel model)
        {
            return Ok();
        }
    }
}
