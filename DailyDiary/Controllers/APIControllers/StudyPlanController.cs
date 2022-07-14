using DailyDiary.Models;
using DM = DailyDiary.Models;
using DailyDiary.Models.ViewModels;
using DailyDiary.Models.ViewModels.Group;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DailyDiary.Models.ViewModels.StudyPlan;

namespace DailyDiary.Controllers.APIControllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class StudyPlanController : Controller
    {
        private readonly IdentityContext db;
        public StudyPlanController(IdentityContext db)
        {
            this.db = db;
        }

        [HttpPost]
        public async Task<ActionResult<Boolean>> Create(StudyPlanViewModel model)
        {
            if (ModelState.IsValid)
            {
                var stYear = await db.StudyPlans.FirstOrDefaultAsync(x => x.Title == model.Title && x.Id == model.StudyYearId);
                if (stYear == null)
                {
                    DM.StudyYear studyYear = await db.StudyYears.FirstOrDefaultAsync(x => x.Id == model.StudyYearId);
                    StudyPlan studyPlan = new StudyPlan
                    {
                        Title = model.Title,
                        Semester = model.Semester,
                        CurrentStudyPlan = model.CurrentStudyPlan,
                    };
                    if (model.CurrentStudyPlan)
                    {
                        foreach (var sp in db.StudyPlans)
                        {
                            if (sp.Title != studyPlan.Title)
                            {
                                sp.CurrentStudyPlan = false;
                            }
                        }
                    }
                    for (int i = 0; i < model.Subjects.Count; i++)
                    {
                        for (int j = 0; j < model.ListHouts.Count; j++)
                        {
                            if (i == j)
                            {
                                Subject subject = await db.Subjects.FirstOrDefaultAsync(x => x.Id == model.Subjects[i]);
                                SubjectsStudyPlan subjectsStudyPlan = new SubjectsStudyPlan
                                {
                                    Subject = subject,
                                    StudyPlan = studyPlan,
                                    Hours = model.ListHouts[i]
                                };
                                db.SubjectsStudyPlans.Add(subjectsStudyPlan);
                                studyPlan.SubjectsStudyPlans.Add(subjectsStudyPlan);
                            }
                        }
                    }
                    StudyYearStudyPlan studyYearStudyPlan = new StudyYearStudyPlan
                    {
                        StudyPlan = studyPlan,
                        StudyYear = studyYear,
                    };
                    db.StudyPlans.Add(studyPlan);
                    db.StudyYearStudyPlans.Add(studyYearStudyPlan);
                    await db.SaveChangesAsync();
                    return Ok(true);
                }
            }
            return BadRequest();
        }

        [HttpPost]
        public async Task<ActionResult> Edit(EditStudyPlanViewModel model)
        {
            if (ModelState.IsValid)
            {
                StudyPlan studyPlan = await db.StudyPlans.FirstOrDefaultAsync(x => x.Id == model.Id);
                if (studyPlan != null)
                {

                    studyPlan = await removeSubjects(studyPlan, model);

                    studyPlan = await updateSubjectsAndHours(studyPlan, model);

                    studyPlan.Title = model.Title;
                    studyPlan.CurrentStudyPlan = model.CurrentStudyPlan;
                    studyPlan.Semester = model.Semester;
                    db.StudyPlans.Update(studyPlan);
                    await db.SaveChangesAsync();
                    return Ok();
                }
                return NotFound();
            }
            return BadRequest();
        }

        private async Task<StudyPlan> removeSubjects(StudyPlan studyPlan, EditStudyPlanViewModel model)
        {
            if (model.SubjsId.Count == 0)
            {
                if (model.Hours.Count == 0)
                {
                    var subjests = await db.SubjectsStudyPlans.Where(x => x.StudyPlanId == studyPlan.Id).ToListAsync();
                    foreach (var subject in subjests)
                    {
                        db.SubjectsStudyPlans.Remove(subject);
                    }
                }
            }
            foreach (var subjectStPl in db.SubjectsStudyPlans)
            {
                for (int i = 0; i < model.SubjsId.Count; i++)
                {
                    if (subjectStPl.SubjectId != model.SubjsId[i] && subjectStPl.StudyPlanId == studyPlan.Id)
                    {
                        db.SubjectsStudyPlans.Remove(subjectStPl);
                    }
                }
            }
            return studyPlan;
        }

        private async Task<StudyPlan> updateSubjectsAndHours(StudyPlan studyPlan, EditStudyPlanViewModel model)
        {
            for (int i = 0; i < model.SubjsId.Count; i++)
            {
                for (int j = 0; j < model.Hours.Count; j++)
                {
                    if (i == j)
                    {
                        if (model.Hours[i] > 10)
                        {
                            Subject subject = await db.Subjects.FirstOrDefaultAsync(x => x.Id == model.SubjsId[i]);
                            SubjectsStudyPlan subjectsStudyPlan = await db.SubjectsStudyPlans.FirstOrDefaultAsync(x => x.SubjectId == subject.Id && x.StudyPlanId == studyPlan.Id);
                            if (subjectsStudyPlan != null)
                            {
                                subjectsStudyPlan.Hours = model.Hours[i];
                                db.SubjectsStudyPlans.Update(subjectsStudyPlan);
                            }
                            else if (subjectsStudyPlan == null)
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
            }
            return studyPlan;
        }

        [HttpGet("{studyPlanId}")]
        public async Task<ActionResult<GroupSubjectsHours>> GetStudyPlan(int studyPlanId)
        {
            StudyPlan studyPlan = await db.StudyPlans.FirstOrDefaultAsync(x => x.Id == studyPlanId); ;
            if (studyPlan != null)
            {

                List<int> subjectsId = new List<int>();
                List<int> hours = new List<int>();

                var subjects = await db.SubjectsStudyPlans.Where(x => x.StudyPlanId == studyPlan.Id).ToListAsync();

                foreach(var subject in subjects)
                {
                    hours.Add(subject.Hours);
                }
                foreach(var subject in subjects)
                {
                    subjectsId.Add(subject.SubjectId);
                }

                GroupSubjectsHours model = new GroupSubjectsHours
                {
                    Title = studyPlan.Title,
                    Semester = studyPlan.Semester,
                    CurrentStudyPlan = studyPlan.CurrentStudyPlan,
                    SubjectsId = subjectsId,
                    Hours = hours
                };

                return Ok(model);
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpGet("{groupId}")]
        public async Task<ActionResult<StudyPlanViewModel>> GetStudyPlanByGroupId(int groupId)
        {
            StudyPlanViewModel model;
            Group group = await db.Groups.FirstOrDefaultAsync(x => x.Id == groupId);           
            
            if (group != null)
            {
                //StudyPlan studyPlan = await db.StudyPlans.FirstOrDefaultAsync(x => x.StudyPlanId == group.StudyPlanId);
                DM.StudyYear studyYear = null; //await db.StudyYears.FirstOrDefaultAsync(x => x.GroupId == groupId);
                StudyPlan studyPlan = null;
                /*
                foreach (var plan in studyYear.StudyPlans)
                {
                    if(plan.Id == studyPlaId)
                    {
                        studyPlan = plan;
                        break;
                    }
                }
                */
                if (studyPlan != null)
                {
                    List<int> subjectsId = new List<int>();
                    List<int> hours = new List<int>();

                    var subjects = await db.SubjectsStudyPlans.Where(x => x.StudyPlanId == studyPlan.Id).ToListAsync();

                    foreach(var subj in subjects)
                    {
                        subjectsId.Add(subj.SubjectId);
                    }
                    foreach (var subj in subjects)
                    {
                        hours.Add(subj.Hours);
                    }

                    model = new StudyPlanViewModel
                    {
                        Semester = studyPlan.Semester,
                        Title = studyPlan.Title,
                        Subjects = subjectsId,
                        ListHouts = hours
                    };

                    return Ok(model);
                }
            }
            return NotFound();
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<StudyPlan>>> Get()
        {
            return await db.StudyPlans.ToListAsync();
        }
    }
}
