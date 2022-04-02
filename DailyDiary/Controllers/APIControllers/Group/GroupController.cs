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
    public class GroupController : Controller
    {
        private readonly DailyDiaryDatasContext db;

        public GroupController(DailyDiaryDatasContext db)
        {
            this.db = db;
        }
        public async Task<ActionResult<IEnumerable<Group>>> Get() //Get all
        {
            return await db.Groups.ToListAsync();
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<Group>> Get(int id) //Get one by id
        {
            var group = await db.Groups.FirstOrDefaultAsync(x=> x.Id == id);
            if (group != null)
            {
                return Ok(group);
            }
            return NotFound(new {error = "Group not found" });
            //return group == null ? NotFound() : Ok(group);
        }
        [HttpPut]
       /* [Authorize(Roles = "MainAdmin,Admin")]*/
        public async Task<ActionResult<Group>> CreateOrUpdateGroup(GroupViewModel model) //CreateOrUpdateGroupAsync
        {
            if (ModelState.IsValid)
            {
                if(model!=null)
                {
                    var groupToEdit = await db.Groups.FirstOrDefaultAsync(x => x.Id == model.Id);
                    if (groupToEdit == null)
                    {
                        groupToEdit = new Group
                        {
                            Title = model.Title
                        };
                    }
                    else
                    {
                        groupToEdit.Id = model.Id;
                        groupToEdit.Title = model.Title;
                    }
                    db.Groups.Update(groupToEdit);
                    await db.SaveChangesAsync();
                    return Ok(groupToEdit);
                }
                return BadRequest(new { error = "Model is empty or null"});
            }
            return BadRequest(ModelState);
            //return group == null ? NotFound() : Ok(group);
        }
        [HttpGet("id")]
        public async Task<ActionResult<IEnumerable<Student>>> GetGroupStudentsById(int id)//List of student that study in this group
        {
            var students = await db.Students.Where(x=> x.GroupId == id).ToListAsync();
            if (students != null)
            {               
                return Ok(students);
            }
            return NotFound(new { error = "No one student found" });
        }
        [HttpGet("id")]
        public async Task<ActionResult<IEnumerable<Teacher>>> GetGroupTeachersById(int id)//GetGroupTeachersById list of teachers that have lessons at this group
        {
            IEnumerable<int> groupTeachersId = await db.TeacherGroups.Where(x => x.GroupId == id).Select(x=> x.TeacherId).ToListAsync();
            if(groupTeachersId!=null)
            {
                //groupTeachersId = groupTeachersId.Distinct();
                var teachers = new List<Teacher>();
                foreach (var groupTeacherId in groupTeachersId)
                {
                    teachers.Add(await db.Teachers.FirstOrDefaultAsync(x => x.TeacherId == groupTeacherId));
                }
                return Ok(teachers);
            }
            return NotFound(new { error = "No one teacher found" });
        }

/*        [HttpGet("id")]
        public async Task<ActionResult<IEnumerable<Subject>>> GetGroupSubjectsById(int id)//List of subjects that taught this group
        {
            IEnumerable<int> groupSubjectsId = await db.GroupSubjects.Where(x => x.GroupId == id).Select(x => x.SubjectId).ToListAsync();
            if (groupSubjectsId != null)
            {
                //groupTeachersId = groupTeachersId.Distinct();
                var subjects = new List<Subject>();
                foreach (var subjectId in groupSubjectsId)
                {
                    subjects.Add(await db.Subjects.FirstOrDefaultAsync(x => x.Id == subjectId));
                }
                return Ok(subjects);
            }
            return NotFound(new { error = "No one subject found" });
        }*/

    }
}
