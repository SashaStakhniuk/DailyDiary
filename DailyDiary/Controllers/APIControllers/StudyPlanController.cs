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
using System.Text.Json;
using DailyDiary.Models.DbModels;
using System.Globalization;

namespace DailyDiary.Controllers.APIControllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class StudyPlanController : Controller
    {
        private readonly DailyDiaryDatasContext db;
        public StudyPlanController(DailyDiaryDatasContext db)
        {
            this.db = db;
        }
        
        [HttpGet("{yearOfStudyId}")]
        public async Task<ActionResult<IEnumerable<StudyPlan>>> GetAllStudyPlansByYearOfStudyId(int yearOfStudyId)
        {
            try
            {

                var yearOfStudy = await db.YearOfStudy.FirstOrDefaultAsync(x=> x.Id== yearOfStudyId);
                if (yearOfStudy == null)
                {
                    return NotFound("Year of study not found");
                }
                var studyPlans = await db.StudyPlans.Where(x => x.YearOfStudyId == yearOfStudy.Id).ToListAsync();
                var studyPlansToView = new List<StudyPlan>();
                studyPlans.ForEach((studyPlan) => studyPlansToView.Add(new StudyPlan
                {
                    Id = studyPlan.Id,
                    Title = studyPlan.Title,
                    Semester = studyPlan.Semester,
                    MaxAllowedLessonsPerDay = studyPlan.MaxAllowedLessonsPerDay,
                    YearOfStudy = new YearOfStudy
                    {
                        Id = yearOfStudy.Id,
                        YearStudy = yearOfStudy.YearStudy
                    }
                }));
                if (studyPlansToView.Count > 0)
                {
                    return studyPlansToView;
                }
                else
                {
                    return NotFound("Study plans fot this year of study not found");
                }
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }

        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<StudyPlan>>> GetAllStudyPlansOfCurrentStudyYear()
        {
            try
            {
                var studyYear = await db.StudyYears.FirstOrDefaultAsync(x => x.StartYear.Value.Year.ToString() == DateTime.Now.Year.ToString());
                if (studyYear == null)
                {
                    throw new Exception($"Study year started with {DateTime.Now.Year} not found.");
                }
                var yearsOfStudy = await db.YearOfStudy.Where(x => x.StudyYearId == studyYear.Id).ToListAsync();
                if (yearsOfStudy == null)
                {
                    throw new Exception($"No one year of study {studyYear.StartYear} / {studyYear.FinishYear} study year found.");
                }

                var studyPlans = new List<StudyPlan>();
                foreach (var yearOfStudy in yearsOfStudy)
                {
                    var studyPlan = await db.StudyPlans.FirstOrDefaultAsync(x => x.YearOfStudyId == yearOfStudy.Id);
                    if (studyPlan != null)
                    {
                        studyPlans.Add(new StudyPlan { Id = studyPlan.Id, Title = studyPlan.Title, Semester = studyPlan.Semester, MaxAllowedLessonsPerDay = studyPlan.MaxAllowedLessonsPerDay, YearOfStudy = new YearOfStudy { Id = yearOfStudy.Id, YearStudy = yearOfStudy.YearStudy } });
                    }
                }
                if (studyPlans.Count() > 0)
                {
                    return Ok(studyPlans);
                }
                return NotFound();
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }

        }
        [HttpGet]
        public async Task<ActionResult<StudyYear>> GetCurrentStudyYear()
        {
            var studyYear = await db.StudyYears.FirstOrDefaultAsync(x => x.StartYear.Value.Year.ToString() == DateTime.Now.Year.ToString());
            if (studyYear != null)
            {
                return studyYear;
            }
            return NotFound();
        }
        [HttpGet("{yearOfStudyId}")]
        public async Task<ActionResult<StudyPlanViewModel>> GetExistingStudyPlan(int yearOfStudyId)
        {
            try
            {
                if (yearOfStudyId <= 0)
                {
                    return BadRequest();
                }

                var studyPlan = await db.StudyPlans.FirstOrDefaultAsync(x => x.YearOfStudyId == yearOfStudyId);
                if (studyPlan == null)
                {
                    return NotFound();
                }

                StudyPlanViewModel existingStudyPlan = new StudyPlanViewModel();
                existingStudyPlan.PlanTitle = studyPlan.Title;
                existingStudyPlan.YearOfStudyId = studyPlan.YearOfStudyId;
                existingStudyPlan.Semester = studyPlan.Semester;
                existingStudyPlan.MaxAllowedLessonsPerDay = studyPlan.MaxAllowedLessonsPerDay;
                existingStudyPlan.SubjectsToAdd = JsonSerializer.Deserialize<List<SubjectsHours>>(studyPlan.SubjectsHoursCollection);

                return existingStudyPlan;
            }
            catch (Exception e)
            {
                return BadRequest(new { error = e.Message });
            }
        }
        //[HttpGet("{studyYearId}")]
        //public async Task<ActionResult<IEnumerable<YearOfStudy>>> GetYearsOfStudyByStudyYear(int studyYearId)
        //{
        //    var yearsOfStudy = await db.YearOfStudy.Where(x => x.StudyYearId == studyYearId).ToListAsync();
        //    if (yearsOfStudy != null)
        //    {
        //        return yearsOfStudy;
        //    }
        //    return NotFound();
        //}
        [HttpGet]
        public async Task<ActionResult<List<StudyYear>>> GetAllStudyYearsThatIncludeCurrent()
        {
            var studyYears = await db.StudyYears.Where(x => x.StartYear.Value.Year.ToString() == DateTime.Now.Year.ToString()).ToListAsync();
            if (studyYears != null)
            {
                return studyYears;
            }
            return NotFound();
        }

        [HttpPost]
        public async Task<ActionResult> CreateOrEdit(StudyPlanViewModel model)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    //string planTitle = model.PlanTitle;
                    var yearOfStudy = await db.YearOfStudy.FirstOrDefaultAsync(x => x.Id == model.YearOfStudyId);
                    if (yearOfStudy == null)
                    {
                        throw new Exception("Year of study not found.");
                    }
                    //int semester = model.Semester;

                    //if (semester < 0 || semester > 2) // 0 = цілий рік. 1-1 семестр, 2 - 2 семестр
                    //{
                    //    throw new Exception("Semester can't be less than 0 or biger then 2");
                    //}
                    List<SubjectsHours> subjectsToAdd = model.SubjectsToAdd;

                    if (subjectsToAdd.Count == 0 || subjectsToAdd == null)
                    {
                        throw new Exception("There are no selected subjects");
                    }
                    //else
                    //{
                    //    foreach (var subjectToAdd in subjectsToAdd)
                    //    {
                    //        if (float.Parse(subjectToAdd.Hours, CultureInfo.InvariantCulture.NumberFormat) <= 0){
                    //            throw new Exception(hour)
                    //        }
                    //    }
                    //}

                    //if (model.MaxAllowedLessonsPerDay <= 0)
                    //{
                    //    throw new Exception("MaxAllowedLessonsPerDay shouldn't be negative");
                    //}

                    //var studyPlanExist = await db.StudyPlans.Where(x =>
                    //     //x.Title == planTitle &&
                    //     x.YearOfStudy == yearOfStudy
                    //     //&& x.Semester == semester
                    //     //&& x.MaxAllowedLessonsPerDay == model.MaxAllowedLessonsPerDay
                    //     //&& x.SubjectsHoursCollection == studyPlanToAdd.SubjectsHoursCollection
                    //     ).FirstOrDefaultAsync();
                    var studyPlanToEdit = await db.StudyPlans.FirstOrDefaultAsync(x => x.YearOfStudy == yearOfStudy);

                    if (studyPlanToEdit != null)
                    {
                        studyPlanToEdit.Title = model.PlanTitle;
                        studyPlanToEdit.YearOfStudy = yearOfStudy;
                        studyPlanToEdit.Semester = model.Semester;
                        studyPlanToEdit.MaxAllowedLessonsPerDay = model.MaxAllowedLessonsPerDay;
                        studyPlanToEdit.SubjectsHoursCollection = JsonSerializer.Serialize(subjectsToAdd);
                        db.StudyPlans.Update(studyPlanToEdit);

                        //throw new Exception("Such study plan already exist");
                    }
                    else
                    {
                        StudyPlan studyPlanToAdd = new StudyPlan
                        {
                            Title = model.PlanTitle,
                            YearOfStudy = yearOfStudy,
                            Semester = model.Semester,
                            MaxAllowedLessonsPerDay = model.MaxAllowedLessonsPerDay,
                            SubjectsHoursCollection = JsonSerializer.Serialize(subjectsToAdd)
                        };
                        await db.StudyPlans.AddAsync(studyPlanToAdd);
                    }
                    await db.SaveChangesAsync();
                    return Ok();
                }
                else
                {
                    return BadRequest(ModelState);
                }
            }
            catch (Exception e)
            {
                return BadRequest(new { error = e.Message });
            }
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
                    //studyPlan.CurrentStudyPlan = model.CurrentStudyPlan;
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
            //if (model.SubjsId.Count == 0)
            //{
            //    if (model.Hours.Count == 0)
            //    {
            //        var subjests = await db.SubjectsStudyPlans.Where(x => x.StudyPlanId == studyPlan.Id).ToListAsync();
            //        foreach (var subject in subjests)
            //        {
            //            db.SubjectsStudyPlans.Remove(subject);
            //        }
            //    }
            //}
            //foreach (var subjectStPl in db.SubjectsStudyPlans)
            //{
            //    for (int i = 0; i < model.SubjsId.Count; i++)
            //    {
            //        if (subjectStPl.SubjectId != model.SubjsId[i] && subjectStPl.StudyPlanId == studyPlan.Id)
            //        {
            //            db.SubjectsStudyPlans.Remove(subjectStPl);
            //        }
            //    }
            //}
            return studyPlan;
        }

        private async Task<StudyPlan> updateSubjectsAndHours(StudyPlan studyPlan, EditStudyPlanViewModel model)
        {
            //for (int i = 0; i < model.SubjsId.Count; i++)
            //{
            //    for (int j = 0; j < model.Hours.Count; j++)
            //    {
            //        if (i == j)
            //        {
            //            if (model.Hours[i] > 10)
            //            {
            //                Subject subject = await db.Subjects.FirstOrDefaultAsync(x => x.Id == model.SubjsId[i]);
            //                SubjectsStudyPlan subjectsStudyPlan = await db.SubjectsStudyPlans.FirstOrDefaultAsync(x => x.SubjectId == subject.Id && x.StudyPlanId == studyPlan.Id);
            //                if (subjectsStudyPlan != null)
            //                {
            //                    subjectsStudyPlan.Hours = model.Hours[i];
            //                    db.SubjectsStudyPlans.Update(subjectsStudyPlan);
            //                }
            //                else if (subjectsStudyPlan == null)
            //                {
            //                    SubjectsStudyPlan newSubjectsStudyPlan = new SubjectsStudyPlan
            //                    {
            //                        Subject = subject,
            //                        SubjectId = model.SubjsId[i],
            //                        StudyPlan = studyPlan,
            //                        StudyPlanId = studyPlan.Id,
            //                        Hours = model.Hours[i]
            //                    };
            //                    db.SubjectsStudyPlans.Add(newSubjectsStudyPlan);
            //                    //studyPlan.SubjectsStudyPlans.Add(newSubjectsStudyPlan);
            //                }
            //            }
            //        }
            //    }
            //}
            return studyPlan;
        }

        [HttpGet("{studyPlanId}")]
        public async Task<ActionResult<GroupSubjectsHours>> GetStudyPlan(int studyPlanId)
        {
            //StudyPlan studyPlan = await db.StudyPlans.FirstOrDefaultAsync(x => x.Id == studyPlanId); ;
            //if (studyPlan != null)
            //{

            //    List<int> subjectsId = new List<int>();
            //    List<int> hours = new List<int>();

            //    var subjects = await db.SubjectsStudyPlans.Where(x => x.StudyPlanId == studyPlan.Id).ToListAsync();

            //    foreach(var subject in subjects)
            //    {
            //        hours.Add(subject.Hours);
            //    }
            //    foreach(var subject in subjects)
            //    {
            //        subjectsId.Add(subject.SubjectId);
            //    }

            //    GroupSubjectsHours model = new GroupSubjectsHours
            //    {
            //        Title = studyPlan.Title,
            //        Semester = studyPlan.Semester,
            //        //CurrentStudyPlan = studyPlan.CurrentStudyPlan,
            //        SubjectsId = subjectsId,
            //        Hours = hours
            //    };

            //    return Ok(model);
            //}
            //else
            //{
            //    return BadRequest();
            //}
            return BadRequest();

        }

        [HttpGet("{groupId}")]
        public async Task<ActionResult<StudyPlanViewModel>> GetStudyPlanByGroupId(int groupId)
        {
            //StudyPlanViewModel model;
            //Group group = await db.Groups.FirstOrDefaultAsync(x => x.Id == groupId);           

            //if (group != null)
            //{
            //    //StudyPlan studyPlan = await db.StudyPlans.FirstOrDefaultAsync(x => x.StudyPlanId == group.StudyPlanId);
            //    DM.StudyYear studyYear = null; //await db.StudyYears.FirstOrDefaultAsync(x => x.GroupId == groupId);
            //    StudyPlan studyPlan = null;
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
            //    if (studyPlan != null)
            //    {
            //        List<int> subjectsId = new List<int>();
            //        List<int> hours = new List<int>();

            //        var subjects = await db.SubjectsStudyPlans.Where(x => x.StudyPlanId == studyPlan.Id).ToListAsync();

            //        foreach(var subj in subjects)
            //        {
            //            subjectsId.Add(subj.SubjectId);
            //        }
            //        foreach (var subj in subjects)
            //        {
            //            hours.Add(subj.Hours);
            //        }

            //        model = new StudyPlanViewModel
            //        {
            //            //Semester = studyPlan.Semester,
            //            //Title = studyPlan.Title,
            //            //Subjects = subjectsId,
            //            //ListHouts = hours
            //        };

            //        return Ok(model);
            //    }
            //}
            return NotFound();
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<StudyPlan>>> Get()
        {
            return await db.StudyPlans.ToListAsync();
        }
    }
}
