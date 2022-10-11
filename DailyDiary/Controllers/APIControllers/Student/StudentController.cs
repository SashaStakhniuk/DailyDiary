using DailyDiary.Models;
using DailyDiary.Models.ViewModels;
using DailyDiary.Models.ViewModels.Student;
using DailyDiary.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DailyDiary.Controllers.APIControllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class StudentController : Controller
    {
        private readonly DailyDiaryDatasContext db;
        private readonly UserManager<User> userManager;
        private readonly SignInManager<User> signInManager;
        private readonly RoleManager<IdentityRole> roleManager;
        public StudentController(DailyDiaryDatasContext datasContext,
            UserManager<User> userManager,
            SignInManager<User> signInManager,
            RoleManager<IdentityRole> roleManager
            )
        {
            this.db = datasContext;
            this.userManager = userManager;
            this.signInManager = signInManager;
            this.roleManager = roleManager;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Student>>> Get()
        {
            return await db.Students.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Student>> Get(int id)
        {
            var student = await db.Students.FirstOrDefaultAsync(x => x.StudentId == id);
            if (student == null)
            {
                return NotFound();
            }
            return Ok(student);
        }

        [HttpGet("{studentsSkip}")]
        public ActionResult<IEnumerable<Student>> GetRangStudents(int studentsSkip)
        {
            List<Student> result = db.Students.OrderByDescending(x => x.StudentId).Skip(studentsSkip).Take(5).ToList();
            if (result.Count() > 0)
            {
                return result;
            }
            else
            {
                return Ok(false);
            }
        }

        [HttpPost]
        public async Task<ActionResult> AddBase64(Base64ViewModel model)
        {
            Student student = await db.Students.FirstOrDefaultAsync(x => x.StudentId == model.Id);
            if (student != null)
            {
                student.Base64URL = model.Base64URL;
                await db.SaveChangesAsync();
                return Ok();
            }
            return Ok();
        }

        [HttpGet("{lastName}")]
        public async Task<ActionResult<IEnumerable<Student>>> GetByName(string lastName)
        {
            if (lastName == null)
            {
                return await db.Students.ToListAsync();
            }
            return await db.Students.Where(s => s.LastName.Contains(lastName)).ToListAsync();
        }

        [HttpPost]
        public async Task<IActionResult> Edit(StudentViewModel model)
        {
            if (ModelState.IsValid)
            {
                if (model != null)
                {
                    var student = await db.Students.FirstOrDefaultAsync(x => x.StudentId == model.Id);
                    if (student != null)
                    {
                        Group group = await db.Groups.FirstOrDefaultAsync(x => x.Id == model.GroupId);
                        Subgroup subgroup = await db.Subgroups.FirstOrDefaultAsync(x => x.Id == model.SubgroupId);

                        //student.Password = model.Password;
                        //student.Login = model.Login;
                        //student.Email = model.Email;

                        student.Name = model.Name;
                        student.LastName = model.LastName;
                        student.Birthday = model.Birthday;
                        student.Age = model.Age;
                        student.YearOfStudy = model.StudyYear;
                        student.GroupId = model.GroupId;
                        student.Group = group;
                        student.Subgroup = subgroup;
                        student.SubgroupId = model.SubgroupId;
                        student.AdmissionDate = model.AdmissionDate;

                        db.Students.Update(student);
                        await db.SaveChangesAsync();
                        return Ok();

                    }
                    return Ok(student);
                }
            }
            return BadRequest(ModelState);
        }

        [HttpPost]
        public async Task<IActionResult> CreateNew(NewStudentViewModel model)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    if (await userManager.FindByEmailAsync(model.Email) != null) // перевірка чи іcнує такий е-mail
                    {
                        throw new Exception("Email already registered");
                        //return BadRequest(new { error = "Email already registered" });
                    }
                    GeneratorService generatorService = new GeneratorService(userManager);
                    string _login = await generatorService.GenerateNewLogin(model.LastName); // генерація логіну
                                                                                             //string _password = GeneratorService.CreatePassword(12, model.LastName); // генерація паролю
                    string _password = generatorService.CreatePassword(); // генерація паролю
                    User user = new User
                    {
                        Email = model.Email,
                        UserName = _login,
                        //Name = model.Name,
                        //LastName = model.LastName,
                        //MiddleName = model.MiddleName,
                        TgNickName = model.TgNickName,
                        PhoneNumber = model.PhoneNumber
                        //PhoneNumber = System.Text.RegularExpressions.Regex.IsMatch(model.PhoneNumber, @"^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$")? model.PhoneNumber:null // валідація номеру
                    };
                    var result = await userManager.CreateAsync(user, _password);
                    if (result.Succeeded)
                    {
                        await userManager.AddToRoleAsync(user, "Student");

                        Group group = null;
                        int order = db.Students.Count() + 1; //для сортировки студента
                        if (model.GroupId != 0)
                        {
                            group = await db.Groups.FirstOrDefaultAsync(x => x.Id == model.GroupId); // шукаємо групу
                            if (group == null)
                            {
                                return BadRequest(new { error = "Group not found"});
                            }
                        }

                        db.Students.Add(new Student
                        {
                            //User = user,
                            Name = model.Name,
                            LastName = model.LastName,
                            Birthday = model.Birthday,
                            Age = model.Age,
                            AdmissionDate = model.AdmissionDate,
                            YearOfStudy = model.YearOfStudy,
                            Group = group,
                            Order = order
                        });
                        await db.SaveChangesAsync();
                        return Ok();
                    }
                    else
                    {
                        foreach (var error in result.Errors)
                        {
                            ModelState.AddModelError("", error.Description);
                        }
                        return BadRequest(ModelState);
                    }
                       
                }
                catch (Exception ex)
                {
                    //Console.WriteLine(ex.Message);
                    return BadRequest(new { error = ex.Message });
                }
            }
            return BadRequest(ModelState);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Student>> Delete(int id)
        {
            Student student = await db.Students.FirstOrDefaultAsync(x => x.StudentId == id);
            if (student == null)
            {
                return NotFound();
            }
            db.Students.Remove(student);
            await db.SaveChangesAsync();
            return Ok(student);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Group>> GetStudentGroupByIdAsync(int id)//GetStudentGroupByIdAsync
        {
            var student = await db.Students.FirstOrDefaultAsync(x => x.StudentId == id);
            if (student != null)
            {
                var group = await db.Groups.FirstOrDefaultAsync(x => x.Id == student.GroupId);
                if (group != null)
                {
                    return Ok(group);
                }
                else
                {
                    return NotFound(new { error = "Group not found" });
                }
            }
            return NotFound(new { error = "Student not found" });
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Subgroup>> GetStudentSubgroupByIdAsync(int id)
        {
            var student = await db.Students.FirstOrDefaultAsync(x => x.StudentId == id);

            if (student != null)
            {
                var subgroup = await db.Subgroups.FirstOrDefaultAsync(x => x.Id == student.SubgroupId);
                if (subgroup != null)
                {
                    return Ok(subgroup);
                }
                else
                {
                    return NotFound(new { error = "Subgroup not found" });
                }
            }
            return NotFound(new { error = "Student not found" });
        }

        [HttpGet("{StudentId}/{feedbackSkip}")]
        public async Task<ActionResult<IEnumerable<Feedbackinfo>>> GetRangStudentFeedbackById(int StudentId, int feedbackSkip)
        {
            List<Feedback> feedbacks = new List<Feedback>();
            List<Feedbackinfo> feedbackinfos = new List<Feedbackinfo>();
            var studentFeedbacks = await db.StudentFeedback.Where(x => x.StudentId == StudentId).Select(x => x.FeedbackId).ToListAsync();
            if (studentFeedbacks.Count != 0)
            {
                foreach (var studentFeedback in studentFeedbacks)
                {
                    feedbacks.Add(await db.Feedback.FirstOrDefaultAsync(x => x.Id == studentFeedback));
                }
                foreach (var feedback in feedbacks)
                {
                    Subject subject = await db.Subjects.FirstOrDefaultAsync(x => x.Id == feedback.SubjectId);
                    Teacher teacher = await db.Teachers.FirstOrDefaultAsync(x => x.TeacherId == feedback.TeacherId);
                    Feedbackinfo feedbackinfo = new Feedbackinfo { MainInformation = feedback.MainInformation, IsRead = feedback.IsRead, DataPublication = feedback.DataPublication, SubjectTitle = subject.Title, TeacherName = teacher.Name, TeacherLastName = teacher.LastName };
                    feedbackinfos.Add(feedbackinfo);
                }
                if (feedbackinfos.Count() > 0)
                {
                    var takeFeedback = feedbackinfos.Count();
                    return Ok(feedbackinfos.OrderByDescending(f => f.Id).Skip(feedbackSkip).Take(takeFeedback).ToList());
                }
                else
                {

                    return Ok(false);
                }
            }
            return NotFound(new { error = "Student's groups not found" });
        }


        [HttpGet("{StudentId}")]
        public async Task<ActionResult<int>> GetNotreadFeedback(int StudentId)
        {
            Student stuent = await db.Students.FirstOrDefaultAsync(x => x.StudentId == StudentId);
            if (stuent != null)
            {
                int count = 0;
                List<Feedback> feedbacks = new List<Feedback>();
                List<int> studentsFeedbackIds = await db.StudentFeedback.Where(x => x.StudentId == StudentId).Select(x => x.FeedbackId).ToListAsync();
                foreach (var studentsFeedbackId in studentsFeedbackIds)
                {
                    feedbacks.Add(await db.Feedback.FirstOrDefaultAsync(x => x.Id == studentsFeedbackId));
                }
                if (feedbacks.Count > 0)
                {
                    foreach (var feedback in feedbacks)
                    {
                        if (feedback.IsRead == false)
                        {
                            count++;
                        }
                    }
                    return Ok(count);
                }
            }
            return NotFound();
        }

        [HttpGet("{GroupId}")]
        public async Task<ActionResult<IEnumerable<Student>>> GetStudentsByGroupId(int GroupId)
        {
            var students = await db.Students.Where(x => x.GroupId == GroupId).ToListAsync();
            if (students.Count > 0)
            {
                return Ok(students);
            }
            return NotFound();
        }

        [HttpPost]
        public async Task<ActionResult<bool>> IsReadAllStudentFeedbacks()
        {
            var feedbacks = await db.Feedback.ToListAsync();
            foreach (var feedback in feedbacks)
            {
                if (feedback.IsRead == false)
                {
                    feedback.IsRead = true;
                }
            }
            await db.SaveChangesAsync();
            return Ok(true);
        }
    }
}
