using DailyDiary.Models;
using DailyDiary.Models.DbModels;
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
        //private readonly SignInManager<User> signInManager;
        //private readonly RoleManager<IdentityRole> roleManager;
        public StudentController(DailyDiaryDatasContext datasContext,
            UserManager<User> userManager
            //SignInManager<User> signInManager,
            //RoleManager<IdentityRole> roleManager
            )
        {
            this.db = datasContext;
            this.userManager = userManager;
            //this.signInManager = signInManager;
            //this.roleManager = roleManager;
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<StudentToDisplayViewModel>>> GetAllAsync()
        {
            try
            {
                GroupController gc = new GroupController(db);
                var allGroupsOfCurrentStudyYear = await gc.GetAllGroupsOfCurrentStudyYear();
                if (allGroupsOfCurrentStudyYear == null || allGroupsOfCurrentStudyYear.Value.Count() <= 0)
                {
                    return NotFound("No one student of current study year found");
                }
                var groups = allGroupsOfCurrentStudyYear.Value.ToList();
                var studentsIdBySubgroup = new List<int>();
                foreach (var group in groups)
                {
                    var studentsId = await db.StudentsBySubgroups.AsNoTracking()
                   .Where(x=> x.SubgroupId==group.DefSubgroupId).Select(x=> x.StudentId).ToListAsync();// ід студентів із усіх груп теперішнього навчального року
                    if(studentsId.Count > 0)
                    {
                        studentsIdBySubgroup.AddRange(studentsId);
                    }
                }
              
                if (studentsIdBySubgroup.Count<=0)
                {
                    return NotFound("No one student found");
                }
                var students = await GetStudentsAllDataByStudentsId(studentsIdBySubgroup);

                if (students != null)
                {
                    return students;
                }
                else
                {
                    return NotFound("Students datas not found");
                }
            }
            catch (Exception e)
            {
                return StatusCode(500,e.Message);
            }
        }
        [HttpGet("{userId}")]
        //[ValidateAntiForgeryToken]
        public async Task<ActionResult<int>> GetStudentIdByUserId(string userId)
        {
            try
            {
                var student = await db.Students.Include(x => x.Person).FirstOrDefaultAsync(x => x.Person.UserId == userId);
                if (student != null)
                {
                    return Ok(student.Id);
                }
                return NotFound("Student not found");
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
            //return student == null ? NotFound("Student not found") : Ok(student.Id);
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<Student>> Get(int id) // отримати студента по ід
        {
            var student = await db.Students.FirstOrDefaultAsync(x => x.Id == id);
            if (student == null)
            {
                return NotFound();
            }
            return Ok(student);
        }
        private async Task<List<StudentToDisplayViewModel>> GetStudentsAllDataByStudentsId(List<int> studentsId) // функція отримання списку даних про студентів по їх ід
        {
            List<StudentToDisplayViewModel> studentsToDisplay = new List<StudentToDisplayViewModel>();
            foreach (var studentId in studentsId)
            {
                var studentToDisplay = new StudentToDisplayViewModel();
                var subgroup = await db.StudentsBySubgroups.Include(x => x.Subgroup).ThenInclude(x => x.Group).Where(x => x.StudentId == studentId).Select(x=> x.Subgroup).FirstOrDefaultAsync();
                if (subgroup != null)
                {
                    subgroup.Id = subgroup.Group.Id;
                    subgroup.Title = subgroup.Group.Title;
                    studentToDisplay.GroupId = subgroup.Group.Id;
                    studentToDisplay.GroupTitle = subgroup.Group.Title;
                }

                var student = await db.Students.Include(x => x.Person).FirstOrDefaultAsync(x => x.Id == studentId);
                if (student != null)
                {
                    studentToDisplay.StudentId = student.Id;
                    studentToDisplay.AdmissionDate = student.AdmissionDate;
                    studentToDisplay.AdditionalInfo = student.AdditionalInfo;

                    if (student.Person != null)
                    {
                        studentToDisplay.PersonId = student.Person.Id;
                        studentToDisplay.Name = student.Person.Name;
                        studentToDisplay.MiddleName = student.Person.MiddleName;
                        studentToDisplay.LastName = student.Person.LastName;
                        studentToDisplay.UserId = student.Person.UserId;
                        studentToDisplay.Address = student.Person.Address;
                        studentToDisplay.Birthday = student.Person.Birthday;
                        studentToDisplay.Base64URL = student.Person.Base64URL;

                        var user = await userManager.FindByIdAsync(student.Person.UserId);
                        if (user != null)
                        {
                            studentToDisplay.PhoneNumber = user.PhoneNumber;
                            studentToDisplay.Email = user.Email;
                        }
                    }
                    studentsToDisplay.Add(studentToDisplay);
                }

            }
            if (studentsToDisplay.Count > 0)
            {
                return studentsToDisplay;
            }
            return null;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<StudentToDisplayViewModel>>> GetAllStudentsWithoutGroupThisStudyYear() //отримання списку студентів теперішнього року навчання, які ще не розподілені по групах
        {
            var allStudentsId = await db.Students.Select(x => x.Id).ToListAsync();
            if (allStudentsId == null)
            {
                return NotFound("No one student found.");
            }

            StudyPlanController studyPlanController = new StudyPlanController(db);
            var currentYearStudyPlansId = await studyPlanController.GetAllStudyPlansIdOfCurrentStudyYear(); // усі навчальні плани теперішнього навчального року
            if (currentYearStudyPlansId == null)
            {
                return NotFound("No one study plan exist for current study year. Students doesn't distributed by groups.");
            }
            var studyPlansId = currentYearStudyPlansId.ToList();
            List<int> defSubgroupsId = new List<int>(); // ід підгруп, де знаходяться студенти груп
            foreach (var studyPlanId in studyPlansId)
            {
                List<int> subgroupsIdToAdd = await db.Groups.Where(x => x.StudyPlanId == studyPlanId).Select(x => x.DefSubgroupId).ToListAsync();//всі підгрупи, де навчальний план = навчальному плану групи
                if (subgroupsIdToAdd != null)
                {
                    defSubgroupsId.AddRange(subgroupsIdToAdd);
                }
            }
            if (defSubgroupsId.Count == 0) // якщо не існує підгруп
            {
                return NotFound("No one subgroup found.");
            }
            List<int> studentsInGroupId = new List<int>(); // ід студентів, розподілених по групах

            foreach (var subgroupId in defSubgroupsId)
            {
                List<int> studentsId = await db.StudentsBySubgroups.Where(x => x.SubgroupId == subgroupId).Select(x => x.StudentId).ToListAsync();// ід студентів по підгрупі
                if (studentsId != null)
                {
                    studentsInGroupId.AddRange(studentsId);
                }
            }

            //List<StudentToDisplayViewModel> studentsToDisplay = new List<StudentToDisplayViewModel>();
            if (studentsInGroupId.Count > 0)// якщо розподілені по групах студенти існують 
            {
                allStudentsId = allStudentsId.Except(studentsInGroupId).ToList(); // список ід студентів, яким не назначена група
            }
            if (allStudentsId.Count == 0)
            {
                return NotFound("All students distributed by groups");
            }
            //foreach (var studentId in allStudentsId)
            //{
            //    var studentToDisplay = new StudentToDisplayViewModel();
            //    var student = await db.Students.Include(x => x.Person).FirstOrDefaultAsync(x => x.Id == studentId);
            //    if (student != null)
            //    {
            //        studentToDisplay.StudentId = student.Id;
            //        studentToDisplay.AdmissionDate = student.AdmissionDate;
            //        studentToDisplay.AdditionalInfo = student.AdditionalInfo;

            //        if (student.Person != null)
            //        {
            //            studentToDisplay.PersonId = student.Person.Id;
            //            studentToDisplay.Name = student.Person.Name;
            //            studentToDisplay.MiddleName = student.Person.MiddleName;
            //            studentToDisplay.LastName = student.Person.LastName;
            //            studentToDisplay.UserId = student.Person.UserId;
            //            studentToDisplay.Address = student.Person.Address;
            //            studentToDisplay.Birthday = student.Person.Birthday;
            //            studentToDisplay.Base64URL = student.Person.Base64URL;

            //            var user = await userManager.FindByIdAsync(student.Person.UserId);
            //            if (user != null)
            //            {
            //                studentToDisplay.PhoneNumber = user.PhoneNumber;
            //                studentToDisplay.Email = user.Email;
            //            }
            //        }
            //        studentsToDisplay.Add(studentToDisplay);
            //    }

            //}
            //if (studentsToDisplay.Count > 0)
            //{
            //    return studentsToDisplay;
            //}
            var studentsData = await GetStudentsAllDataByStudentsId(allStudentsId);
            if (studentsData != null)
            {
                return studentsData;
            }
            return NotFound("No one student information found");
        }

        [HttpGet("{groupId}")]
        public async Task<ActionResult<IEnumerable<StudentToDisplayViewModel>>> GetAllByGroupId(int groupId)
        {
            try
            {
                if (groupId <= 0)
                {
                    return BadRequest("GroupId should be >= 0");
                }
                var group = await db.Groups.FirstOrDefaultAsync(x => x.Id == groupId);
                if (group == null)
                {
                    return NotFound("Group not found");
                }
                var subgroupId = await db.Subgroups.Where(x => x.Id == group.DefSubgroupId).Select(x => x.Id).FirstOrDefaultAsync(); // шукаю ід підгрупи, де знаходяться усі студенти
                if (subgroupId == 0)
                {
                    return NotFound("Default subgroup not found");
                }
                var studentsIdBySubgroup = await db.StudentsBySubgroups.Where(x => x.SubgroupId == subgroupId).Select(x => x.StudentId).ToListAsync(); // ід студентів що навчаються в групі
                if (studentsIdBySubgroup == null)
                {
                    return NotFound("No one student found");
                }
                var students = await GetStudentsAllDataByStudentsId(studentsIdBySubgroup);

                if (students != null)
                {
                    return students;
                }
                else
                {
                    return NotFound("Students datas not found");
                }
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        [HttpGet("{subgroupId}")]
        public async Task<ActionResult<IEnumerable<StudentToDisplayViewModel>>> GetAllBySubroupId(int subgroupId)
        {
            try
            {
                if (subgroupId <= 0) // якщо ід підгрупи <=0
                {
                    return BadRequest("Subgroup id should be >= 0");
                }
                var subgroup = await db.Subgroups.FirstOrDefaultAsync(x => x.Id == subgroupId);// шукаю підгрупу
                if (subgroup == null) // якщо не існує
                {
                    return NotFound("Subgroup not found");
                }
                var studentsIdBySubgroup = await db.StudentsBySubgroups.Where(x => x.SubgroupId == subgroupId).Select(x => x.StudentId).ToListAsync(); // всі ід студентів з підгрупи
                if (studentsIdBySubgroup == null || studentsIdBySubgroup.Count == 0) // якщо немає ніодного запису
                {
                    return NotFound("No one student in this subgroup found");
                }

                var studentsToDisplay = await GetStudentsAllDataByStudentsId(studentsIdBySubgroup);
                if (studentsToDisplay != null)
                {
                    return studentsToDisplay;
                }
                return StatusCode(500);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet("{studentsSkip}")]
        public ActionResult<IEnumerable<Student>> GetRangStudents(int studentsSkip)
        {
            List<Student> result = db.Students.OrderByDescending(x => x.Id).Skip(studentsSkip).Take(5).ToList();
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
        public async Task<IActionResult> AddStudentsIntoGroup(StudentsByGroupsDistributionViewModel model)
        {
            if (model.GroupId <= 0)
            {
                return BadRequest("GroupId can't be <= 0");
            }
            if (model.StudentsId == null || model.StudentsId.Count == 0)
            {
                return BadRequest("No one student selected");
            }
            var group = await db.Groups.FirstOrDefaultAsync(x => x.Id == model.GroupId);
            if (group == null)
            {
                return NotFound("Group not found");
            }
            var subgroup = await db.Subgroups.FirstOrDefaultAsync(x => x.Id == group.DefSubgroupId);
            if (subgroup == null)
            {
                return NotFound("Subgroup not found");
            }
            List<StudentsBySubgroup> studentsSubgroups = new List<StudentsBySubgroup>();
            foreach (var studentId in model.StudentsId)
            {
                var student = await db.Students.FirstOrDefaultAsync(x => x.Id == studentId);
                if (student != null)
                {
                    await db.StudentsBySubgroups.AddAsync(new StudentsBySubgroup { Subgroup = subgroup, Student = student });
                }
            }
            var result = await db.SaveChangesAsync();
            if (result > 0)
            {
                return Ok();
            }
            return StatusCode(500);

        }
        [HttpPost]
        public async Task<ActionResult> AddBase64(Base64ViewModel model)
        {
            Student student = await db.Students.FirstOrDefaultAsync(x => x.Id == model.Id);
            if (student != null)
            {
                //student.Base64URL = model.Base64URL;
                await db.SaveChangesAsync();
                return Ok();
            }
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Student>> Delete(int id)
        {
            Student student = await db.Students.FirstOrDefaultAsync(x => x.Id == id);
            if (student == null)
            {
                return NotFound();
            }
            db.Students.Remove(student);
            await db.SaveChangesAsync();
            return Ok(student);
        }
        [HttpDelete("{details}")]
        public async Task<IActionResult> DeleteStudentFromGroup(int studentId, int groupId)
        {
            try
            {
                if (studentId <= 0)
                {
                    return BadRequest("studentId can't be <= 0");
                }
                if (groupId <= 0)
                {
                    return BadRequest("groupId can't be <= 0");
                }
                var student = await db.Students.FirstOrDefaultAsync(x => x.Id == studentId);
                if (student == null)
                {
                    return NotFound("Student not found");
                }
                var group = await db.Groups.FirstOrDefaultAsync(x => x.Id == groupId);
                if (group == null)
                {
                    return NotFound("Group not found");
                }
                List<int> groupSubgroupsId = await db.Subgroups.Where(x => x.GroupId == group.Id).Select(x => x.Id).ToListAsync(); // шукаю усі підгрупи групи, де може бути студент
                if (groupSubgroupsId == null) // якщо ні однієї підгрупи не знайдено
                {
                    return NotFound("Student doesn't exist in this group");
                }

                foreach (var subgroupId in groupSubgroupsId)
                {
                    var studentBySubgroup = await db.StudentsBySubgroups.FirstOrDefaultAsync(x => x.SubgroupId == subgroupId && x.StudentId == studentId);// усі підгрупи, де знаходиться студент
                    if (studentBySubgroup != null) // якщо підгрупа із таким студентом існує
                    {
                        db.StudentsBySubgroups.Remove(studentBySubgroup); // видаляю запис з таблиці (студента з підгрупи)
                    }
                }
                var result = await db.SaveChangesAsync();
                if (result > 0)
                {
                    return Ok("The student was removed succesfully from group (include group subgroups)");
                }
                return BadRequest("The student wasn't removed from group (include group subgroups)"); ;
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }

        }
        [HttpDelete("{details}")]
        public async Task<IActionResult> DeleteStudentFromSubgroup(int studentId, int subgroupId)
        {
            try
            {
                if (studentId <= 0)
                {
                    return BadRequest("Student Id can't be <= 0");
                }
                if (subgroupId <= 0)
                {
                    return BadRequest("Subgroup id can't be <= 0");
                }
                var student = await db.Students.FirstOrDefaultAsync(x => x.Id == studentId);
                if (student == null)
                {
                    return NotFound("Student not found");
                }
                var subgroup = await db.Subgroups.FirstOrDefaultAsync(x => x.Id == subgroupId);
                if (subgroup == null)
                {
                    return NotFound("Subgroup not found");
                }

                var studentBySubgroup = await db.StudentsBySubgroups.FirstOrDefaultAsync(x => x.SubgroupId == subgroupId && x.StudentId == studentId);// підгрупа, де знаходиться студент
                if (studentBySubgroup != null) // якщо підгрупа із таким студентом існує
                {
                    db.StudentsBySubgroups.Remove(studentBySubgroup); // видаляю запис з таблиці (студента з підгрупи)
                    var result = await db.SaveChangesAsync();
                    if (result > 0)
                    {
                        return Ok("The student was removed succesfully from subgroup");
                    }
                    else
                    {
                        return BadRequest("The student wasn't removed from subgroup");
                    }
                }
                else
                {
                    return NotFound("Student not found in this subgroup");
                }

            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }

        }
        //[HttpGet("{id}")]
        //public async Task<ActionResult<Group>> GetStudentGroupByIdAsync(int id)//GetStudentGroupByIdAsync
        //{
        //    var student = await db.Students.FirstOrDefaultAsync(x => x.StudentId == id);
        //    if (student != null)
        //    {
        //        var group = await db.Groups.FirstOrDefaultAsync(x => x.Id == student.GroupId);
        //        if (group != null)
        //        {
        //            return Ok(group);
        //        }
        //        else
        //        {
        //            return NotFound(new { error = "Group not found" });
        //        }
        //    }
        //    return NotFound(new { error = "Student not found" });
        //}

        //[HttpGet("{id}")]
        //public async Task<ActionResult<Subgroup>> GetStudentSubgroupByIdAsync(int id)
        //{
        //    var student = await db.Students.FirstOrDefaultAsync(x => x.StudentId == id);

        //    if (student != null)
        //    {
        //        var subgroup = await db.Subgroups.FirstOrDefaultAsync(x => x.Id == student.SubgroupId);
        //        if (subgroup != null)
        //        {
        //            return Ok(subgroup);
        //        }
        //        else
        //        {
        //            return NotFound(new { error = "Subgroup not found" });
        //        }
        //    }
        //    return NotFound(new { error = "Student not found" });
        //}

        //[HttpGet("{StudentId}/{feedbackSkip}")]
        //public async Task<ActionResult<IEnumerable<Feedbackinfo>>> GetRangStudentFeedbackById(int StudentId, int feedbackSkip)
        //{
        //    List<Feedback> feedbacks = new List<Feedback>();
        //    List<Feedbackinfo> feedbackinfos = new List<Feedbackinfo>();
        //    var studentFeedbacks = await db.StudentFeedback.Where(x => x.StudentId == StudentId).Select(x => x.FeedbackId).ToListAsync();
        //    if (studentFeedbacks.Count != 0)
        //    {
        //        foreach (var studentFeedback in studentFeedbacks)
        //        {
        //            feedbacks.Add(await db.Feedback.FirstOrDefaultAsync(x => x.Id == studentFeedback));
        //        }
        //        foreach (var feedback in feedbacks)
        //        {
        //            Subject subject = await db.Subjects.FirstOrDefaultAsync(x => x.Id == feedback.SubjectId);
        //            Teacher teacher = await db.Teachers.FirstOrDefaultAsync(x => x.TeacherId == feedback.TeacherId);
        //            Feedbackinfo feedbackinfo = new Feedbackinfo { MainInformation = feedback.MainInformation, IsRead = feedback.IsRead, DataPublication = feedback.DataPublication, SubjectTitle = subject.Title, TeacherName = teacher.Name, TeacherLastName = teacher.LastName };
        //            feedbackinfos.Add(feedbackinfo);
        //        }
        //        if (feedbackinfos.Count() > 0)
        //        {
        //            var takeFeedback = feedbackinfos.Count();
        //            return Ok(feedbackinfos.OrderByDescending(f => f.Id).Skip(feedbackSkip).Take(takeFeedback).ToList());
        //        }
        //        else
        //        {

        //            return Ok(false);
        //        }
        //    }
        //    return NotFound(new { error = "Student's groups not found" });
        //}


        [HttpGet("{StudentId}")]
        public async Task<ActionResult<int>> GetNotreadFeedback(int StudentId)
        {
            Student stuent = await db.Students.FirstOrDefaultAsync(x => x.Id == StudentId);
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

        //[HttpGet("{GroupId}")]
        //public async Task<ActionResult<IEnumerable<Student>>> GetStudentsByGroupId(int GroupId)
        //{
        //    var students = await db.Students.Where(x => x.GroupId == GroupId).ToListAsync();
        //    if (students.Count > 0)
        //    {
        //        return Ok(students);
        //    }
        //    return NotFound();
        //}

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
