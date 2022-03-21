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

        public async Task<IActionResult> UpdateTeacherAsync(TeacherViewModel model)
        {
            if(ModelState.IsValid)
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


                    var teacherToEdit = await db.Teachers.FirstOrDefaultAsync(x => x.TeacherId == model.TeacherId);
                    if (teacherToEdit == null)
                    {
                        teacherToEdit = new Teacher
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
                            Salary = model.Salary
                        };
                    }
                    else
                    {
                        //teacherToEdit.TeacherId = model.TeacherId;
                        teacherToEdit.Name = model.Name;
                        teacherToEdit.LastName = model.LastName;
                        teacherToEdit.Birthday = model.Birthday;
                        teacherToEdit.Age = model.Age;
                        teacherToEdit.Specialty = model.Specialty;
                        teacherToEdit.Category = model.Category;
                        teacherToEdit.Degree = model.Degree;
                        teacherToEdit.Education = model.Education;
                        teacherToEdit.Experience = model.Experience;
                        teacherToEdit.Salary = model.Salary;
                    }
                    db.Teachers.Update(teacherToEdit);
                    await db.SaveChangesAsync();
                    return Ok(teacherToEdit);
                }
            }
            
            return BadRequest(ModelState);
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "MainAdmin,Admin")]
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
            var teacherSubjectsId = await db.TeacherSubjects.Where(x => x.TeacherId == id).Select(x => x.SubjectId).ToListAsync(); // можливі повтори!!!
            if(teacherSubjectsId != null)
            {
                //teacherSubjectsId = teacherSubjectsId.Distinct();
                var subjects = new List<Subject>();
                foreach (var subjectId in teacherSubjectsId)
                {
                    subjects.Add(await db.Subjects.FirstOrDefaultAsync(x=> x.Id == subjectId));
                }
                return Ok(subjects);
            }
            return NotFound(new {error = "Teacher's subjects not found" });
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

       /* [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<Group>>> GetTeacherGroupsById(int id)
        {
            var groupsId = await db.TeacherGroups.Where(x => x.TeacherId == id).Select(x => x.TeacherId).ToListAsync(); // можливі повтори!!!
            if (groupsId != null)
            {
                var groups = new List<Group>();
                foreach (var groupId in groupsId)
                {
                    groups.Add(await db.Groups.FirstOrDefaultAsync(x => x.Id == groupId));
                }
                return Ok(groups);
            }
            return NotFound(new { error = "Teacher's subjects not found" });
        }*/
    }
}
