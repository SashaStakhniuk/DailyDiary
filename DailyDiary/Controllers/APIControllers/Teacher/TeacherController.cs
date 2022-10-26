using DailyDiary.Models;
using DailyDiary.Models.DbModels;
using DailyDiary.Models.ViewModels;
using DailyDiary.Models.ViewModels.Teacher;
using DailyDiary.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
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
    public class TeacherController : Controller
    {
        private readonly DailyDiaryDatasContext db;
        private readonly UserManager<User> userManager;
        public TeacherController(DailyDiaryDatasContext context, UserManager<User> userManager)
        {
            this.userManager = userManager;
            this.db = context;
        }
        private async Task<List<TeacherToDisplayViewModel>> GetTeachersAllDataByTeachersId(List<int> teachersId) // функція отримання списку даних про студентів по їх ід
        {
            List<TeacherToDisplayViewModel> teachersToDisplay = new List<TeacherToDisplayViewModel>();
            foreach (var teacherId in teachersId)
            {
                var teacherToDisplay = new TeacherToDisplayViewModel();
                var teacher = await db.Teachers.Include(x => x.Person).Include(x => x.Category).Include(x => x.Degree).Include(x => x.Speciality).Include(x => x.Education).FirstOrDefaultAsync(x => x.Id == teacherId);
                if (teacher != null)
                {
                    teacherToDisplay.TeacherId = teacher.Id;
                    teacherToDisplay.CategoryId = teacher.CategoryId;
                    teacherToDisplay.DegreeId = teacher.DegreeId;
                    teacherToDisplay.EducationId = teacher.EducationId;
                    teacherToDisplay.SpecialityId = teacher.SpecialityId;

                    if (teacher.Category != null)
                    {
                        teacherToDisplay.Category = teacher.Category.Description;
                    }
                    if (teacher.Degree != null)
                    {
                        teacherToDisplay.Degree = teacher.Degree.Description;
                    }
                    if (teacher.Education != null)
                    {
                        teacherToDisplay.Education = teacher.Education.Description;
                    }
                    if (teacher.Speciality != null)
                    {
                        teacherToDisplay.Speciality = teacher.Speciality.Description;
                    }

                    if (teacher.Person != null)
                    {
                        teacherToDisplay.PersonId = teacher.Person.Id;
                        teacherToDisplay.Name = teacher.Person.Name;
                        teacherToDisplay.MiddleName = teacher.Person.MiddleName;
                        teacherToDisplay.LastName = teacher.Person.LastName;
                        teacherToDisplay.UserId = teacher.Person.UserId;
                        teacherToDisplay.Address = teacher.Person.Address;
                        teacherToDisplay.Birthday = teacher.Person.Birthday;
                        teacherToDisplay.Base64URL = teacher.Person.Base64URL;

                        var user = await userManager.FindByIdAsync(teacher.Person.UserId);
                        if (user != null)
                        {
                            teacherToDisplay.PhoneNumber = user.PhoneNumber;
                            teacherToDisplay.Email = user.Email;
                        }
                    }
                    teachersToDisplay.Add(teacherToDisplay);
                }

            }
            if (teachersToDisplay.Count > 0)
            {
                return teachersToDisplay;
            }
            return null;
        }
        //[HttpGet("{teacherId:int}")]
        //public async Task<ActionResult<TeacherToDisplayViewModel>> GetFullNameById( int teacherId)
        //{
        //    if (teacherId <= 0)
        //    {
        //        return BadRequest("Teacher id can't be <= 0");
        //    }
        //    var teacher = await db.Teachers.AsNoTracking().FirstOrDefaultAsync(x=> x.Id==teacherId);
        //    if (teacher == null)
        //    {
        //        return NotFound("Teacher not found");
        //    }
        //    var teacherAllData = await GetTeachersAllDataByTeachersId(new List<int> { teacher.Id});
        //    if (teacherAllData != null)
        //    {
        //        TeacherToDisplayViewModel teacherToReturn = teacherAllData.FirstOrDefault();
        //        return new TeacherToDisplayViewModel
        //        {
        //            TeacherId = teacherToReturn.TeacherId,
        //            Name = teacherToReturn.Name,
        //            LastName = teacherToReturn.LastName,
        //            MiddleName = teacherToReturn.MiddleName
        //        };
        //    }
        //    return NotFound("Teacher datas not found");
        //}
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TeacherToDisplayViewModel>>> GetTeachersBySubjectsId([FromQuery] int[] subjectsIdArray)
        {
            if (subjectsIdArray.Count() > 0)
            {
                List<Teacher> teachersList = new List<Teacher>(); // список викладачів, що ведуть ці предмети
                foreach (var subjectId in subjectsIdArray) // перебираю ід усіх предметів
                {
                    var teachersListBySubjectId = await db.TeacherSubjects.Where(x => x.SubjectId == subjectId).Include(x => x.Teacher).ThenInclude(x => x.Person).Select(x => x.Teacher).ToListAsync(); //шукаю усіх викладачів, які можуть вести цей предмет
                    //teachersList = (List<Teacher>)teachersList.Concat(teacherListBySubjectId);
                    foreach (var teacher in teachersListBySubjectId)
                    {
                        teacher.TeacherSubjects.Add(new TeacherSubject { SubjectId = subjectId });
                    }
                    teachersList.AddRange(teachersListBySubjectId);
                }
                if (teachersList.Count > 0)
                {
                    teachersList = teachersList.Distinct().ToList(); //Видаляю можливі дублікати
                    var teachersToDisplay = new List<TeacherToDisplayViewModel>();

                    foreach (var teacher in teachersList)
                    {
                        var teacherToDisplay = new TeacherToDisplayViewModel
                        {
                            TeacherId = teacher.Id,
                            PersonId = (int)teacher.PersonId,
                            Name = teacher.Person.Name,
                            MiddleName = teacher.Person.MiddleName,
                            LastName = teacher.Person.LastName,
                            TeacherSubjects = teacher.TeacherSubjects.ToList(),
                        };
                        teachersToDisplay.Add(teacherToDisplay);
                    }
                    return teachersToDisplay;
                }
                return NotFound(new { error = "No one teacher was found" });

            }

            return NotFound(new { error = "No passing subjects" });
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TeacherCategory>>> GetTeachersCategories()//GetAllTeachersCategories
        {
            return await db.TeacherCategories.ToListAsync();
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TeacherEducation>>> GetTeachersEducations()//GetAllTeachersEducations
        {
            return await db.TeacherEducations.ToListAsync();
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TeacherDegree>>> GetTeachersDegrees()//GetAllTeachersDegrees
        {
            return await db.TeacherDegrees.ToListAsync();
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TeacherSpeciality>>> GetTeachersSpecialities()//GetAllTeachersSpecialities
        {
            return await db.TeacherSpecialities.ToListAsync();
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Teacher>>> GetAll()//GetAllTeachersAsync
        {
            return await db.Teachers.ToListAsync();
        }

        //[HttpGet("{lastName}")]
        //public async Task<ActionResult<IEnumerable<Teacher>>> GetByLastName(string lastName)
        //{
        //    return await db.Teachers.Where(s => s.LastName.Contains(lastName)).ToListAsync();
        //}

        [HttpGet("{teachersSkip}")]
        public async Task<ActionResult<IEnumerable<Teacher>>> GetRangTeachers(int teachersSkip)
        {
            List<Teacher> teachers = await db.Teachers.OrderByDescending(x => x.Id).Skip(teachersSkip).Take(5).ToListAsync();
            if (teachers.Count() > 0)
            {
                return teachers;
            }
            else
            {
                return Ok(false);
            }
        }

        //[HttpGet("{id}")]
        //public async Task<ActionResult<Teacher>> Get(int id)
        //{
        //    var teacher = await db.Teachers.FirstOrDefaultAsync(x => x.Id == id);
        //    if (teacher == null)
        //    {
        //        return NotFound();
        //    }
        //    return Ok(teacher);
        //}

        [HttpDelete("{id}")]
        //[Authorize(Roles = "MainAdmin,Admin")]
        public async Task<ActionResult<Teacher>> Delete(int id)
        {
            Teacher teacher = await db.Teachers.FirstOrDefaultAsync(x => x.Id == id);
            if (teacher == null)
            {
                return NotFound();
            }
            db.Teachers.Remove(teacher);
            await db.SaveChangesAsync();
            return Ok(teacher);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<Subject>>> GetTeacherSubjectsById(int id)
        {
            var teacherSubjectsId = await db.TeacherSubjects.Where(x => x.TeacherId == id).Select(x => x.SubjectId).Distinct().ToListAsync(); // можливі повтори!!!
            if (teacherSubjectsId != null)
            {
                var subjects = new List<Subject>();
                foreach (var subjectId in teacherSubjectsId)
                {
                    subjects.Add(await db.Subjects.FirstOrDefaultAsync(x => x.Id == subjectId));
                }
                return Ok(subjects);
            }
            return NotFound();
        }
        [HttpGet("{userId}")]
        public async Task<ActionResult<IEnumerable<Subject>>> GetTeacherSubjectsByUserId(string userId)
        {
            var teacher = await db.Teachers.Include(x => x.Person).FirstOrDefaultAsync(x => x.Person.UserId == userId);
            if (teacher == null)
            {
                return NotFound("Teacher not found");
            }
            var teacherSubjectsId = await db.TeacherSubjects.Where(x => x.TeacherId == teacher.Id).Select(x => x.SubjectId).Distinct().ToListAsync(); // можливі повтори!!!
            if (teacherSubjectsId != null)
            {
                var subjects = new List<Subject>();
                foreach (var subjectId in teacherSubjectsId)
                {
                    subjects.Add(await db.Subjects.FirstOrDefaultAsync(x => x.Id == subjectId));
                }
                return Ok(subjects);
            }
            return NotFound();
        }
        [HttpGet("{userId}")]
        public async Task<ActionResult<IEnumerable<Subgroup>>> GetTeacherSubgroupsByUserId(string userId)
        {
            try
            {
                var teacher = await db.Teachers.Include(x => x.Person).FirstOrDefaultAsync(x => x.Person.UserId == userId);
                if (teacher == null)
                {
                    return NotFound("Teacher not found");
                }
                GroupController groupController = new GroupController(db);
                var allcurrentYearGroups = await groupController.GetAllGroupsOfCurrentStudyYear(); // усі групи тепершінього навчального року
                if (allcurrentYearGroups != null)
                {
                    var allGroups = allcurrentYearGroups.Value.ToList();
                    if (allGroups.Count > 0)
                    {
                        //var subgroups = allGroups.Select(x=> x.DefSubgroupId); // ід усіх дефолтних підгруп
                        var subgroupsToView = new List<Subgroup>();
                        foreach (var group in allGroups) // для кожно
                        {
                            var subgroups = await db.Subgroups.AsNoTracking().Where(x => x.GroupId == group.Id).ToListAsync();// шукаю усі підгрупи групи
                            foreach (var subgroup in subgroups) // перебираю усі підгрупи щоб знайти в яких веде викладач
                            {
                                var teacherSubgroup = await db.TeacherSubgroupDistributions.AsNoTracking().FirstOrDefaultAsync(x => x.SubgroupId == subgroup.Id); // шукаю чи викладач веде предмети в цій підгрупі
                                if (teacherSubgroup != null) //якщо так
                                {
                                    if (subgroup.Id == group.DefSubgroupId)// якщо це дефолтна підгрупа групи
                                    {
                                        subgroup.Title = group.Title; // назва = назві групи
                                    }
                                    subgroupsToView.Add(subgroup);
                                }
                            }
                        }
                        if (subgroupsToView.Count > 0)
                        {
                            subgroupsToView = subgroupsToView.OrderBy(x=> x.Id).ToList();
                            return Ok(subgroupsToView);
                        }
                        else
                        {
                            return NotFound("No one group (this teacher have lessons) found");
                        }
                    }
                    else
                    {
                        return NotFound("No one group of current study year found");
                    }
                }
                else
                {
                    return NotFound("No one group of current study year found");
                }
            }
            catch(Exception e)
            {
                return StatusCode(500,e.Message);
            }
        }
        [HttpGet("{details}")]
        public async Task<ActionResult<IEnumerable<Subgroup>>> GetTeacherSubgroupsByTeacherSubject(string userId, int subjectId) // список груп, у яких викладач веде обраний предмет
        {
            try
            {
                if (subjectId <=0)
                {
                    return BadRequest("SubjectId can't be <= 0");
                }
                var teacher = await db.Teachers.Include(x => x.Person).FirstOrDefaultAsync(x => x.Person.UserId == userId);
                if (teacher == null)
                {
                    return NotFound("Teacher not found");
                }
                GroupController groupController = new GroupController(db);
                var allcurrentYearGroups = await groupController.GetAllGroupsOfCurrentStudyYear(); // усі групи тепершінього навчального року
                if (allcurrentYearGroups != null)
                {
                    var allGroups = allcurrentYearGroups.Value.ToList();
                    if (allGroups.Count > 0)
                    {
                        //var subgroups = allGroups.Select(x=> x.DefSubgroupId); // ід усіх дефолтних підгруп
                        var subgroupsToView = new List<Subgroup>();
                        foreach (var group in allGroups) // для кожно
                        {
                            var subgroups = await db.Subgroups.AsNoTracking().Where(x => x.GroupId == group.Id).ToListAsync();// шукаю усі підгрупи групи
                            foreach (var subgroup in subgroups) // перебираю усі підгрупи щоб знайти в яких веде викладач
                            {
                                var teacherSubgroup = await db.TeacherSubgroupDistributions.AsNoTracking().FirstOrDefaultAsync(x => x.SubgroupId == subgroup.Id && x.SubjectId==subjectId); // шукаю чи викладач веде предмети в цій підгрупі
                                if (teacherSubgroup != null) //якщо так
                                {
                                    if (subgroup.Id == group.DefSubgroupId)// якщо це дефолтна підгрупа групи
                                    {
                                        subgroup.Title = group.Title; // назва = назві групи
                                    }
                                    subgroupsToView.Add(subgroup);
                                }
                            }
                        }
                        if (subgroupsToView.Count > 0)
                        {
                            subgroupsToView = subgroupsToView.OrderBy(x => x.Id).ToList();
                            return Ok(subgroupsToView);
                        }
                        else
                        {
                            return NotFound("No one group (this teacher have lessons) found");
                        }
                    }
                    else
                    {
                        return NotFound("No one group of current study year found");
                    }
                }
                else
                {
                    return NotFound("No one group of current study year found");
                }
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }
        [HttpPost]
            public async Task<ActionResult> CreateLogin(CreateLoginViewModel model)
            {
                GeneratorService generatorService = new GeneratorService(userManager);
                string Login = await generatorService.GenerateNewLogin(model.Name); // генерація логіну
                Teacher teacher = await db.Teachers.FirstOrDefaultAsync(x => x.Id == model.Id);
                if (teacher != null)
                {
                    // teacher.Login = Login;
                    db.Teachers.Update(teacher);
                    await db.SaveChangesAsync();
                    return Ok(teacher);
                }
                else
                {
                    return NotFound();
                }
            }

            [HttpPost]
            public async Task<ActionResult> SendFeedback(SendFeedbackViewModel model)
            {

                Subject subject = await db.Subjects.FirstOrDefaultAsync(x => x.Id == model.SubjectId);
                Teacher teacher = await db.Teachers.FirstOrDefaultAsync(x => x.Id == model.TeacherId);
                Student student = await db.Students.FirstOrDefaultAsync(x => x.Id == model.StudentId);
                Feedback feedback = new Feedback
                {
                    IsRead = false,
                    DataPublication = model.DataPublication,
                    MainInformation = model.MainInformation,
                    SubjectId = model.SubjectId,
                    Subject = subject,
                    TeacherId = model.TeacherId,
                    Teacher = teacher,
                };
                db.Feedback.Add(feedback);
                StudentFeedback studentFeedback = new StudentFeedback
                {
                    Feedback = feedback,
                    FeedbackId = feedback.Id,
                    Student = student,
                    StudentId = student.Id
                };
                db.StudentFeedback.Add(studentFeedback);
                await db.SaveChangesAsync();
                return Ok();
            }
        }
    }
