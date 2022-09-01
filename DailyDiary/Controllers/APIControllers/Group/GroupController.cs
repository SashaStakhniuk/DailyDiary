using DM = DailyDiary.Models;
using DailyDiary.Models;
using DailyDiary.Models.ViewModels;
using DailyDiary.Models.ViewModels.Group;
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
    public class GroupController : Controller
    {
        private readonly DailyDiaryDatasContext db;

        public GroupController(DailyDiaryDatasContext db)
        {
            this.db = db;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Group>>> Get() 
        {
            return await db.Groups.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Group>> Get(int id) 
        {
            var group = await db.Groups.FirstOrDefaultAsync(x => x.Id == id);
            if (group != null)
            {
                return Ok(group);
            }
            return NotFound(new { error = "Group not found" });
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Group>> GetStudents(int id)
        {
            var groups = await db.Groups
                    .Include(c => c.Students)
                    .ToListAsync();
            Group group = groups.FirstOrDefault(x => x.Id == id);
            return Ok(group);
        }

        [HttpPost]
        public async Task<ActionResult<Group>> Create(GroupViewModel model)
        {
            if (ModelState.IsValid)
            {
                if (model != null)
                {
                    try
                    {
                        Group group = await db.Groups.FirstOrDefaultAsync(x => x.Id == model.Id);
                        StudyYear studyYear = await db.StudyYears.FirstOrDefaultAsync(x => x.Id == model.StudyYearId);
                        if (group == null && studyYear != null)
                        {
                            group = new Group
                            {
                                Title = model.Title,
                                StudyYearId = studyYear.Id,
                                StudyYear = studyYear,
                            };
                            foreach (int studentId in model.StudentsId)
                            {
                                Student student = await db.Students.FirstOrDefaultAsync(x => x.StudentId == studentId);
                                student.Group = group;
                                group.Students.Add(student);
                            }
                            db.Groups.Add(group);
                            studyYear.Groups.Add(group);
                            await db.SaveChangesAsync();
                            return Ok(group);
                        }
                    } 
                    catch(Exception ex)
                    {
                        Console.WriteLine(ex.Message);
                    }
                }
                return BadRequest(new { error = "Model is empty or null" });
            }
            return BadRequest(ModelState);
        }

        [HttpPost]
        public async Task<ActionResult<Boolean>> Edit(EditGrooupViewModel model)
        {
            if (ModelState.IsValid)
            {
                Group group = await db.Groups.FirstOrDefaultAsync(x => x.Id == model.GroupId);
                if (group != null)
                {
                    var allGroups = await db.Groups.ToListAsync();

                    foreach (var globalGroup in allGroups)
                    {
                        if (globalGroup.Title != model.Title)
                        {
                            group.Title = model.Title;
                        }
                    }

                    foreach(var st in db.Students)
                    {
                        if(st.GroupId == model.GroupId)
                        {
                            group.Students.Remove(st);
                            st.Group = null;
                        }
                    }

                    foreach(var newSt in model.NewStudentsId)
                    {
                        model.CurrentStudentsId.Add(newSt);
                    }
                    

                    db.Groups.Update(group);
                    await db.SaveChangesAsync();
                    return Ok();
                }
            }
            return BadRequest();
        }

        private async Task<Group> updateStudents(Group group, EditGrooupViewModel model)
        {
            return group;
        }

        [HttpGet("id")]
        public async Task<ActionResult<IEnumerable<Student>>> GetGroupStudentsById(int id)
        {
            var students = await db.Students.Where(x => x.GroupId == id).ToListAsync();
            if (students != null)
            {
                return Ok(students);
            }
            return NotFound(new { error = "No one student found" });
        }

        [HttpGet("id")]
        public async Task<ActionResult<IEnumerable<Teacher>>> GetGroupTeachersById(int id)
        {
            IEnumerable<int> groupTeachersId = await db.TeacherGroups.Where(x => x.GroupId == id).Select(x => x.TeacherId).ToListAsync();
            if (groupTeachersId != null)
            {
                var teachers = new List<Teacher>();
                foreach (var groupTeacherId in groupTeachersId)
                {
                    teachers.Add(await db.Teachers.FirstOrDefaultAsync(x => x.TeacherId == groupTeacherId));
                }
                return Ok(teachers);
            }
            return NotFound(new { error = "No one teacher found" });
        }
    }
}
