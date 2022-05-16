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

        [HttpPost]
        public async Task<ActionResult<Group>> Create(GroupViewModel model)
        {
            if (ModelState.IsValid)
            {
                if (model != null)
                {
                    var groupToEdit = await db.Groups.FirstOrDefaultAsync(x => x.Id == model.Id);
                    if (groupToEdit == null)
                    {
                        groupToEdit = new Group
                        {
                            Title = model.Title
                        };
                        foreach (int studentId in model.StudentsId)
                        {
                            Student student = await db.Students.FirstOrDefaultAsync(x => x.StudentId == studentId);
                            groupToEdit.Students.Add(student);
                        }
                        db.Groups.Add(groupToEdit);
                    }
                    
                    await db.SaveChangesAsync();
                    return Ok(groupToEdit);
                }
                return BadRequest(new { error = "Model is empty or null" });
            }
            return BadRequest(ModelState);
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

        [HttpPost] 
        public async Task<ActionResult<Boolean>> Edit(EditGrooupViewModel model)
        {
            Group group = await db.Groups.FirstOrDefaultAsync(x => x.Id == model.GroupId);
            if(group != null)
            {
                StudyPlan studyPlan = await db.StudyPlans.FirstOrDefaultAsync(x => x.CurrentStudyPlan == true);
                if (model.SubjsId.Count == 0)
                {
                    if (model.Hours.Count == 0)
                    {
                        var subjests = await db.SubjectsStudyPlans.Where(x => x.StudyPlanId == studyPlan.Id).ToListAsync();
                        foreach(var subject in subjests)
                        {
                            db.SubjectsStudyPlans.Remove(subject);
                        }
                    }
                }
                foreach(var subjectStPl in db.SubjectsStudyPlans)
                {
                    for (int i = 0; i < model.SubjsId.Count; i++)
                    { 
                        if(subjectStPl.SubjectId != model.SubjsId[i] && subjectStPl.StudyPlanId == studyPlan.Id)
                        {
                            db.SubjectsStudyPlans.Remove(subjectStPl);
                        }
                    }
                }
                for (int i = 0; i < model.SubjsId.Count; i++)
                {
                    for (int j = 0; j < model.Hours.Count; j++)
                    {
                        if (i == j)
                        {
                            Subject subject = await db.Subjects.FirstOrDefaultAsync(x => x.Id == model.SubjsId[i]);
                            SubjectsStudyPlan subjectsStudyPlan = await db.SubjectsStudyPlans.FirstOrDefaultAsync(x => x.SubjectId == subject.Id && x.StudyPlanId == studyPlan.Id);
                            if (subjectsStudyPlan != null)
                            {
                                subjectsStudyPlan.Hours = model.Hours[i];
                                db.SubjectsStudyPlans.Update(subjectsStudyPlan);
                            } 
                            else if(subjectsStudyPlan == null)
                            {
                                SubjectsStudyPlan newSubjectsStudyPlan = new SubjectsStudyPlan
                                {
                                    Subject = subject,
                                    SubjectId = model.SubjsId[i],
                                    StudyPlan = studyPlan,
                                    StudyPlanId = studyPlan.Id,
                                    Hours = model.Hours[i]
                                };
                                db.SubjectsStudyPlans.Add(newSubjectsStudyPlan);
                                studyPlan.SubjectsStudyPlans.Add(newSubjectsStudyPlan);
                            }
                        }
                    }
                }
                studyPlan.Semester = model.Semester;
                var allGroups = await db.Groups.ToListAsync();
                foreach(var globalGroup in allGroups)
                {
                    if(globalGroup.Title != model.Title)
                    {
                        group.Title = model.Title;
                    }
                }
                db.StudyPlans.Update(studyPlan);
                db.Groups.Update(group);
                await db.SaveChangesAsync();
                return Ok();
            }
            return BadRequest();
        }
    }
}
