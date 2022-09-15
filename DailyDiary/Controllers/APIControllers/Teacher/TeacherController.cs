using DailyDiary.Models;
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

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Teacher>>> Get()//GetAllTeachersAsync
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

        [HttpGet("{id}")]
        public async Task<ActionResult<Teacher>> Get(int id)
        {
            var teacher = await db.Teachers.FirstOrDefaultAsync(x => x.Id == id);
            if (teacher == null)
            {
                return NotFound();
            }
            return Ok(teacher);
        }

        //[HttpPost]
        //public async Task<IActionResult> CreateNew(NewTeacherViewModel model)
        //{
        //    if (ModelState.IsValid)
        //    {
        //        try
        //        {
        //            //string Password = Services.GeneratorService.CreatePassword(12, model.LastName);       
        //            if (model != null)
        //            {
        //                if (model.Rate < 0 || model.Experience < 0 || model.Age <= 0)
        //                {
        //                    return BadRequest(new { error = "Vrong values" });
        //                }
        //                if (await userManager.FindByEmailAsync(model.Email) != null) // перевірка чи іcнує такий е-mail
        //                {
        //                    throw new Exception("Email already registered");
        //                    //return BadRequest(new { error = "Email already registered" });
        //                }
        //                GeneratorService generatorService = new GeneratorService(userManager);
        //                string password = await generatorService.GenerateNewLogin(model.LastName); // генерація логіну  
        //                string login = generatorService.CreatePassword();
        //                User user = new User
        //                {
        //                    Email = model.Email,
        //                    UserName = login,
        //                    //Teacher = teacher,
        //                    //Student = null,
        //                    TgNickName = model.TgNickName,
        //                    PhoneNumber = model.PhoneNumber
        //                };

        //                Teacher teacher = new Teacher
        //                {
        //                    Name = model.Name,
        //                    LastName = model.LastName,
        //                    Birthday = model.Birthday,
        //                    Specialty = model.Specialty,
        //                    Category = model.Category,
        //                    Degree = model.Degree,
        //                    Education = model.Education,
        //                    Experience = model.Experience,
        //                    Salary = model.Salary,
        //                    Base64URL = model.Base64URL,
        //                    //Email = model.Email,
        //                    Rate = model.Rate,
        //                    // Login = Login,
        //                    //Passsword = Password
        //                };

        //                try
        //                {
        //                    var result = await userManager.CreateAsync(user, password);
        //                    if (result.Succeeded)
        //                    {
        //                        await userManager.AddToRoleAsync(user, "Teacher");
        //                        //Services.MailService.SendLoginAndPassword(Login, Password, model.Email);
        //                        db.Teachers.Add(teacher);
        //                        await db.SaveChangesAsync();
        //                        return Ok(teacher);
        //                    }
        //                    else
        //                    {
        //                        Console.WriteLine(result.Errors);
        //                    }
        //                }
        //                catch (Exception ex)
        //                {
        //                    Console.WriteLine(ex.Message);
        //                }
        //            }
        //        }
        //        catch (Exception ex)
        //        {
        //            Console.WriteLine(ex.Message);
        //        }
        //        return BadRequest();
        //    }

        //    return BadRequest(ModelState);
        //}

        //[HttpPost]
        //public async Task<IActionResult> Edit(TeacherViewModel model)
        //{
        //    if (ModelState.IsValid)
        //    {
        //        if (model != null)
        //        {

        //            var teacer = await db.Teachers.FirstOrDefaultAsync(x => x.TeacherId == model.Id);
        //            if (teacer != null)
        //            {

        //                teacer.Name = model.Name;
        //                teacer.LastName = model.LastName;
        //                teacer.Birthday = model.Birthday;
        //                teacer.Specialty = model.Specialty;
        //                teacer.Category = model.Category;
        //                teacer.Degree = model.Degree;
        //                teacer.Education = model.Education;
        //                teacer.Experience = model.Experience;
        //                teacer.Salary = model.Salary;
        //                teacer.Rate = model.Rate;
        //                //teacer.Login = model.Login;
        //                //teacer.Email = model.Email;

        //                db.Teachers.Update(teacer);
        //                await db.SaveChangesAsync();
        //                return Ok(teacer);
        //            }
        //            else
        //            {
        //                return BadRequest();
        //            }
        //        }
        //    }

        //    return BadRequest(ModelState);
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

        //[HttpGet("{id}")]
        //public async Task<ActionResult<IEnumerable<Group>>> GetTeacherGroupsById(int id)
        //{
        //    List<Group> groups = new List<Group>();
        //    var teacherGroups = await db.TeacherGroups.Where(x => x.TeacherId == id).Select(x => x.GroupId).ToListAsync(); // можливі повтори!!!
        //    if (teacherGroups.Count != 0)
        //    {
        //        foreach (var teacherGroup in teacherGroups)
        //        {
        //            groups.Add(await db.Groups.FirstOrDefaultAsync(x => x.Id == teacherGroup));
        //        }
        //        return Ok(groups);
        //    }
        //    return NotFound(new { error = "Teacher's groups not found" });
        //}

        //[HttpPost]
        //public async Task<ActionResult> AddBase64(Base64ViewModel model)
        //{
        //    Teacher teacher = await db.Teachers.FirstOrDefaultAsync(x => x.TeacherId == model.Id);
        //    if (teacher != null)
        //    {
        //        teacher.Base64URL = model.Base64URL;
        //        await db.SaveChangesAsync();
        //        return Ok();
        //    }
        //    else
        //    {
        //        return NotFound();
        //    }
        //}

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
        [HttpGet]
       public async Task<ActionResult<IEnumerable<Teacher>>> GetTeachersBySubjectsId([FromQuery] int[] subjectsIdArray)
        {
            if (subjectsIdArray.Count()>0)
            {
                List<Teacher> teachersList = new List<Teacher>(); // список усіх викладачів
                foreach (var subjectId in subjectsIdArray) // перебираю ід усіх предметів
                {
                    var teachersListBySubjectId = await db.TeacherSubjects.Where(x => x.SubjectId == subjectId).Select(x=> x.Teacher).ToListAsync(); //шукаю усіх викладачів, які можуть вести цей предмет
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
                    return teachersList;
                }
                return NotFound(new { error = "No one teacher was found" });

            }

            return NotFound(new { error = "No passing subjects"});
        }
    }
}
