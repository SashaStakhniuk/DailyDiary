//using DailyDiary.Models;
//using DailyDiary.Models.ViewModels;
//using Microsoft.AspNetCore.Authorization;
//using Microsoft.AspNetCore.Mvc;
//using Microsoft.EntityFrameworkCore;
//using System;
//using System.Collections.Generic;
//using System.IO;
//using System.Linq;
//using System.Text;
//using System.Threading.Tasks;

//namespace DailyDiary.Controllers.APIControllers
//{
//    [ApiController]
//    [Route("api/[controller]/[action]")]
//    //[Authorize(Roles = "MainAdmin,Admin,Teacher")]
//    public class GroupHomeworksController : Controller
//    {              
//         private readonly DailyDiaryDatasContext db;
//         public GroupHomeworksController(DailyDiaryDatasContext datasContext)
//         {
//             this.db = datasContext;
//         }
//        [HttpGet]
//        public async Task<ActionResult<IEnumerable<GroupHomework>>> Get()
//        {
//            return await db.GroupHomeworks.ToListAsync();
//        }
//        [HttpGet("{id}")]
//        public async Task<ActionResult<GroupHomework>> Get(int id)
//        {
//            var homework = await db.GroupHomeworks.FirstOrDefaultAsync(x => x.GroupHomeworkId == id);
//            if (homework == null)
//            {
//                return NotFound(new { error = "No such homework task" });
//            }
//            else
//            {
//                homework.Homework = Encoding.ASCII.GetString(homework.HomeworkInBytes);
//                homework.HomeworkInBytes = null;
//                return Ok(homework);
//            }
//        }
//        [HttpGet("{details}")]
//        public async Task<ActionResult<IEnumerable<GroupHomework>>> GetSomeHomeworksByStudentId(int studentId,int skip,int take)
//        {
//            var student = await db.Students.FindAsync(studentId);
//            if (student != null)    
//            {
//                var homeworks = await db.GroupHomeworks.OrderByDescending(x => x.GroupHomeworkId).Where(x => x.GroupId == student.GroupId).Skip(skip).Take(take)
//                                        .Include(x => x.Teacher).AsNoTracking().Include(x=> x.Subject).AsNoTracking().ToListAsync();
//                //.Include(x=> x.Teacher).AsNoTracking().Include(x=> x.Subject).AsNoTracking().ToListAsync();
//                //var homeworks = await db.GroupHomeworks.OrderByDescending(x => x.GroupHomeworkId).Where(x => x.GroupId == student.GroupId).Skip(skip).Take(take).ToListAsync();
//                if (homeworks != null)
//                {
//                    foreach (var homework in homeworks)
//                    {
//                        homework.HomeworkInBytes = null;
//                        homework.Teacher.GroupHomeworks = null;
//                        homework.Subject.GroupHomeworks = null;
                        
//                        //var teacher = await db.Teachers.FindAsync(homework.TeacherId);
//                        homework.Teacher = new Teacher {  Name=homework.Teacher.Name, LastName = homework.Teacher.LastName};
//                        homework.Subject = new Subject { Title = homework.Subject.Title };
//                        //homework.Teacher.LastName = teacher.LastName;
//                    }
//                    //homework.Homework = Encoding.ASCII.GetString(homework.HomeworkInBytes);
//                    return Ok(homeworks);
//                }
//                else
//                {
//                    return NotFound(new { error = "No such homework task" });
//                }
//            }
//            return NotFound(new { error = "Student not found" });
//        }

//        [HttpPost]
//        public async Task<IActionResult> CreateHomeworkAsync(GroupHomeworksViewModel model)
//        {
//                if (model != null)
//                {

//                    if (string.IsNullOrEmpty(model.Theme))
//                    {
//                        ModelState.AddModelError("Theme error", "Enter theme");
//                    }
//                    if (string.IsNullOrEmpty(model.Homework))
//                    {
//                        ModelState.AddModelError("Homework error", "You should add homework file");
//                    }
//                    if (model.TeacherId<=0)
//                    {
//                        ModelState.AddModelError("Teacher id error", "Teacher id must be > 0");
//                    }
//                    if (model.SubjectId <= 0)
//                    {
//                        ModelState.AddModelError("Subject's id error", "Subject's id must be > 0");
//                    }
//                    if (model.GroupId <= 0)
//                    {
//                        ModelState.AddModelError("Group's id error", "Group's id must be > 0");
//                    }
//                    if ( model.Deadline == null)
//                    {
//                        ModelState.AddModelError("Deadline error", "Deadline can't be null");
//                    }                   
//                    if (!ModelState.IsValid)
//                    {
//                        //ModelState.AddModelError("DatasModelError", "Please,enter all required datas correctly");
//                        return BadRequest(ModelState);
//                    }


//                    var homeworkDatasToEdit = await db.GroupHomeworks.FirstOrDefaultAsync(x => x.GroupHomeworkId == model.GroupHomeworkId);
//                    if (homeworkDatasToEdit == null)
//                    {
//                        var group = await db.Groups.FindAsync(model.GroupId);
//                        var subject = await db.Subjects.FindAsync(model.SubjectId);
//                        var teacher = await db.Teachers.FindAsync(model.TeacherId);

//                    homeworkDatasToEdit = new GroupHomework
//                    {
//                        //SubjectId = model.SubjectId,
//                        Subject = subject,
//                        Theme = model.Theme,
//                        //TeacherId = model.TeacherId,
//                        Teacher = teacher,
//                        //GroupId = model.GroupId,
//                        Group = group,
//                        HomeworkInBytes = Encoding.ASCII.GetBytes(model.Homework),
//                        FileName = model.FileName,
//                            //model.Homework = Encoding.ASCII.GetString(Homework);
//                            //Homework = model.Homework,//base64 string
//                            // Published = model.Published,
//                            Published = DateTime.Now,
//                            Deadline = model.Deadline
//                        };
//                    db.GroupHomeworks.Add(homeworkDatasToEdit);
//                    await db.SaveChangesAsync();
//                    return Ok(new { success = "Homework was added successfully" });
//                }
//                else
//                {
//                    return BadRequest(new {error = "Such homework is already exist" });
//                }
//                //db.GroupHomeworks.Update(homeworkDatasToEdit);
//                //db.SaveChanges();

                
//                    }
//            return BadRequest(ModelState);
//        }
//        [HttpPut] 
//        public async Task<IActionResult> UpdateHomeworkAsync(GroupHomeworksViewModel model)
//        {
//            if (model != null)
//            {

//                if (string.IsNullOrEmpty(model.Theme))
//                {
//                    ModelState.AddModelError("Theme error", "Enter theme");
//                }
//                if (string.IsNullOrEmpty(model.Homework))
//                {
//                    ModelState.AddModelError("Homework error", "You should add homework");
//                }
//                if (model.TeacherId <= 0)
//                {
//                    ModelState.AddModelError("Teacher id error", "Teacher id must be > 0");
//                }
//                if (model.SubjectId <= 0)
//                {
//                    ModelState.AddModelError("Subject's id error", "Subject's id must be > 0");
//                }
//                if (model.GroupId <= 0)
//                {
//                    ModelState.AddModelError("Group's id error", "Group's id must be > 0");
//                }
//                if (model.Deadline == null)
//                {
//                    ModelState.AddModelError("Deadline error", "Deadline can't be null");
//                }
//                if (!ModelState.IsValid)
//                {
//                    //ModelState.AddModelError("DatasModelError", "Please,enter all required datas correctly");
//                    return BadRequest(ModelState);
//                }


//                var homeworkDatasToEdit = await db.GroupHomeworks.FirstOrDefaultAsync(x => x.GroupHomeworkId == model.GroupHomeworkId);
//                if (homeworkDatasToEdit != null)
//                {
//                    var group = await db.Groups.FindAsync(model.GroupId);
//                    var subject = await db.Subjects.FindAsync(model.SubjectId);
//                    var teacher = await db.Teachers.FindAsync(model.TeacherId);

//                    homeworkDatasToEdit.Subject = subject;
//                    homeworkDatasToEdit.Theme = model.Theme;
//                    homeworkDatasToEdit.Teacher = teacher;
//                    homeworkDatasToEdit.Group = group;
//                    homeworkDatasToEdit.Published = model.Published;
//                    homeworkDatasToEdit.Deadline = model.Deadline;
//                    db.GroupHomeworks.Update(homeworkDatasToEdit);
//                    await db.SaveChangesAsync();
//                    return Ok(new { success = "Homework was updated successfully" });
//                }
//                else
//                {
//                    return NotFound(new { error ="Homework not found"});                   
//                }
//                //db.GroupHomeworks.Update(homeworkDatasToEdit);
//                //db.SaveChanges();
//            }
//            return BadRequest(ModelState);
//        }

//        [HttpDelete("{id}")]
//        //[Authorize(Roles = "MainAdmin,Admin")]
//        public async Task<IActionResult> Delete(int id)
//        {
//            var homework = await db.GroupHomeworks.FirstOrDefaultAsync(x => x.GroupHomeworkId == id);
//            if (homework == null)
//            {
//                return NotFound(new { error = "File not found" });
//            }
//            db.GroupHomeworks.Remove(homework);
//            await db.SaveChangesAsync();
//            return Ok(new { success = "File was removed" });
//        }

//        [HttpGet("id")]
//        public async Task<ActionResult<IEnumerable<GroupHomework>>> GetBySubjectId(int id)
//        {
//            var homeworks = await db.GroupHomeworks.Where(x=> x.SubjectId == id).ToListAsync();
//            if(homeworks== null)
//            return NotFound();
//            return Ok(homeworks);
//        }

//        [HttpGet("details")]
//        public async Task<ActionResult<IEnumerable<GroupHomework>>> GetSomeHomeworksByGroupIdAndTeacherId(int groupId, int teacherId,int skip,int take)
//        {
//            //var homeworks = await db.GroupHomeworks.Where(x => x.GroupId == groupId && x.TeacherId == teacherId).Skip(skip).Take(take).ToListAsync();
//            var homeworks = await db.GroupHomeworks.OrderByDescending(x=> x.GroupHomeworkId).Where(x => x.GroupId == groupId && x.TeacherId == teacherId).Skip(skip).Take(take).ToListAsync();
//            if (homeworks != null)
//            {
//                foreach (var homework in homeworks)
//                {
//                    //var homeworkToView = new GroupHomeworksViewModel();
//                    //homeworkToView.GroupHomeworkId = homework.GroupHomeworkId;
//                    //homeworkToView.GroupId = homework.GroupId;
//                    //homeworkToView.SubjectId = homework.SubjectId;
//                    //homeworkToView.Theme = homework.Theme;
//                    //homeworkToView.Homework = Encoding.ASCII.GetString(homework.HomeworkInBytes);
//                    //homework.Homework = Encoding.ASCII.GetString(homework.HomeworkInBytes);
//                    homework.HomeworkInBytes = null;
//                }

//                return Ok(homeworks);
//            }
//            return NotFound(new { error ="No more files"});
//        }
//        [HttpGet("details")]
//        public async Task<ActionResult<IEnumerable<GroupHomework>>> GetByGroupIdAndTeacherId(int groupId, int teacherId)
//        {
//            //var homeworks = await db.GroupHomeworks.Where(x => x.Group.Id == groupId && x.Teacher.TeacherId == teacherId).ToListAsync();
//            var homeworks = await db.GroupHomeworks.Where(x => x.GroupId == groupId && x.TeacherId == teacherId).ToListAsync();
//            homeworks.OrderByDescending(x=> x.GroupHomeworkId);
//            //var homeworks = db.GroupHomeworks.Where(x => x.GroupId == groupId && x.TeacherId == teacherId).ToList();
//            if (homeworks != null)
//                return Ok(homeworks);
//            return NotFound();
//        }
        
//        [HttpGet("id")]
//        public async Task<ActionResult<IEnumerable<GroupHomework>>> GetByGroupId(int id)
//        {
//            var homeworks = await db.GroupHomeworks.Where(x => x.GroupId == id).ToListAsync();
//            if (homeworks == null)
//                return NotFound();
//            return Ok(homeworks);
//        }

//        [HttpPost]
//        public async Task<ActionResult<IEnumerable<GroupHomework>>> GetByTheme(GroupHomeworksViewModel model)
//        {

//            var homeworks = await db.GroupHomeworks.Where(x => x.Theme.ToLower() == model.Theme.ToLower()).ToListAsync();
//            if (homeworks == null)
//                return NotFound();
//            return Ok(homeworks);
//        }
//        //[HttpPost]
//        //public async Task<ActionResult<IEnumerable<GroupHomework>>> GetByDate(GroupHomeworksViewModel model)
//        //{
//        //    if(model!=null)
//        //    {
//        //        var homeworks = await db.GroupHomeworks.Where(x => x.Date.ToShortDateString() == model.Date.ToShortDateString()).ToListAsync();
//        //        if (homeworks == null)
//        //            return NotFound();
//        //        return Ok(homeworks);
//        //    }
//        //    return BadRequest(new { error = "Model is empty"});            
//        //}

//        //[HttpPost]
//        //public async Task<ActionResult<IEnumerable<GroupHomework>>> GetBySubjectIdAndDate(GroupHomeworksViewModel model)
//        //{
//        //    if (model != null)
//        //    {
//        //        var homeworks = await db.GroupHomeworks.Where(x => x.Date.ToShortDateString() == model.Date.ToShortDateString() && x.SubjectId == model.SubjectId).ToListAsync();
//        //        if (homeworks == null)
//        //            return NotFound();
//        //        return Ok(homeworks);
//        //    }
//        //    return BadRequest(new { error = "Model is empty" });
//        //}
//    }
//}
