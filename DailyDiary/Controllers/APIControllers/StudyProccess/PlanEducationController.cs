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
using DailyDiary.Models.ViewModels.Subgroup;

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

        [HttpGet("{subgroupId:int}")]
        public async Task<ActionResult<IEnumerable<TeachersSubjectsId>>> GetTeachersSubjectsDistributionBySubgroupId(int subgroupId)
        {
            try
            {
                if (subgroupId <= 0)
                {
                    return BadRequest("Subgroup id can't be <= 0");
                }
                var subgroup = await db.Subgroups.FirstOrDefaultAsync(x => x.Id == subgroupId);
                if (subgroup == null)
                {
                    return NotFound("Subgroup not found");
                }
                var teachersSubjectsDistribution = await db.TeacherSubgroupDistributions.Where(x => x.SubgroupId == subgroup.Id).ToListAsync(); // дістаю список розподілень по підгрупі
                if (teachersSubjectsDistribution != null) // якщо існує
                {
                    List<TeachersSubjectsId> teacherDistribution = new List<TeachersSubjectsId>(); // список викладачів і предметів, що вони ведуть у цій підгрупі
                    TeachersSubjectsId distributionData = null;
                    foreach (var teacherSubject in teachersSubjectsDistribution) // для кожного розподілення
                    {
                        distributionData = new TeachersSubjectsId();
                        var teacherExist = await db.Teachers.FirstOrDefaultAsync(x => x.Id == teacherSubject.TeacherId); // перевіряю чи препод досі існує в базі
                        if (teacherExist != null) // якщо існує
                        {
                            distributionData.TeacherId = (int)teacherSubject.TeacherId;
                        }
                        else
                        {
                            distributionData.TeacherId = 0;
                        }
                        var subject = await db.Subjects.FirstOrDefaultAsync(x => x.Id == teacherSubject.SubjectId); // перевіряю чи предмет досі існує в базі
                        if (subject != null)// якщо існує
                        {
                            distributionData.SubjectId = teacherSubject.SubjectId;
                        }
                        else
                        {
                            distributionData.SubjectId = 0;
                        }
                        var auditoryType = await db.AuditoryTypes.FirstOrDefaultAsync(x => x.Id == teacherSubject.AuditoryTypeId); // перевіряю чи предмет досі існує в базі
                        if (auditoryType != null)// якщо існує
                        {
                            distributionData.AuditoryTypeId = teacherSubject.AuditoryTypeId;
                        }
                        else
                        {
                            distributionData.AuditoryTypeId = 0;
                        }
                        distributionData.AdditionalHours = (float)teacherSubject.AdditionalHours;
                        teacherDistribution.Add(distributionData);// додаю дані в список 
                    }
                    if (teacherDistribution.Count > 0)
                    {
                        return Ok(teacherDistribution);
                    }
                    return NotFound("Existing records about teachers by subjects distribution not found for this subgroup in DB"); // якщо не знайдені ід предмета або препода в базі
                }
                else
                {
                    return NotFound("No one record about teachers-subjects-subgroup separation found"); // якщо записів не існує
                }
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
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
                var teachersSubjectsDistribution = await db.TeacherSubgroupDistributions.Where(x => x.SubgroupId == group.DefSubgroupId).ToListAsync(); // дістаю список розподілень по дефолтній підгрупі групи
                if (teachersSubjectsDistribution != null) // якщо існує
                {
                    List<TeachersSubjectsId> teacherDistribution = new List<TeachersSubjectsId>(); // список викладачів і предметів, що вони ведуть у цій групі
                    TeachersSubjectsId distributionData = null;
                    foreach (var teacherSubject in teachersSubjectsDistribution) // для кожного розподілення
                    {
                        distributionData = new TeachersSubjectsId();
                        var teacherExist = await db.Teachers.FirstOrDefaultAsync(x => x.Id == teacherSubject.TeacherId); // перевіряю чи препод досі існує в базі
                        if (teacherExist != null) // якщо існує
                        {
                            distributionData.TeacherId = (int)teacherSubject.TeacherId;
                        }
                        else
                        {
                            distributionData.TeacherId = 0;
                        }
                        var subject = await db.Subjects.FirstOrDefaultAsync(x => x.Id == teacherSubject.SubjectId); // перевіряю чи предмет досі існує в базі
                        if (subject != null)// якщо існує
                        {
                            distributionData.SubjectId = teacherSubject.SubjectId;
                        }
                        else
                        {
                            distributionData.SubjectId = 0;
                        }
                        var auditoryType = await db.AuditoryTypes.FirstOrDefaultAsync(x => x.Id == teacherSubject.AuditoryTypeId); // перевіряю чи предмет досі існує в базі
                        if (auditoryType != null)// якщо існує
                        {
                            distributionData.AuditoryTypeId = teacherSubject.AuditoryTypeId;
                        }
                        else
                        {
                            distributionData.AuditoryTypeId = 0;
                        }
                        if (distributionData.AuditoryTypeId != 0 || distributionData.SubjectId != 0 || distributionData.TeacherId != 0)
                        {
                            teacherDistribution.Add(distributionData);// додаю ід препода і предмета до списку 
                        }
                    }
                    if (teacherDistribution.Count > 0)
                    {
                        return Ok(teacherDistribution);
                    }
                    return NotFound("Existing records about teachers by subjects distribution not found for this group in DB");
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
        [HttpGet("{details}")]
        public async Task<ActionResult<SubgroupDistributionViewModel>> getTeacherSubjectDistributionBySubjectIdAndGroupId(int subjectId, int groupId)
        {
            try
            {
                if (subjectId <= 0)
                {
                    return BadRequest("Subject id can't be <= 0");
                }
                if (groupId <= 0)
                {
                    return BadRequest("Group id can't be <= 0");
                }
                var group = await db.Groups.FirstOrDefaultAsync(x => x.Id == groupId);
                if (group == null)
                {
                    return NotFound("Group not found");
                }
                var teacherSubjectDistribution = await db.TeacherSubgroupDistributions.FirstOrDefaultAsync(x => x.SubgroupId == group.DefSubgroupId && x.SubjectId == subjectId); // дістаю список розподілень по дефолтній підгрупі групи
                if (teacherSubjectDistribution != null) // якщо існує
                {
                    SubgroupDistributionViewModel distributionData = new SubgroupDistributionViewModel();
                    distributionData.SubgroupDistributionId = teacherSubjectDistribution.Id;
                    var teacherExist = await db.Teachers.Include(x => x.Person).FirstOrDefaultAsync(x => x.Id == teacherSubjectDistribution.TeacherId); // перевіряю чи препод досі існує в базі
                    if (teacherExist != null) // якщо існує
                    {
                        distributionData.TeacherId = teacherExist.Id;
                        if (teacherExist.Person != null)
                        {
                            distributionData.TeacherName = teacherExist.Person.Name;
                            distributionData.TeacherLastName = teacherExist.Person.LastName;
                        }
                    }
                    else
                    {
                        distributionData.TeacherId = 0;
                        distributionData.TeacherName = "-";
                        distributionData.TeacherLastName = "-";
                    }
                    var subject = await db.Subjects.AsNoTracking().FirstOrDefaultAsync(x => x.Id == teacherSubjectDistribution.SubjectId); // перевіряю чи предмет досі існує в базі
                    if (subject != null)// якщо існує
                    {
                        distributionData.SubjectId = subject.Id;
                        distributionData.SubjectTitle = subject.Title;
                    }
                    else
                    {
                        distributionData.SubjectId = 0;
                    }
                    var auditoryType = await db.AuditoryTypes.FirstOrDefaultAsync(x => x.Id == teacherSubjectDistribution.AuditoryTypeId); // перевіряю чи предмет досі існує в базі
                    if (auditoryType != null)// якщо існує
                    {
                        distributionData.AuditoryTypeId = auditoryType.Id;
                        distributionData.AuditoryTypeTitle = auditoryType.AuditoryTypeDescription;

                        var auditories = await db.Auditory.AsNoTracking().Where(x => x.AuditoryTypeId == auditoryType.Id).ToListAsync();
                        if (auditories != null)
                        {
                            distributionData.Auditories = auditories;
                        }
                    }
                    else
                    {
                        distributionData.AuditoryTypeId = 0;
                        var auditories = await db.Auditory.AsNoTracking().ToListAsync();
                        if (auditories != null)
                        {
                            distributionData.Auditories = auditories;
                        }
                    }

                    return Ok(distributionData);
                }
                else
                {
                    return NotFound("Existing records about teachers by subjects distribution not found for this group in DB");
                }
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }
        [HttpPost]
        public async Task<IActionResult> SetTeachersDistributionToGroupBySubjects(TeachersSubjectsViewModel model)
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
                        var auditoryType = await db.AuditoryTypes.AsNoTracking().Select(x => x.Id).ToListAsync(); // шукаю тип аудиторії

                        //if (teacherSubject.AuditoryTypeId >= 0 && teacherSubject.AuditoryTypeId <= auditoryType.Id) // за умови якщо тип аудиторії існує (0-будь-який тип аудиторії)
                        if (teacherSubject.AuditoryTypeId >= 0 || teacherSubject.AuditoryTypeId == null && teacherSubject.AuditoryTypeId <= auditoryType.Count) // за умови якщо тип аудиторії існує (0-будь-який тип аудиторії)
                        {
                            if (teacherSubject.AuditoryTypeId == 0)
                            {
                                teacherSubject.AuditoryTypeId = null;
                            }
                            var teacher = await db.Teachers.FirstOrDefaultAsync(x => x.Id == teacherSubject.TeacherId); // шукаю викладача

                            TeacherSubgroupDistribution teacherSubgroupDistribution = await db.TeacherSubgroupDistributions.FirstOrDefaultAsync(x => x.SubgroupId == defSubgroup.Id && x.SubjectId == subject.Id); // шукаю чи такий запис вже існує
                            if (teacherSubgroupDistribution == null) // якщо запис ще не існує
                            {
                                if (teacher != null) // якщо викладач існує
                                {
                                    await db.TeacherSubgroupDistributions.AddAsync(new TeacherSubgroupDistribution { Subgroup = defSubgroup, Subject = subject, TeacherId = teacher.Id, AuditoryTypeId = teacherSubject.AuditoryTypeId, AdditionalHours = 0, UnionId = null }); // створюю
                                }
                                else // якщо викладача не існує
                                {
                                    await db.TeacherSubgroupDistributions.AddAsync(new TeacherSubgroupDistribution { Subgroup = defSubgroup, Subject = subject, TeacherId = null, AuditoryTypeId = teacherSubject.AuditoryTypeId, AdditionalHours = 0, UnionId = null }); // створюю
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

                                teacherSubgroupDistribution.AuditoryTypeId = teacherSubject.AuditoryTypeId; // null - будь-яка аудиторія

                                db.TeacherSubgroupDistributions.Update(teacherSubgroupDistribution); // оновлюю
                            }
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
        public async Task<IActionResult> SetTeachersToSubgroupBySubjects(TeachersSubjectsViewModel model)
        {
            try
            {
                if (model.GroupId <= 0)
                {
                    return BadRequest("Subgroup id can't be <= 0");
                }
                if (model.TeachersSubjectsId.Count() <= 0)
                {
                    return BadRequest("List of passed data is empty");
                }
                var subgroup = await db.Subgroups.FirstOrDefaultAsync(x => x.Id == model.GroupId); // шукаю підгрупу
                if (subgroup == null)
                {
                    return NotFound("Subgroup not found");
                }

                foreach (var teacherSubject in model.TeachersSubjectsId) // для кожного запису із списку
                {
                    var subject = await db.Subjects.FirstOrDefaultAsync(x => x.Id == teacherSubject.SubjectId); // шукаю предмет
                    if (subject != null) // якщо існує
                    {
                        var auditoryType = await db.AuditoryTypes.AsNoTracking().Select(x => x.Id).ToListAsync(); // кількість типів аудиторій

                        if (teacherSubject.AuditoryTypeId >= 0 || teacherSubject.AuditoryTypeId == null && teacherSubject.AuditoryTypeId <= auditoryType.Count) // за умови якщо тип аудиторії існує (0/null-будь-який тип аудиторії)
                        {
                            if (teacherSubject.AuditoryTypeId == 0)
                            {
                                teacherSubject.AuditoryTypeId = null;
                            }
                            if (teacherSubject.AdditionalHours < 0)
                            {
                                teacherSubject.AdditionalHours = 0;
                            }

                            var teacher = await db.Teachers.FirstOrDefaultAsync(x => x.Id == teacherSubject.TeacherId); // шукаю викладача

                            TeacherSubgroupDistribution teacherSubgroupDistribution = await db.TeacherSubgroupDistributions.FirstOrDefaultAsync(x => x.SubgroupId == subgroup.Id && x.SubjectId == subject.Id); // шукаю чи такий запис вже існує
                            if (teacherSubgroupDistribution == null) // якщо запис ще не існує
                            {
                                if (teacher != null) // якщо викладач існує
                                {
                                    await db.TeacherSubgroupDistributions.AddAsync(new TeacherSubgroupDistribution { Subgroup = subgroup, Subject = subject, TeacherId = teacher.Id, AuditoryTypeId = teacherSubject.AuditoryTypeId, AdditionalHours = teacherSubject.AdditionalHours, UnionId = null }); // створюю
                                }
                                else // якщо викладача не існує
                                {
                                    await db.TeacherSubgroupDistributions.AddAsync(new TeacherSubgroupDistribution { Subgroup = subgroup, Subject = subject, TeacherId = null, AuditoryTypeId = teacherSubject.AuditoryTypeId, AdditionalHours = teacherSubject.AdditionalHours, UnionId = null }); // створюю
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
                                teacherSubgroupDistribution.AuditoryTypeId = teacherSubject.AuditoryTypeId; // null - будь-яка аудиторія
                                teacherSubgroupDistribution.AdditionalHours = teacherSubject.AdditionalHours;

                                db.TeacherSubgroupDistributions.Update(teacherSubgroupDistribution); // оновлюю
                            }
                        }

                    }
                }
                int result = await db.SaveChangesAsync();
                if (result > 0)
                {
                    return Ok("Datas was updated for subgroup successfully");
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
                return StatusCode(500, e.Message);
            }
        }
        [HttpDelete("{details}")]
        public async Task<IActionResult> DeleteSubjectFromSubgroup(int subgroupId, int subjectId)
        {
            try
            {
                if (subgroupId <= 0)
                {
                    return BadRequest("Subgroup id can't be <= 0");
                }
                if (subjectId <= 0)
                {
                    return BadRequest("Subject id can't be <= 0");
                }
                var subgroup = await db.Subgroups.FirstOrDefaultAsync(x => x.Id == subgroupId);
                if (subgroup == null)
                {
                    return NotFound("Subgroup not found");
                }
                var subject = await db.Subjects.FirstOrDefaultAsync(x => x.Id == subjectId);
                if (subgroup == null)
                {
                    return NotFound("Subject not found");
                }

                var teacherDistribution = await db.TeacherSubgroupDistributions.FirstOrDefaultAsync(x => x.SubgroupId == subgroup.Id && x.SubjectId == subject.Id);
                if (teacherDistribution != null)
                {
                    db.TeacherSubgroupDistributions.Remove(teacherDistribution);
                    var result = await db.SaveChangesAsync();
                    if (result > 0)
                        return Ok("Subject was removed from this group");
                    else
                        return StatusCode(500, "Subject wasn't deleted");
                }
                return NotFound("Record about this subject not found in this subgroup");
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }
        [HttpGet]
        public async Task<IEnumerable<LessonShedule>> GetAllLessonsShedule()
        {
            return await db.LessonsShedule.ToListAsync();
        }
        [HttpGet]
        public async Task<IEnumerable<DailyDiary.Models.DbModels.DayOfWeek>> GetDaysOfStudy()
        {
            return await db.DaysOfWeek.ToListAsync();
        }
    }
}
