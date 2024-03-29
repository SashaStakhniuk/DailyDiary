﻿using DailyDiary.Models;
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
using System.Security.Policy;

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

        [HttpGet]
        public async Task<ActionResult<IEnumerable<StudyPlan>>> GetAll() // отримую усі навчальні плани
        {
            return await db.StudyPlans.ToListAsync();
        }
        public async Task<IEnumerable<int>> GetAllStudyPlansIdOfCurrentStudyYear() // отримую усі навчальні плани теперішнього навчального року

        {
            YearOfStudyController yearOfStudyController = new YearOfStudyController(db);
            var allYearsOfStudyOfCurrentStudyYear = await yearOfStudyController.GetYearsOfStudyByCurrentStudyYear(); // всі роки навчання теперішнього навчального року
            if (allYearsOfStudyOfCurrentStudyYear!=null && allYearsOfStudyOfCurrentStudyYear.Value.Count() > 0)
            {
                var currentYearsOfStudy = allYearsOfStudyOfCurrentStudyYear.Value.ToList();
                    var studyPlansId = new List<int>();
                    foreach (var currentYearOfStudy in currentYearsOfStudy)
                    {
                        var studyPlanId = await db.StudyPlans.Where(x => x.YearOfStudyId == currentYearOfStudy.Id).Select(x => x.Id).FirstOrDefaultAsync();
                        if (studyPlanId > 0)
                        {
                            studyPlansId.Add(studyPlanId);
                        }
                    }
                    return studyPlansId;
            }
            return null;
        }

        [HttpGet("{yearOfStudyId}")]
        public async Task<ActionResult<IEnumerable<StudyPlan>>> GetAllStudyPlansByYearOfStudyId(int yearOfStudyId) // усі навчальні плани певного року навчання
        {
            try
            {
                var yearOfStudy = await db.YearOfStudy.FirstOrDefaultAsync(x => x.Id == yearOfStudyId);
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
        public async Task<ActionResult<IEnumerable<StudyPlan>>> GetAllStudyPlansOfCurrentStudyYear() // усі навчальні плани теперішнього навчального року
        {
            try
            {
                var currentDate = DateTime.Today; // 26.09.2022 0:00:00
                var studyYear = await db.StudyYears.FirstOrDefaultAsync(x => x.StartYear <= currentDate && x.FinishYear >= currentDate);
                if (studyYear == null)
                {
                    throw new Exception($"Study year that include {currentDate.ToShortDateString()} not found.");
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
        public async Task<ActionResult<StudyYear>> GetCurrentStudyYear() // теперішній навчальний рік
        {
            var currentDate = DateTime.Today; // 26.09.2022 0:00:00
            var studyYear = await db.StudyYears.FirstOrDefaultAsync(x => x.StartYear <= currentDate && x.FinishYear >= currentDate);
            if (studyYear != null)
            {
                return studyYear;
            }
            return NotFound($"Study year that include {currentDate.ToShortDateString()} not found");
        }

        [HttpGet("{yearOfStudyId}")]
        public async Task<ActionResult<StudyPlanViewModel>> GetExistingStudyPlan(int yearOfStudyId) // перевіряю чи існує навчальний план для року навчання
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

                StudyPlanViewModel existingStudyPlan = new StudyPlanViewModel
                {
                    PlanTitle = studyPlan.Title,
                    YearOfStudyId = studyPlan.YearOfStudyId,
                    Semester = studyPlan.Semester,
                    MaxAllowedLessonsPerDay = studyPlan.MaxAllowedLessonsPerDay,
                    SubjectsToAdd = JsonSerializer.Deserialize<List<SubjectsHours>>(studyPlan.SubjectsHoursCollection)
                };

                return existingStudyPlan;
            }
            catch (Exception e)
            {
                return BadRequest(new { error = e.Message });
            }
        }

        [HttpGet]
        public async Task<ActionResult<List<StudyYear>>> GetAllStudyYearsThatIncludeCurrent() // всі навчальні року, що включають теперішню дату
        {
            var studyYears = await db.StudyYears.Where(x => x.StartYear.Value.Year.ToString() == DateTime.Now.Year.ToString()).ToListAsync();
            if (studyYears != null)
            {
                return studyYears;
            }
            return NotFound();
        }
        public class RungViewModel
        {
            public int take { get; set; }
            public int skip { get; set; }
        }

        [HttpPost]
        public async Task<ActionResult<List<StudyPlan>>> GetRung(RungViewModel model)
        {
            var studyYears = model.take < db.StudyPlans.Count() ? await db.StudyPlans.Skip(model.skip).Take(model.take).ToListAsync() : await db.StudyPlans.Skip(model.skip).ToListAsync();
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


        [HttpGet("{groupId}")]
        public async Task<ActionResult<StudyPlanViewModel>> GetStudyPlanByGroupId(int groupId) 
        {
            try
            {
                if (groupId <= 0)
                {
                    return BadRequest("Group id can't be <= 0");
                }
                Group group = await db.Groups.AsNoTracking().FirstOrDefaultAsync(x => x.Id == groupId);
                if (group == null)
                {
                    return NotFound("Group not found");
                }
                StudyPlan studyPlan = await db.StudyPlans.AsNoTracking().FirstOrDefaultAsync(x=> x.Id==group.StudyPlanId);
                if (studyPlan == null)
                {
                    return NotFound("Study plan not found");
                }
                StudyPlanViewModel existingStudyPlan = new StudyPlanViewModel
                {                 
                    PlanTitle = studyPlan.Title,
                    YearOfStudyId = studyPlan.YearOfStudyId,
                    Semester = studyPlan.Semester,
                    MaxAllowedLessonsPerDay = studyPlan.MaxAllowedLessonsPerDay,
                    SubjectsToAdd = JsonSerializer.Deserialize<List<SubjectsHours>>(studyPlan.SubjectsHoursCollection)
                };
                return Ok(existingStudyPlan);
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }
    }
}
