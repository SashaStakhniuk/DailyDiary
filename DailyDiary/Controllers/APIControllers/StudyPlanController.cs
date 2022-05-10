using DailyDiary.Models;
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
            StudyPlan studyPlan = new StudyPlan();
            Group group = await db.Groups.FirstOrDefaultAsync(x => x.Id == model.GroupId);

            foreach (var sudyplan in db.StudyPlans)
            {
                if(sudyplan.GroupId != model.GroupId && sudyplan.Semester != model.Semester)
                {
                    studyPlan = new StudyPlan
                    {
                        Title = model.Title,
                        GroupId = model.GroupId,
                        Semester = model.Semester,
                    };
                }
            }
            db.StudyPlans.Add(studyPlan);
            for (int i = 0; i < model.Subjects.Count; i++)
            {
                for(int j = 0; j < model.ListHouts.Count; j++)
                {
                    if(i == j)
                    {
                        Subject subject = await db.Subjects.FirstOrDefaultAsync(x => x.Id == model.Subjects[i]);
                        SubjectsStudyPlan subjectsStudyPlan = new SubjectsStudyPlan
                        {
                            Subject = subject,
                            SubjectId = model.Subjects[i],
                            StudyPlan = studyPlan,
                            StudyPlanId = studyPlan.StudyPlanId,
                            Hours = model.ListHouts[i]
                        };
                        db.SubjectsStudyPlans.Add(subjectsStudyPlan);
                        studyPlan.SubjectsStudyPlans.Add(subjectsStudyPlan);
                    }
                }
                
            }
            group.StudyPlan = studyPlan;
            db.Groups.Update(group);
            await db.SaveChangesAsync();
            

            return Ok(true);
        }

        [HttpGet("{groupId}")]
        public async Task<ActionResult<GroupSubjectsHours>> GetSubgectsId(int groupId)
        {
            Group group = await db.Groups.FirstOrDefaultAsync(x => x.Id == groupId);
            if (group != null)
            {
                StudyPlan studyPlan = await db.StudyPlans.FirstOrDefaultAsync(x => x.StudyPlanId == group.StudyPlanId);
                List<int> subjectsId = new List<int>();
                List<int> hours = new List<int>();

                var subjects = await db.SubjectsStudyPlans.Where(x => x.StudyPlanId == studyPlan.StudyPlanId).ToListAsync();

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
                StudyPlan studyPlan = await db.StudyPlans.FirstOrDefaultAsync(x => x.StudyPlanId == group.StudyPlanId);
                if (studyPlan != null)
                {
                    List<int> subjectsId = new List<int>();
                    List<int> hours = new List<int>();

                    var subjects = await db.SubjectsStudyPlans.Where(x => x.StudyPlanId == studyPlan.StudyPlanId).ToListAsync();

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
                        GroupId = group.Id,
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
