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
            var teacherSubjectsId = await db.TeacherSubjects.Where(x => x.TeacherId == id).Select(x => x.SubjectId).ToListAsync(); // можливі повтори!!!
            if(teacherSubjectsId != null)
            {
<<<<<<< HEAD
                return Ok(teacherSubjects);
            }
            return NotFound(new { error = "Teacher's subjects not found" });
            //var teacherSubjectsId = await db.TeacherSubjects.Where(x => x.TeacherId == id).Select(x => x.SubjectId).ToListAsync(); // можливі повтори!!!
            //if(teacherSubjectsId != null)
            //{
            //    //teacherSubjectsId = teacherSubjectsId.Distinct();
            //    var subjects = new List<Subject>();
            //    foreach (var subjectId in teacherSubjectsId)
            //    {
            //        subjects.Add(await db.Subjects.FirstOrDefaultAsync(x=> x.Id == subjectId));
            //    }
            //    return Ok(subjects);
            //}
            //return NotFound(new {error = "Teacher's subjects not found" });
=======
                //teacherSubjectsId = teacherSubjectsId.Distinct();
                var subjects = new List<Subject>();
                foreach (var subjectId in teacherSubjectsId)
                {
                    subjects.Add(await db.Subjects.FirstOrDefaultAsync(x=> x.Id == subjectId));
                }
                return Ok(subjects);
            }
            return NotFound(new {error = "Teacher's subjects not found" });
>>>>>>> parent of a85b990 (added loader and CRUD operations on Admin Teachers)
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<Group>>> GetTeacherGroupsById(int id)
        {
<<<<<<< HEAD
            var teacherGroups = await db.TeacherGroups.Where(x => x.TeacherId == id).Select(x => x.Group).ToListAsync(); // можливі повтори? !!!
            if (teacherGroups != null)
            {
                return Ok(teacherGroups);
=======
            List<Group> groups = new List<Group>();
            var teacherGroups = await db.TeacherGroups.Where(x => x.TeacherId == id).Select(x => x.GroupId).ToListAsync(); // можливі повтори!!!
            if (teacherGroups.Count != 0)
            {
                foreach (var teacherGroup in teacherGroups)
                {
                    groups.Add(await db.Groups.FirstOrDefaultAsync(x => x.Id == teacherGroup));
                }
                return Ok(groups);
>>>>>>> ecd71480669503514892726ce84bed31585f47ac
            }
            return NotFound(new { error = "Teacher's groups not found" });

<<<<<<< HEAD
        [HttpGet]
=======
<<<<<<< HEAD
            //var teacherGroups = await db.TeacherGroups.Where(x => x.TeacherId == id).ToListAsync(); // можливі повтори!!!
            //if (teacherGroups != null)
            //{
            //    var groups = new List<Group>();
            //    foreach (var teacherGroup in teacherGroups)
            //    {
            //        groups.Add(await db.Groups.FirstOrDefaultAsync(x => x.Id == teacherGroup.GroupId));
            //    }
            //    return Ok(groups);
            //}
            //return NotFound(new { error = "Teacher's groups not found" });
=======

>>>>>>> 08c9e97a6aa69a3aa8e94512cd89557652cb23df
        public async Task<ActionResult<IEnumerable<Group>>> GetAllGroups()
        }
            //var teacherGroups = await db.TeacherGroups.Where(x => x.TeacherId == id).ToListAsync(); // можливі повтори!!!
            //if (teacherGroups != null)
            //{
            //    var groups = new List<Group>();
            //    foreach (var teacherGroup in teacherGroups)
            //    {
            //        groups.Add(await db.Groups.FirstOrDefaultAsync(x => x.Id == teacherGroup.GroupId));
            //    }
            //    return Ok(groups);
            //}
            //return NotFound(new { error = "Teacher's groups not found" });
        
    [HttpGet]

    public async Task<ActionResult<IEnumerable<Group>>> GetAllGroups()
        {
            return await db.Groups.ToListAsync();
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Subject>>> GetAllSubjects()
        {
            return await db.Subjects.ToListAsync();
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

        [HttpPost("{id}/{groupId}")]
<<<<<<< HEAD
        public ActionResult<bool> GroupExist(int id, int groupId)
        {
            return Ok(false);
=======
        public async Task<ActionResult<bool>> GroupEzist(int id, int groupId)
        {

            return Ok(false);
>>>>>>> ecd71480669503514892726ce84bed31585f47ac
>>>>>>> parent of a85b990 (added loader and CRUD operations on Admin Teachers)
        }

        //[HttpGet]
        //public async Task<ActionResult<IEnumerable<TeacherGroup>>> GetTeacherGroups(int teacherId)
        //{
        //    return null;
        //}
    }
}
