using DailyDiary.Models;
using DailyDiary.Models.ViewModels;
using DailyDiary.Models.ViewModels.Student;
using Microsoft.AspNetCore.Authorization;
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
    public class StudentController : Controller
    {
        private readonly DailyDiaryDatasContext db;

        public StudentController(DailyDiaryDatasContext datasContext)
        {
            this.db = datasContext;
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

                        student.Password = model.Password;
                        student.Login = model.Login;
                        student.Email = model.Email;
                        student.Name = model.Name;
                        student.LastName = model.LastName;
                        student.Birthday = model.Birthday;
                        student.Age = model.Age;
                        student.StudyYear = model.StudyYear;
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
                Student student = await db.Students.FirstOrDefaultAsync(x => x.StudentId == model.Id);
                if (student == null)
                {
                    string Login = Services.GeneratorService.GenerateNewLogin(model.LastName);
                    string Password = Services.GeneratorService.GenerateNewPassword();
                    Group group = null;
                    Subgroup subgroup = null;
                    if (model.GroupId != 0)
                    {
                        group = await db.Groups.FirstOrDefaultAsync(x => x.Id == model.GroupId);
                    }
                    if (model.SubgroupId != 0)
                    {
                        subgroup = await db.Subgroups.FirstOrDefaultAsync(x => x.Id == model.SubgroupId);
                    } 

                    student = new Student
                    {
                        Name = model.Name,
                        LastName = model.LastName,
                        Birthday = model.Birthday,
                        AdmissionDate = model.AdmissionDate,
                        Login = Login,
                        Password = Password,
                        Email = model.Email,
                        //GroupId = model.GroupId,
                        //Group = group,
                        //SubgroupId = model.SubgroupId,
                        //Subgroup = subgroup,
                        Age = model.Age,
                        StudyYear = model.StudyYear,
                        Order = db.Students.Count() + 1
                    };
                    Services.MailService.SendLoginAndPassword(Login, Password, model.Email);
                    db.Students.Add(student);
                    await db.SaveChangesAsync();
                    return Ok();
                }
                else
                {
                    return NotFound(new { error = "Student exist" });
                }
            }
            return BadRequest();
        }

        [HttpDelete("{id}")]
        /*[Authorize(Roles = "MainAdmin,Admin")]*/
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
        public async Task<ActionResult<Subgroup>> GetStudentSubgroupByIdAsync(int id)//GetStudentSubgroupsByStudentIdAsync
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
                foreach(var feedback in feedbacks)
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
            if(stuent != null)
            {
                int count = 0;
                List<Feedback> feedbacks = new List<Feedback>();
                List<int> studentsFeedbackIds = await db.StudentFeedback.Where(x => x.StudentId == StudentId).Select(x => x.FeedbackId).ToListAsync();
                foreach(var studentsFeedbackId in studentsFeedbackIds)
                {
                    feedbacks.Add(await db.Feedback.FirstOrDefaultAsync(x => x.Id == studentsFeedbackId));
                }
                if(feedbacks.Count > 0)
                {
                    foreach(var feedback in feedbacks)
                    {
                        if(feedback.IsRead == false)
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
            if(students.Count > 0)
            {
                return Ok(students);
            }
            return NotFound();
        }

        [HttpPost]
        public async Task<ActionResult<bool>> IsReadAllStudentFeedbacks()
        {
            var feedbacks = await db.Feedback.ToListAsync();
            foreach(var feedback in feedbacks)
            {
                if(feedback.IsRead == false)
                {
                    feedback.IsRead = true;
                }
            }
            await db.SaveChangesAsync();
            return Ok(true);
        }
    }
}
