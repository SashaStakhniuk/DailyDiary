using DailyDiary.Models;
using DM = DailyDiary.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DailyDiary.Models.ViewModels.StudyYear;
using Microsoft.EntityFrameworkCore;
using DailyDiary.Models.ViewModels;
using DailyDiary.Models.DbModels;
using DailyDiary.Models.ViewModels.Teacher;

namespace DailyDiary.Controllers.APIControllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class PlanEducationController : Controller
    {
        private readonly DailyDiaryDatasContext db;
        public PlanEducationController(DailyDiaryDatasContext db)
        {
            this.db = db;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<StudyYear>>> Get()
        {
            return await db.StudyYears.ToListAsync();
        }

        [HttpGet("{take:int}/{skkip:int}")]
        public async Task<ActionResult<IEnumerable<StudyYear>>> GetRung(int take, int skkip)
        {
            return (take < db.StudyYears.Count() ? await db.StudyYears.Skip(skkip).Take(take).ToListAsync() : await db.StudyYears.Skip(skkip).ToListAsync());
        }

        [HttpGet("{groupId:int}")]
        public async Task<ActionResult<IEnumerable<TeachersSubjectsId>>> GetTeachersSubjectsDistributionByGroupId(int groupId)
        {
            try
            {
                if (groupId <= 0)
                {
                    return BadRequest("Group id can't be <= 0");
                }
                var group = await db.Groups.FirstOrDefaultAsync(x => x.Id == groupId);
                if (group == null)
                {
                    return NotFound("Group not found");
                }
                var teachersSubjectsDistribution = await db.TeacherSubgroupDistributions.Where(x=> x.SubgroupId == group.DefSubgroupId).ToListAsync(); // дістаю список розподілень по дефолтній підгрупі групи
                if (teachersSubjectsDistribution != null) // якщо існує
                {
                    List<TeachersSubjectsId> teacherDistribution = new List<TeachersSubjectsId>(); // список викладачів і предметів, що вони ведуть у цій групі
                    foreach(var teacherSubject in teachersSubjectsDistribution) // для кожного розподілення
                    {
                        var teacherExist = await db.Teachers.FirstOrDefaultAsync(x => x.Id == teacherSubject.TeacherId); // перевіряю чи препод досі існує в базі
                        if (teacherExist != null) // якщо існує
                        {
                            var subject = await db.Subjects.FirstOrDefaultAsync(x=> x.Id==teacherSubject.SubjectId); // перевіряю чи предмет досі існує в базі
                            if (subject != null)// якщо існує
                            {
                                teacherDistribution.Add(new TeachersSubjectsId { TeacherId = (int)teacherSubject.TeacherId, SubjectId = teacherSubject.SubjectId });// додаю ід препода і предмета до списку 
                            }
                        }
                    }
                    if (teacherDistribution.Count > 0)
                    {
                        return Ok(teacherDistribution);
                    }
                    return NotFound("Datas about teachers or subjects not found in DB");
                }
                else
                {
                    return NotFound("No one record about teachers-subjects-group distribution found");
                }
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }

        [HttpPost]
        public async Task<IActionResult> SetTeachersToGroupBySubjects(TeachersSubjectsViewModel model)
        {
            try
            {
                if (model.GroupId <= 0)
                {
                    return BadRequest("Group id can't be <= 0");
                }
                if (model.TeachersSubjectsId.Count() <= 0)
                {
                    return BadRequest("List of subjects and teachers is empty");
                }
                var group = await db.Groups.FirstOrDefaultAsync(x => x.Id == model.GroupId); // шукаю групу
                if (group == null)
                {
                    return NotFound("Group not found");
                }
                var defSubgroup = await db.Subgroups.FirstOrDefaultAsync(x => x.Id == group.DefSubgroupId && x.GroupId == group.Id); // шукаю дефолтну підгрупу
                if (defSubgroup == null)
                {
                    return NotFound("DefSubgroup for group not found");
                }
                foreach (var teacherSubject in model.TeachersSubjectsId) // для кожного запису із списку
                {
                    var subject = await db.Subjects.FirstOrDefaultAsync(x => x.Id == teacherSubject.SubjectId); // шукаю предмет
                    if (subject != null) // якщо існує
                    {
                        var teacher = await db.Teachers.FirstOrDefaultAsync(x => x.Id == teacherSubject.TeacherId); // шукаю викладача

                        TeacherSubgroupDistribution teacherSubgroupDistribution = await db.TeacherSubgroupDistributions.FirstOrDefaultAsync(x => x.SubgroupId == defSubgroup.Id && x.SubjectId == subject.Id); // шукаю чи такий запис вже існує
                        if (teacherSubgroupDistribution == null) // якщо запис ще не існує
                        {
                            if (teacher != null) // якщо викладач існує
                            {
                                await db.TeacherSubgroupDistributions.AddAsync(new TeacherSubgroupDistribution { Subgroup = defSubgroup, Subject = subject, TeacherId = teacher.Id, AuditoryTypeId = null, AdditionalHours = 0, UnionId = null }); // створюю
                            }
                            else // якщо викладача не існує
                            {
                                await db.TeacherSubgroupDistributions.AddAsync(new TeacherSubgroupDistribution { Subgroup = defSubgroup, Subject = subject, TeacherId = null, AuditoryTypeId = null, AdditionalHours = 0, UnionId = null }); // створюю
                            }
                        }
                        else // якщо запис вже існує
                        {
                            if (teacher != null) // якщо викладач існує
                            {
                                teacherSubgroupDistribution.TeacherId = teacher.Id;
                            }
                            else // якщо викладача не існує
                            {
                                teacherSubgroupDistribution.TeacherId = null;
                            }
                            db.TeacherSubgroupDistributions.Update(teacherSubgroupDistribution); // оновлюю
                        }

                    }
                }
                int result = await db.SaveChangesAsync();
                if (result > 0)
                {
                    return Ok("Teachers distributed successfully");
                }
                return StatusCode(500, "Error with adding datas in DB");
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }

        }
        [HttpPost]
        public async Task<IActionResult> NewPlanEducation(StudyYearViewModel model)
        {
            try
            {
                if (model.FinishYear == model.StartYear)
                {
                    return BadRequest("Check datas then try again");
                }
                if (model.FinishYear < model.StartYear)
                {
                    DateTime temp = model.StartYear;
                    model.FinishYear = temp;
                    model.StartYear = model.FinishYear;
                }
                //var st1 = await db.StudyYears.FirstOrDefaultAsync(x => x.StartYear == model.StartYear && x.FinishYear == model.FinishYear);

                var startYear = await db.StudyYears.FirstOrDefaultAsync(x => x.StartYear == model.StartYear);
                var finishYear = await db.StudyYears.FirstOrDefaultAsync(x => x.FinishYear == model.FinishYear);
                if (startYear == null && finishYear == null)
                {

                    string title = model.StartYear.Year + " / " + model.FinishYear.Year;

                    StudyYear studyYear = new StudyYear
                    {
                        Title = title,
                        StartYear = model.StartYear,
                        FinishYear = model.FinishYear
                    };
                    db.StudyYears.Add(studyYear);
                    await db.SaveChangesAsync();
                    //for (int i = model.YearsOfStudy; i >= 1; i--)

                    for (int i = 1; i <= model.YearsOfStudy; i++)
                    {
                        db.YearOfStudy.Add(new YearOfStudy { YearStudy = i, StudyYear = studyYear });
                    }
                    await db.SaveChangesAsync();
                    return Ok();
                }
                else
                {
                    if (startYear != null && finishYear != null)
                    {
                        return BadRequest("Study year already exist");
                    }
                    else if (startYear != null)
                    {
                        return BadRequest("Study year that started with entered data already exist");
                    }
                    else
                    {
                        return BadRequest("Study year that finished with entered data already exist");
                    }
                }
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

    }
}
