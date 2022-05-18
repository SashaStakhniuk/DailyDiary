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

namespace DailyDiary.Controllers.APIControllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class StudyPlanController :  Controller
    {
        private readonly DailyDiaryDatasContext db;
        public StudyPlanController(DailyDiaryDatasContext db)
        {
            this.db = db;
        }
        
        [HttpPost]
        public async Task<ActionResult<Boolean>> Create(StudyPlanViewModel  model)
        {
            if (ModelState.IsValid)
            {

            }
            var stYear = await db.StudyPlans.FirstOrDefaultAsync(x => x.Title == model.Title && x.Id == model.StudyYearId);
            if(stYear == null)
            {
                StudyPlan studyPlan = new StudyPlan();
                DM.StudyYear studyYear = await db.StudyYears.FirstOrDefaultAsync(x => x.Id == model.StudyYearId);
                studyPlan = new StudyPlan
                {
                    Title = model.Title,
                    Semester = model.Semester,
                    CurrentStudyPlan = model.CurrentStudyPlan,
                };

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
                                SubjectId = model.Subjects[i],
                                StudyPlan = studyPlan,
                                StudyPlanId = studyPlan.Id,
                                Hours = model.ListHouts[i]
                            };
                            db.SubjectsStudyPlans.Add(subjectsStudyPlan);
                            studyPlan.SubjectsStudyPlans.Add(subjectsStudyPlan);
                        }
                    }

                }
                db.StudyPlans.Add(studyPlan);
                StudyYearStudyPlan studyYearStudyPlan = new StudyYearStudyPlan
                {
                    StudyPlan = studyPlan,
                    StudyYear = studyYear,
                };
                db.StudyYearStudyPlans.Add(studyYearStudyPlan);
                await db.SaveChangesAsync();
                return Ok(true);
            }
            return BadRequest();
        }

        [HttpGet("{groupId}")]
        public async Task<ActionResult<GroupSubjectsHours>> GetSubgectsId(int groupId)
        {
            Group group = await db.Groups.FirstOrDefaultAsync(x => x.Id == groupId);
            if (group != null)
            {
                StudyPlan studyPlan = null;
                DM.StudyYear studyYear = null; //await db.StudyYears.FirstOrDefaultAsync(x => x.GroupId == groupId);
                /*
                foreach(var plan in studyYear.StudyPlans)
                {
                    if (plan.Id == studyPlanId)
                    {
                        studyPlan = plan;
                        break;
                    }
                }
                */
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
                    Semester = studyPlan.Semester,
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
