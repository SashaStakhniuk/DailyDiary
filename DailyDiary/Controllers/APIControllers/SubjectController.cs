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
    public class SubjectController : Controller
    {
        private readonly DailyDiaryDatasContext db;

        public SubjectController(DailyDiaryDatasContext db)
        {
            this.db = db;
        }

        public async Task<ActionResult<IEnumerable<Subject>>> GetAll() //Get all
        {
            return await db.Subjects.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Subject>> Get(int id) //Get one by id
        {
            var subject = await db.Subjects.FirstOrDefaultAsync(x=> x.Id == id);
            if (subject != null)
            {
                return Ok(subject);
            }
            return NotFound(new {error = "Subject not found" });
        }

        [HttpPut]
        [Authorize(Roles = "MainAdmin,Admin")]
        public async Task<ActionResult<Subject>> CreateOrUpdateGroup(SubjectViewModel model) //CreateOrUpdateGroupAsync
        {
            if (ModelState.IsValid)
            {
                if(model!=null)
                {
                    var subjectToEdit = await db.Subjects.FirstOrDefaultAsync(x => x.Id == model.Id);
                    if (subjectToEdit == null)
                    {
                        subjectToEdit = new Subject
                        {
                            Title = model.Title
                        };
                    }
                    else
                    {
                        subjectToEdit.Id = model.Id;
                        subjectToEdit.Title = model.Title;
                    }
                    db.Subjects.Update(subjectToEdit);
                    await db.SaveChangesAsync();
                    return Ok(subjectToEdit);
                }
                return BadRequest(new { error = "Model is empty or null"});
            }
            return BadRequest(ModelState);
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "MainAdmin,Admin")]
        public async Task<ActionResult<Subject>> Delete(int id)
        {
            Subject subject = await db.Subjects.FirstOrDefaultAsync(x => x.Id == id);
            if (subject == null)
            {
                return NotFound();
            }
            db.Subjects.Remove(subject);
            await db.SaveChangesAsync();
            return Ok(subject);
        }

        [HttpGet("id")]
        public async Task<ActionResult<IEnumerable<Teacher>>> GetTeachersBySubjectId(int id)//List of teachers that have this subjects
        {
            IEnumerable<int> subjectTeachersId = await db.TeacherSubjects.Where(x => x.SubjectId == id).Select(x=> x.TeacherId).ToListAsync();
            if(subjectTeachersId != null)
            {
                //groupTeachersId = groupTeachersId.Distinct();
                var teachers = new List<Teacher>();
                foreach (var subjectId in subjectTeachersId)
                {
                    teachers.Add(await db.Teachers.FirstOrDefaultAsync(x => x.TeacherId == subjectId));
                }
                return Ok(teachers);
            }
            return NotFound(new { error = "No one teacher found" });
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<int>> GetSubjectId(int id)
        {
            StudyPlan stydyPlan = null;//await db.StudyPlans.FirstOrDefaultAsync(x => x.GroupId == id);
            if (stydyPlan != null)
            {
                SubjectsStudyPlan subjectsStudyPlan = await db.SubjectsStudyPlans.FirstOrDefaultAsync(x => x.StudyPlanId == stydyPlan.Id);
                if (subjectsStudyPlan != null)
                {
                    return Ok(subjectsStudyPlan.SubjectId);
                }
            }

            return NotFound();
        }
    }
}
