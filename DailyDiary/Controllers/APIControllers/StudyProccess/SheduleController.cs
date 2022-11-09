using DailyDiary.Models;
using DailyDiary.Models.DbModels;
using DailyDiary.Models.ViewModels.Shedule;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DailyDiary.Controllers.APIControllers.StudyProccess
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class SheduleController : Controller
    {
        private readonly DailyDiaryDatasContext db;
        public SheduleController(DailyDiaryDatasContext db)
        {
            this.db = db;
        }

        //[HttpGet]
        //public async Task<ActionResult<IEnumerable<Shedule>>> GetByGroupId()
        //{
        //    return await db.Shedules.AsNoTracking().Where(x=> x.).ToListAsync();
        //}

        [HttpGet("{teacherId}")]
        public async Task<ActionResult<IEnumerable<Shedule>>> GetAllLessonsForTodayByTeacherIdAsync(int teacherId)// отримую розклад на сьогодні для викладача
        {
            try
            {
                if (teacherId <= 0)
                {
                    return BadRequest("Teacher id can't be <= 0");
                }
                Teacher teacher = await db.Teachers.AsNoTracking().FirstOrDefaultAsync(x => x.Id == teacherId);
                if (teacher == null)
                {
                    return NotFound("Teacher not found");
                }
                DateTime today = DateTime.Today;
                int dayOfWeekId = await db.DaysOfWeek.AsNoTracking().Where(x => x.DayIntValue == (int)today.DayOfWeek).Select(x => x.Id).FirstOrDefaultAsync();
                if (dayOfWeekId <= 0)
                {
                    return NotFound("Day of week not found in database");
                }
                var sheduleData = await db.Shedules.OrderBy(x=> x.LessonId).Include(x => x.TeacherSubgroupDistribution)
                    .Where(x => x.DayId == dayOfWeekId && x.TeacherSubgroupDistribution.TeacherId == teacherId)
                    .Select(x=> new Shedule
                    {
                        Id=x.Id,
                        LessonId=x.LessonId
                    }).ToListAsync();// усі уроки сьогоднішнього дня для викладача
                if(sheduleData==null || sheduleData.Count <= 0)
                {
                    return NotFound("No one shedule record for today for this teacher found");
                }
                return Ok(sheduleData);
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }
        [HttpGet("{sheduleId}")]
        public async Task<ActionResult<JournalFullDataViewModel>> GetSheduleDataForSelectedDayByLessonIdAsync(int sheduleId)// отримую розклад на сьогодні для викладача
        {
            try
            {
                //if (teacherId <= 0)
                //{
                //    return BadRequest("Teacher id can't be <= 0");
                //}
                //Teacher teacher = await db.Teachers.AsNoTracking().FirstOrDefaultAsync(x => x.Id == teacherId);
                //if (teacher == null)
                //{
                //    return NotFound("Teacher not found");
                //}
                //DateTime today = DateTime.Today;
                //int dayOfWeekId = await db.DaysOfWeek.AsNoTracking().Where(x => x.DayIntValue == (int)today.DayOfWeek).Select(x => x.Id).FirstOrDefaultAsync();
                //if (dayOfWeekId <= 0)
                //{
                //    return NotFound("Day of week not found in database");
                //}
                var sheduleData = await db.Shedules.Include(x => x.TeacherSubgroupDistribution)
                    .FirstOrDefaultAsync(x => x.Id == sheduleId);// перший урок сьогоднішнього дня для викладача

                if (sheduleData == null)
                {
                    return NotFound("Selected lesson for this teacher not found for current day");
                }
                var subgroup = await db.Subgroups.Include(x => x.Group).FirstOrDefaultAsync(x => x.Id == sheduleData.TeacherSubgroupDistribution.SubgroupId); // шукаю підгрупу, в якій викладач має вести предмет
                if (subgroup == null)
                {
                    return NotFound("Subgroup not found");
                }
                else
                {
                    if (subgroup.Id == subgroup.Group.DefSubgroupId)
                    {
                        subgroup.Title = subgroup.Group.Title;
                    }
                }
                var subject = await db.Subjects.AsNoTracking().FirstOrDefaultAsync(x => x.Id == sheduleData.TeacherSubgroupDistribution.SubjectId); // шукаю предмет, який викладач має вести в підгрупі
                if (subject == null)
                {
                    return NotFound("Subject not found");
                }
                var studentsList = await db.StudentsBySubgroups.Include(x => x.Student).ThenInclude(x => x.Person).Where(x => x.SubgroupId == subgroup.Id)
                    .Select(x => new StudentJournalData
                    {
                        StudentId = x.StudentId,
                        Name = x.Student.Person.Name,
                        LastName = x.Student.Person.LastName,
                        MiddleName = x.Student.Person.MiddleName
                    }).ToListAsync();
                if (studentsList == null)
                {
                    return NotFound("No one student in group found");
                }
                studentsList = studentsList.OrderBy(x => x.LastName).ThenBy(x => x.Name).ThenBy(x => x.MiddleName).ToList();
                JournalFullDataViewModel journalData = new JournalFullDataViewModel
                {
                    LessonId = (int)sheduleData.LessonId,
                    GroupId = subgroup.Id,
                    GroupTitle = subgroup.Title,
                    SubjectId = subject.Id,
                    SubjectTitle = subject.Title,
                    Students = studentsList
                };

                return Ok(journalData);
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }
        [HttpGet("{details}")]
        public async Task<ActionResult<IEnumerable<SheduleFullDataViewModel>>> GetSheduleIfExistByGroupIdAndDayId(int groupId, int dayId)
        {
            try
            {
                if (groupId <= 0)
                {
                    return BadRequest("Group id can't be <= 0");
                }
                if (dayId <= 0)
                {
                    return BadRequest("Day id can't be <= 0");
                }
                var group = await db.Groups.FirstOrDefaultAsync(x => x.Id == groupId);
                if (group == null)
                {
                    return NotFound("Group not found");
                }
                var day = await db.DaysOfWeek.AsNoTracking().FirstOrDefaultAsync(x => x.Id == dayId);
                if (day == null)
                {
                    return NotFound("Day not found");
                }
                //var teachersSubgroupsId = await db.TeacherSubgroupDistributions.AsNoTracking().Where(x=> x.SubgroupId==group.DefSubgroupId).Select(x=> x.Id).ToListAsync(); // ід всіх розподілів викладачів по підгрупах
                var teachersSubgroups = await db.TeacherSubgroupDistributions.AsNoTracking().Where(x => x.SubgroupId == group.DefSubgroupId).ToListAsync(); // всіх розподілів викладачів по підгрупах (викладач-група-предмет)
                if (teachersSubgroups == null || teachersSubgroups.Count == 0)
                {
                    return NotFound("No one teacher-subgroup distribution found");
                }
                List<SheduleFullDataViewModel> shedulesFullDataOfGroupByDay = new List<SheduleFullDataViewModel>();
                SheduleFullDataViewModel sheduleFullData = null;
                foreach (var teacherSubgroup in teachersSubgroups)
                {

                    //var shedules = await db.Shedules.AsNoTracking().Where(x => x.TeacherSubgroupDistributionId == teacherSubgroup.Id && x.DayId == day.Id).OrderBy(x=> x.LessonId).ThenBy(x=> x.Id).ToListAsync();
                    var shedules = await db.Shedules.Where(x => x.TeacherSubgroupDistributionId == teacherSubgroup.Id && x.DayId == day.Id).ToListAsync();

                    if (shedules != null && shedules.Count > 0)
                    {
                        //shedules = shedules.OrderBy(x => x.LessonId).ToList();
                        var teacher = await db.Teachers.Include(x => x.Person).FirstOrDefaultAsync(x => x.Id == teacherSubgroup.TeacherId);
                        var subject = await db.Subjects.FirstOrDefaultAsync(x => x.Id == teacherSubgroup.SubjectId);
                        foreach (var shedule in shedules)
                        {
                            sheduleFullData = new SheduleFullDataViewModel();

                            if (teacher != null)
                            {
                                sheduleFullData.TeacherId = teacher.Id;
                                if (teacher.Person != null)
                                {
                                    sheduleFullData.TeacherName = teacher.Person.Name;
                                    sheduleFullData.TeacherLastName = teacher.Person.LastName;
                                }
                            }
                            if (subject != null)
                            {
                                sheduleFullData.SubjectId = subject.Id;
                                sheduleFullData.SubjectTitle = subject.Title;
                            }


                            sheduleFullData.Id = shedule.Id;
                            sheduleFullData.AuditoryId = shedule.AuditoryId;
                            //sheduleFullData.AuditoryTitle = shedule.Auditory.Title;
                            sheduleFullData.LessonId = shedule.LessonId;
                            sheduleFullData.DayId = shedule.DayId;
                            sheduleFullData.WeekId = shedule.WeekId;
                            sheduleFullData.TeacherSubgroupDistributionId = shedule.TeacherSubgroupDistributionId;

                            shedulesFullDataOfGroupByDay.Add(sheduleFullData);
                        }
                    }
                }
                if (shedulesFullDataOfGroupByDay.Count > 0)
                {
                    shedulesFullDataOfGroupByDay = shedulesFullDataOfGroupByDay.OrderBy(x => x.LessonId).ToList();
                    return Ok(shedulesFullDataOfGroupByDay);
                }
                return NotFound("No one record of shedule found for selected day of selected group");
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }


        [HttpPost]
        public async Task<IActionResult> SetGroupShedule(SheduleViewModel model)
        {
            try
            {
                if (model.SheduleDatas.Count() == 0)
                {
                    return BadRequest("No one shedule element found");
                }
                TeacherSubgroupDistribution teacherSubgroup = null; // перевіряю чи існує розподіл викладача по групі
                int weekId = 0; // тиждень 0-без поділу, 1-непарний, 2-парний
                Models.DbModels.DayOfWeek day = null; // день тижня
                LessonShedule lesson = null; // урок
                Auditory auditory = null; // аудиторія
                Shedule sheduleItem = null; // запис з розкладу
                //bool dataSuccess = true; // змінна що вказує можна чи не можна додавати дані, якщо викладач веде пару в цей день і в цей час в іншій групі, або аудиторія вже зайнята на цей час іншою групою
                foreach (var sheduleToAdd in model.SheduleDatas) // перебираю усі дані, що "прийшли"
                {
                    //dataSuccess = true;

                    teacherSubgroup = await db.TeacherSubgroupDistributions.AsNoTracking().FirstOrDefaultAsync(x => x.Id == sheduleToAdd.TeacherSubgroupDistributionId); // звіряю чи існує такий розподіл
                    if (teacherSubgroup != null)
                    {
                        if (sheduleToAdd.WeekId >= 0 || sheduleToAdd.WeekId <= 2) // якщо ід тижня в проміжку від 0 до 2
                        {
                            weekId = sheduleToAdd.WeekId;

                            day = await db.DaysOfWeek.AsNoTracking().FirstOrDefaultAsync(x => x.Id == sheduleToAdd.DayId); // день=встановленому
                            if (day != null)
                            {
                                lesson = await db.LessonsShedule.AsNoTracking().FirstOrDefaultAsync(x => x.Id == sheduleToAdd.LessonId);
                                if (lesson != null)
                                {
                                    auditory = await db.Auditory.AsNoTracking().FirstOrDefaultAsync(x => x.Id == sheduleToAdd.AuditoryId);
                                    if (auditory != null)
                                    {
                                        //------------------------------------------Checking datas------------------------------------------------->

                                        var allTeacherSubgroupsDistributionId = await db.TeacherSubgroupDistributions.AsNoTracking().Where(x => x.TeacherId == teacherSubgroup.TeacherId && x.SubgroupId != teacherSubgroup.SubgroupId).Select(x => x.Id).ToListAsync(); // шукаю усі розподілення,окрім розподілення для обраної групи, де є цей викладач
                                        foreach (var teacherSubgroupsDistributionId in allTeacherSubgroupsDistributionId) // перебираю усі і шукаю чи викладач вже не веде урок у цю годину
                                        {
                                            var teacherSheduleChecking = await db.Shedules.AsNoTracking().FirstOrDefaultAsync(x => x.DayId == day.Id && x.LessonId == lesson.Id && x.WeekId == weekId && x.TeacherSubgroupDistributionId== teacherSubgroupsDistributionId); //якщо препод вже веде заняття в цей же день у цю ж годину. (іншими словами) якщо існує хоча б 1 запис де, викладач веде урок у (необраній) групі, де день = обраному і номер уроку = обраному
                                            if (teacherSheduleChecking != null)
                                            {
                                                //dataSuccess = false;
                                                var teacher = await db.Teachers.Include(x => x.Person).FirstOrDefaultAsync(x => x.Id == teacherSubgroup.TeacherId);
                                                if (teacher != null)
                                                {
                                                    var subgroupId = await db.TeacherSubgroupDistributions.AsNoTracking().Where(x => x.Id == teacherSubgroupsDistributionId).Select(x => x.SubgroupId).FirstOrDefaultAsync();
                                                    var groupTitle = await db.Groups.AsNoTracking().Where(x => x.DefSubgroupId == subgroupId).Select(x => x.Title).FirstOrDefaultAsync();

                                                    return BadRequest($"Teacher {teacher.Person.Name} {teacher.Person.LastName} already teached subject in group '{groupTitle}' on selected time");

                                                }
                                                else
                                                {
                                                    return BadRequest("Teacher already teached subject in group on selected time");
                                                }
                                            }
                                        }
                                        var sheduleAuditory = await db.Shedules.AsNoTracking().FirstOrDefaultAsync(x => x.AuditoryId == auditory.Id && x.DayId == day.Id && x.TeacherSubgroupDistributionId != teacherSubgroup.Id && x.LessonId == lesson.Id && x.WeekId == weekId); // якщо аудиторія зайнята іншою групою в цей час
                                        if (sheduleAuditory != null)
                                        {
                                            //dataSuccess = false;
                                            var subgroupId = await db.TeacherSubgroupDistributions.AsNoTracking().Where(x => x.Id == sheduleAuditory.TeacherSubgroupDistributionId).Select(x => x.SubgroupId).FirstOrDefaultAsync();
                                            var groupTitle = await db.Groups.AsNoTracking().Where(x => x.DefSubgroupId == subgroupId).Select(x => x.Title).FirstOrDefaultAsync();

                                            return BadRequest($"Auditory {auditory.Title} is busy on selected time by group {groupTitle}");

                                        }
                                        //<------------------------------------------Checking datas-------------------------------------------------





                                        if (sheduleToAdd.Id > 0)
                                        {
                                            sheduleItem = await db.Shedules.FirstOrDefaultAsync(x => x.Id == sheduleToAdd.Id);
                                            if (sheduleItem != null)
                                            {
                                                sheduleItem.TeacherSubgroupDistributionId = teacherSubgroup.Id;
                                                sheduleItem.WeekId = weekId;
                                                sheduleItem.DayId = day.Id;
                                                sheduleItem.LessonId = lesson.Id;
                                                sheduleItem.AuditoryId = auditory.Id;
                                                db.Shedules.Update(sheduleItem);
                                            }
                                        }
                                        else
                                        {
                                            sheduleItem = await db.Shedules.FirstOrDefaultAsync(x => x.TeacherSubgroupDistributionId == sheduleToAdd.TeacherSubgroupDistributionId && x.LessonId == sheduleToAdd.LessonId); // якщо співпадає викладач-предмет-години проведення
                                            await db.Shedules.AddAsync(new Shedule { TeacherSubgroupDistributionId = teacherSubgroup.Id, WeekId = weekId, DayId = day.Id, LessonId = lesson.Id, AuditoryId = auditory.Id });
                                        }
                                    }
                                }
                            }
                        }
                    }
                }

                int result = await db.SaveChangesAsync();
                if (result > 0)
                {
                    return Ok("Added or edited successfully");
                }
                else
                {
                    return StatusCode(500, "Shedule wasn't created");
                }
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }
        [HttpDelete("{details}")]
        public async Task<IActionResult> DeleteByIdFromDay(int sheduleId, int dayId)
        {
            try
            {
                if (sheduleId <= 0)
                {
                    return BadRequest("sheduleId can't be <= 0");
                }
                if (dayId <= 0)
                {
                    return BadRequest("dayId can't be <= 0");
                }
                var shedule = await db.Shedules.AsNoTracking().FirstOrDefaultAsync(x => x.Id == sheduleId && x.DayId == dayId);
                if (shedule == null)
                {
                    return NotFound("Shedule record not found");
                }
                db.Shedules.Remove(shedule);
                int result = await db.SaveChangesAsync();
                if (result > 0)
                {
                    return Ok("Removed successfully");
                }

                return StatusCode(500, "Record wasn't deleted for some reason");
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }

        }
    }
}
