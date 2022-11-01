using DailyDiary.Models;
using DailyDiary.Models.DbModels;
using DailyDiary.Models.ViewModels;
using DailyDiary.Models.ViewModels.WorkWithFiles;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DailyDiary.Controllers.APIControllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    //[Authorize(Roles = "MainAdmin,Admin,Teacher")]
    public class StudentsHomeworksController : Controller
    {
        private readonly DailyDiaryDatasContext db;
        public StudentsHomeworksController(DailyDiaryDatasContext datasContext)
        {
            this.db = datasContext;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<FileViewModel>> GetByHomeworkIdAsync(int id)
        {
            var homework = await db.StudentsWorks.Where(x => x.Id == id)
                .Select(x => new FileViewModel
                {
                    File = x.StudentWork,
                    FileType = x.FileType,
                    FileName = x.FileName
                })
                .FirstOrDefaultAsync();
            if (homework != null)
            {
                return Ok(homework);
            }
            return NotFound("Homework task not found");

        }
        [HttpPost]
        public async Task<IActionResult> AddDoneHomeworkAsync([FromForm] StudentsWorkViewModel model)
        {
            try
            {
                var student = await db.Students.FindAsync(model.StudentId);
                if (student != null)
                {
                    var studentHomeworkToEdit = await db.StudentsWorks.FirstOrDefaultAsync(x => x.Id == model.TaskId && x.StudentId == model.StudentId);
                    if (studentHomeworkToEdit == null)
                    {
                        byte[] taskInBytes = null;
                        // зчитую файл в масив байтів
                        using (var binaryReader = new BinaryReader(model.FormFile.OpenReadStream()))
                        {
                            taskInBytes = binaryReader.ReadBytes((int)model.FormFile.Length);
                        }
                        studentHomeworkToEdit = new StudentsWork
                        {
                            StudentId = model.StudentId,
                            TaskId = model.TaskId,
                            StudentWork = taskInBytes,
                            FileName = model.FileName,
                            FileType = model.FileType,
                            StudentComment = model.StudentComment,
                            UploadDate = DateTime.Now
                            //Mark = model.Mark,
                            //TeacherComment = model.TeacherComment,
                        };
                        await db.StudentsWorks.AddAsync(studentHomeworkToEdit);
                        int result = await db.SaveChangesAsync();
                        if (result > 0)
                        {
                            return Ok("Homework was added successfully");
                        }
                        else
                        {
                            return StatusCode(500, "Homework wasn't added");
                        }
                    }
                    else
                    {
                        return BadRequest("Homework adready done");
                    }
                }
                else
                {
                    return NotFound("Student not found");
                }
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }

        [HttpGet("{studentId}")]
        //[ValidateAntiForgeryToken]
        public async Task<ActionResult<IEnumerable<StudentsWorkToDisplayViewModel>>> GetCheckedHomeworksByStudentId(int studentId) // всі виконані домашки студента
        {
            try
            {
                var student = await db.Students.AsNoTracking().FirstOrDefaultAsync(x => x.Id == studentId);
                if (student == null)
                {
                    return NotFound("Student not found");
                }
                var homeworkTaskType = await db.TaskTypes.AsNoTracking().FirstOrDefaultAsync(x => x.TaskTypeDescription.ToLower() == "homework");
                if (homeworkTaskType == null)
                {
                    return NotFound("Can't find 'homework' task type");
                }

                //var homeworks = await db.StudentsWorks.OrderByDescending(x => x.Id).Include(x => x.Task).ThenInclude(x => x.TaskTypeId).Where(x => x.Mark != null && x.TeacherId != null && x.StudentId == student.Id && x.Task.TaskTypeId == homeworkTaskType.Id)
                //    .Select(x => new StudentsWorkToDisplayViewModel
                //    {
                //        Id=x.Id,
                //        TaskId = x.TaskId,
                //        StudentId = x.StudentId,
                //        StudentComment = x.StudentComment,
                //        TeacherComment = x.TeacherComment,
                //        Mark = (int)x.Mark,
                //        TeacherData = new TeacherData { TeacherId = (int)x.TeacherId}
                //    })
                //    .ToListAsync();

                var checkedHomeworksId = await db.StudentsWorks.OrderByDescending(x => x.Id).Include(x => x.Task).Where(x => x.Mark != null && x.TeacherId != null && x.StudentId == student.Id && x.Task.TaskTypeId == homeworkTaskType.Id).Select(x => x.Id).ToListAsync();

                if (checkedHomeworksId.Count > 0)
                {
                    List<StudentsWorkToDisplayViewModel> studentHomeworks = new List<StudentsWorkToDisplayViewModel>();
                    StudentsWorkToDisplayViewModel studentHomework = null;
                    foreach (var checkedHomeworkId in checkedHomeworksId)
                    {
                        var homework = await db.StudentsWorks.FirstOrDefaultAsync(x => x.Id == checkedHomeworkId);
                        studentHomework = new StudentsWorkToDisplayViewModel
                        {
                            Id = homework.Id,
                            TaskId = homework.TaskId,
                            StudentId = homework.StudentId,
                            StudentComment = homework.StudentComment,
                            TeacherComment = homework.TeacherComment,
                            Mark = (int)homework.Mark,
                            PassedDate = homework.UploadDate,
                            CheckedDate = (DateTime)homework.CheckDate
                        };

                        var teacher = await db.Teachers.Include(x => x.Person).FirstOrDefaultAsync(x => x.Id == homework.TeacherId);
                        if (teacher != null)
                        {
                            studentHomework.TeacherData = new TeacherData
                            {
                                TeacherId = (int)homework.TeacherId,
                                TeacherFullName = teacher.Person.Name + " " + teacher.Person.LastName
                            };
                        }
                        var task = await db.Tasks.Include(x => x.TeacherSubgroupDistribution).ThenInclude(x => x.Subject).FirstOrDefaultAsync(x => x.Id == homework.TaskId);
                        if (task != null)
                        {
                            studentHomework.Theme = task.Theme;
                            studentHomework.Comment = task.Comment;
                            studentHomework.PublishDate = task.PublishDate;
                            studentHomework.Deadline = task.Deadline;
                            studentHomework.Subject = new Subject { Id = task.TeacherSubgroupDistribution.SubjectId, Title = task.TeacherSubgroupDistribution.Subject.Title };
                        }
                        studentHomeworks.Add(studentHomework);
                    }
                    return Ok(studentHomeworks);
                }
                else
                {
                    return NotFound("No one student passed homework found");
                }
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }

        [HttpGet("{studentId}")]
        //[ValidateAntiForgeryToken]
        public async Task<ActionResult<IEnumerable<StudentsWorkToDisplayViewModel>>> GetOnCheckingHomeworksByStudentIdAsync(int studentId) // всі домашки студента без оцінки 
        {
            try
            {
                var student = await db.Students.AsNoTracking().FirstOrDefaultAsync(x => x.Id == studentId);
                if (student == null)
                {
                    return NotFound("Student not found");
                }
                var homeworkTaskType = await db.TaskTypes.AsNoTracking().FirstOrDefaultAsync(x => x.TaskTypeDescription.ToLower() == "homework");
                if (homeworkTaskType == null)
                {
                    return NotFound("Can't find 'homework' task type");
                }

                var checkedHomeworksId = await db.StudentsWorks.OrderByDescending(x => x.Id).Include(x => x.Task).Where(x => x.Mark == null && x.TeacherId == null && x.StudentId == student.Id && x.Task.TaskTypeId == homeworkTaskType.Id).Select(x => x.Id).ToListAsync();

                if (checkedHomeworksId.Count > 0)
                {
                    List<StudentsWorkToDisplayViewModel> studentHomeworks = new List<StudentsWorkToDisplayViewModel>();
                    StudentsWorkToDisplayViewModel studentHomework = null;
                    foreach (var checkedHomeworkId in checkedHomeworksId)
                    {
                        var homework = await db.StudentsWorks.FirstOrDefaultAsync(x => x.Id == checkedHomeworkId);
                        studentHomework = new StudentsWorkToDisplayViewModel
                        {
                            Id = homework.Id,
                            TaskId = homework.TaskId,
                            StudentId = homework.StudentId,
                            StudentComment = homework.StudentComment,
                            PassedDate = homework.UploadDate
                        };


                        var task = await db.Tasks.Include(x => x.TeacherSubgroupDistribution).ThenInclude(x => x.Subject).FirstOrDefaultAsync(x => x.Id == homework.TaskId);
                        if (task != null)
                        {
                            studentHomework.Theme = task.Theme;
                            studentHomework.Comment = task.Comment;
                            studentHomework.PublishDate = task.PublishDate;
                            studentHomework.Deadline = task.Deadline;
                            studentHomework.Subject = new Subject { Id = task.TeacherSubgroupDistribution.SubjectId, Title = task.TeacherSubgroupDistribution.Subject.Title };

                            var teacher = await db.Teachers.Include(x => x.Person).FirstOrDefaultAsync(x => x.Id == task.TeacherSubgroupDistribution.TeacherId);
                            if (teacher != null)
                            {
                                studentHomework.TeacherData = new TeacherData
                                {
                                    TeacherId = teacher.Id,
                                    TeacherFullName = teacher.Person.Name + " " + teacher.Person.LastName
                                };
                            }
                        }
                        studentHomeworks.Add(studentHomework);
                    }
                    return Ok(studentHomeworks);
                }
                else
                {
                    return NotFound("No one student on-checking homework found");
                }
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }
        [HttpGet("{details}")]
        //[ValidateAntiForgeryToken]
        public async Task<ActionResult<IEnumerable<StudentsWorkToDisplayViewModel>>> GetHomeworksByStudentIdAsync(int studentId, bool overdue = false) // всі задані або прострочені домашки студента 
        {
            try
            {
                var student = await db.Students.AsNoTracking().FirstOrDefaultAsync(x => x.Id == studentId); //шукаю студента
                if (student == null)
                {
                    return NotFound("Student not found");
                }
                var subgroupsId = await db.StudentsBySubgroups.Where(x => x.StudentId == student.Id).Select(x => x.SubgroupId).ToListAsync(); // усі підгрупи, в яких навчається студент
                if (subgroupsId.Count == 0)
                {
                    return NotFound("No one student subgroup found");
                }
                var taskType = await db.TaskTypes.AsNoTracking().FirstOrDefaultAsync(x => x.TaskTypeDescription.ToLower() == "homework"); // тип завдання "домашнє"
                if (taskType == null)
                {
                    return NotFound("Can't find 'homework' task type");
                }
                List<int> allTasksIdForGroup = new List<int>();
                //TaskFullDataViewModel taskToDisplay = null;
                foreach (var subgroupId in subgroupsId) // для кожної підгрупи
                {
                    var teacherSubgroupsId = await db.TeacherSubgroupDistributions.AsNoTracking().Where(x => x.SubgroupId == subgroupId && x.TeacherId != null).Select(x => x.Id).ToListAsync();// усі можливі предмети, з яких можуть бути задані завдання викладачами для групи
                    foreach (var teacherSubgroupId in teacherSubgroupsId)
                    {
                        var allTasksIdForStudentGroups = await db.Tasks.AsNoTracking().OrderByDescending(x => x.Id)
                            .Where(x => x.TeacherSubgroupDistributionId == teacherSubgroupId)
                            .Select(x => x.Id).ToListAsync(); // всі завдання, що були задані групі
                        allTasksIdForGroup.AddRange(allTasksIdForStudentGroups);
                    }
                }

                for (int i = allTasksIdForGroup.Count-1; i >= 0; i--) // всі завдання, що були задані групі
                {
                    if (await db.StudentsWorks.AsNoTracking().AnyAsync(x => x.TaskId == allTasksIdForGroup[i] && x.StudentId==studentId))
                    { // якщо задана робота виконана студентом
                        allTasksIdForGroup.RemoveAt(i);//видаляю із списку
                    }
                }
                if (allTasksIdForGroup.Count > 0)
                {
                    var dateNow = DateTime.Today;

                    List<TaskFullDataViewModel> notPassedYetHomeworks = new List<TaskFullDataViewModel>();
                    TaskFullDataViewModel notPassedHomeworkToAdd = null;
                    foreach (var groupTaskId in allTasksIdForGroup) // список завдань які були задані групі, але ще не виконані студентом
                    {
                        if (overdue) // повертаю прострочені
                        {
                            notPassedHomeworkToAdd = await db.Tasks
                           .Include(x => x.TeacherSubgroupDistribution).ThenInclude(x => x.Teacher)
                           .Include(x => x.TeacherSubgroupDistribution).ThenInclude(x => x.Subject)
                           .Where(x => x.Id == groupTaskId && x.Deadline < dateNow) // де завдання = завданню із списку заданих і дедлайн < за теперішню дату
                           .Select(x => new TaskFullDataViewModel
                           {
                               Id = x.Id,
                               PublishDate = x.PublishDate,
                               Deadline = x.Deadline,
                               Theme = x.Theme,
                               Comment = x.Comment,
                               TeacherData = new TeacherData { TeacherId = (int)x.TeacherSubgroupDistribution.TeacherId, TeacherFullName = x.TeacherSubgroupDistribution.Teacher.Person.Name + " " + x.TeacherSubgroupDistribution.Teacher.Person.LastName },
                               Subject = new Subject { Id = x.TeacherSubgroupDistribution.SubjectId, Title = x.TeacherSubgroupDistribution.Subject.Title }
                           }).FirstOrDefaultAsync(); // завдання, що було заданe групі і студент прострочив дедлайн
                        }
                        else // повертаю не прострочені
                        {
                            notPassedHomeworkToAdd = await db.Tasks
                            .Include(x => x.TeacherSubgroupDistribution).ThenInclude(x => x.Teacher)
                            .Include(x => x.TeacherSubgroupDistribution).ThenInclude(x => x.Subject)
                            .Where(x => x.Id == groupTaskId && x.Deadline >= dateNow)
                            .Select(x => new TaskFullDataViewModel
                            {
                                Id = x.Id,
                                PublishDate = x.PublishDate,
                                Deadline = x.Deadline,
                                Theme = x.Theme,
                                Comment = x.Comment,
                                TeacherData = new TeacherData { TeacherId = (int)x.TeacherSubgroupDistribution.TeacherId, TeacherFullName = x.TeacherSubgroupDistribution.Teacher.Person.Name + " " + x.TeacherSubgroupDistribution.Teacher.Person.LastName },
                                Subject = new Subject { Id = x.TeacherSubgroupDistribution.SubjectId, Title = x.TeacherSubgroupDistribution.Subject.Title }
                            }).FirstOrDefaultAsync(); // завдання, що було задане групі
                        }
                        if (notPassedHomeworkToAdd != null)
                        {
                            notPassedYetHomeworks.Add(notPassedHomeworkToAdd);
                        }
                    }
                    if (notPassedYetHomeworks.Count > 0)
                    {
                        return Ok(notPassedYetHomeworks);
                    }
                    else
                    {
                        if (overdue)
                        {
                            return NotFound("No one overdue homework found");
                        }
                        else
                        {
                            return NotFound("No one given homework found");
                        }
                    }
                }
                else
                {
                    return NotFound("No one given or overdue homework found");
                }
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }
        [HttpGet("{studentId}")]
        public async Task<ActionResult<StudentsGeneralTasksAmountViewModel>> GetGeneralAmountOfTasksAsync(int studentId) // всі домашки студента без оцінки 
        {
            try
            {
                var student = await db.Students.AsNoTracking().FirstOrDefaultAsync(x => x.Id == studentId);
                if (student == null)
                {
                    return NotFound("Student not found");
                }
                var taskType = await db.TaskTypes.AsNoTracking().FirstOrDefaultAsync(x => x.TaskTypeDescription.ToLower() == "homework"); // тип завдання "домашнє"
                if (taskType == null)
                {
                    return NotFound("Can't find 'homework' task type");
                }
                GroupController groupController = new GroupController(db);
                var currentStudyYearGroups = await groupController.GetAllGroupsOfCurrentStudyYear();
                if (currentStudyYearGroups != null && currentStudyYearGroups.Value.Count() > 0)
                {
                    var currentStudyYearGroupsList = currentStudyYearGroups.Value.ToList();

                    List<Models.DbModels.Task> allGivenTasks = new List<Models.DbModels.Task>();

                    foreach (var currentStudyYearGroup in currentStudyYearGroupsList) // перебираю усі групи теперішнього навч.року
                    {
                        List<int> subgroupsId = await db.StudentsBySubgroups.Include(x => x.Subgroup)
                            .Where(x => x.StudentId == studentId && x.Subgroup.GroupId== currentStudyYearGroup.Id)
                            .Select(x => x.SubgroupId).ToListAsync(); //шукаю уcі підгрупи теперішнього навчального року, де навчається студент
                        foreach (var subgroupId in subgroupsId)
                        {
                            var allGivenSubgroupTasks = await db.Tasks.Include(x => x.TeacherSubgroupDistribution).ThenInclude(x => x.Subgroup)
                                .Where(x => x.TaskTypeId == taskType.Id && x.TeacherSubgroupDistribution.Subgroup.Id == subgroupId)
                                .Select(x => new Models.DbModels.Task { Id=x.Id,Deadline=x.Deadline }).ToListAsync(); // знаходжу усі задані домашки підгрупі(групі)
                            allGivenTasks.AddRange(allGivenSubgroupTasks);//усі задані групам завдання
                        }
                    }
                    if (allGivenTasks.Count == 0)
                    {
                        return NotFound("No one given task homework to any groups where student have lessons found");
                    }
                    StudentsGeneralTasksAmountViewModel generalTasksAmount = new StudentsGeneralTasksAmountViewModel();
                    var currentDate = DateTime.Today;
                    foreach (var task in allGivenTasks)
                    {
                        //var studentNotPassedYetHomeworksAmount = await db.StudentsWorks.AsNoTracking().Where(x => x.StudentId == studentId && x.TaskId == taskId && x.UploadDate != null && x.Mark==null && x.TeacherId==null).Select(x => x.Id).ToListAsync();
                        var studentHomework = await db.StudentsWorks.AsNoTracking().FirstOrDefaultAsync(x => x.StudentId == studentId && x.TaskId == task.Id);
                        if (studentHomework != null) // якщо робота здана
                        {
                                if (studentHomework.UploadDate != null && studentHomework.Mark == null && studentHomework.TeacherId == null) // якщо робота на перевірці
                                {
                                    generalTasksAmount.OnCheckingTasksAmount += 1;
                                }
                                else if (studentHomework.UploadDate != null && studentHomework.Mark != null && studentHomework.TeacherId != null) //якщо робота перевірена
                                {
                                    generalTasksAmount.PassedTasksAmount += 1;
                                }
                        }
                        else//якщо робота не здана
                        {
                            if(task.Deadline < currentDate) // якщо дедлайн прострочено
                            {
                                generalTasksAmount.OverdueTasksAmount += 1;
                            }
                            else
                            {
                                generalTasksAmount.GivenTasksAmount += 1;
                            }
                        }            
                    }
                    return Ok(generalTasksAmount);
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
        //[HttpPut]
        //public async Task<IActionResult> UpdateAsync(StudentHomeworksViewModel model)
        //{
        //    if (ModelState.IsValid)
        //    {
        //        if (model != null)
        //        {
        //            var studentHomeworkToEdit = await db.StudentHomeworks.FirstOrDefaultAsync(x => x.GroupHomeworkId == model.GroupHomeworkId && x.StudentId == model.StudentId);
        //            if (studentHomeworkToEdit == null)
        //            {
        //                studentHomeworkToEdit = new StudentHomework
        //                {
        //                    PerformedHomework = model.PerformedHomework,
        //                    StudentComment = model.StudentComment,
        //                    Mark = model.Mark,
        //                    TeacherComment = model.TeacherComment,
        //                    Published = DateTime.Now
        //                };

        //            }
        //            else
        //            {
        //                studentHomeworkToEdit.PerformedHomework = model.PerformedHomework;
        //                studentHomeworkToEdit.StudentComment = model.StudentComment;
        //                studentHomeworkToEdit.Mark = model.Mark;
        //                studentHomeworkToEdit.TeacherComment = model.TeacherComment;
        //                studentHomeworkToEdit.Published = DateTime.Now;
        //            }
        //            db.StudentHomeworks.Update(studentHomeworkToEdit);
        //            await db.SaveChangesAsync();
        //            return Ok(studentHomeworkToEdit);
        //        }
        //    }
        //    return BadRequest(ModelState);
        //}
        //[HttpDelete]
        ////[Authorize(Roles = "MainAdmin,Admin,Teacher,Student")]
        //public async Task<ActionResult<Student>> Delete(StudentHomeworksViewModel model)
        //{
        //    var studentHomework = await db.StudentHomeworks.FirstOrDefaultAsync(x => x.GroupHomeworkId == model.GroupHomeworkId && x.StudentId == model.StudentId);
        //    if (studentHomework == null)
        //    {
        //        return NotFound();
        //    }
        //    db.StudentHomeworks.Remove(studentHomework);
        //    await db.SaveChangesAsync();
        //    return Ok(studentHomework);
        //}

        //[HttpGet("{id}")]
        //public async Task<ActionResult<IEnumerable<StudentHomework>>> GetStudentsHomeworksBySubjectIdAsync(int id)
        //{
        //    var homeworksId = await db.GroupHomeworks.Where(x => x.SubjectId == id).Select(x => x.GroupHomeworkId).ToListAsync();
        //    if (homeworksId != null)
        //    {
        //        List<StudentHomework> studentHomeworks = new List<StudentHomework>();
        //        foreach (var homeworkId in homeworksId)
        //        {
        //            studentHomeworks.Add(await db.StudentHomeworks.FirstOrDefaultAsync(x => x.GroupHomeworkId == homeworkId));
        //        }
        //        return Ok(studentHomeworks);
        //    }
        //    else
        //    {
        //        return NotFound(new { error = "Homeworks not found" });
        //    }
        //}

        //[HttpGet("{id}")]
        //public async Task<ActionResult<IEnumerable<StudentClasswork>>> GetStudentsHomeworksByGroupIdAsync(int id)
        //{
        //    var group = await db.Groups.FirstOrDefaultAsync(x => x.Id == id);

        //    if (group != null)
        //    {
        //        var homeworksId = await db.GroupHomeworks.Where(x => x.GroupId == group.Id).Select(x => x.GroupHomeworkId).ToListAsync();
        //        if (homeworksId != null)
        //        {
        //            List<StudentHomework> studentsHomeworks = new List<StudentHomework>();
        //            foreach (var homeworkId in homeworksId)
        //            {
        //                studentsHomeworks.Add(await db.StudentHomeworks.FirstOrDefaultAsync(x => x.GroupHomeworkId == homeworkId));
        //            }
        //            return Ok(studentsHomeworks);
        //        }
        //        else
        //        {
        //            return NotFound(new { error = "Homeworks not found" });
        //        }
        //    }

        //    return NotFound(new { error = "Group not found" });
        //}
        //[HttpGet("{id}")]
        //public async Task<ActionResult<IEnumerable<StudentHomework>>> GetStudentsHomeworksByTeacherIdAsync(int id)
        //{
        //    var teacher = await db.Teachers.FirstOrDefaultAsync(x => x.TeacherId == id);

        //    if (teacher != null)
        //    {
        //        var homeworksId = await db.GroupHomeworks.Where(x => x.TeacherId == teacher.TeacherId).Select(x => x.GroupHomeworkId).ToListAsync();
        //        if (homeworksId != null)
        //        {
        //            List<StudentHomework> studentsHomeworks = new List<StudentHomework>();
        //            foreach (var homeworkId in homeworksId)
        //            {
        //                studentsHomeworks.Add(await db.StudentHomeworks.FirstOrDefaultAsync(x => x.GroupHomeworkId == homeworkId));
        //            }
        //            return Ok(studentsHomeworks);
        //        }
        //        else
        //        {
        //            return NotFound(new { error = "Homeworks not found" });
        //        }
        //    }
        //    return NotFound(new { error = "Teacher not found" });
        //}
        //[HttpPost]
        //public async Task<ActionResult<IEnumerable<StudentHomework>>> GetStudentsHomeworksByThemeAsync(GroupHomeworksViewModel model)
        //{

        //    if (model != null)
        //    {
        //        var homeworksId = await db.GroupClassworks.Where(x => x.Theme.ToLower() == model.Theme.ToLower()).Select(x => x.GroupClassworkId).ToListAsync();
        //        if (homeworksId != null)
        //        {
        //            List<StudentHomework> studentsHomeworks = new List<StudentHomework>();
        //            foreach (var homeworkId in homeworksId)
        //            {
        //                studentsHomeworks.Add(await db.StudentHomeworks.FirstOrDefaultAsync(x => x.GroupHomeworkId == homeworkId));
        //            }
        //            return Ok(studentsHomeworks);
        //        }
        //        else
        //        {
        //            return NotFound(new { error = "Homeworks not found" });
        //        }
        //    }
        //    return BadRequest(new { error = "Model is empty" });
        //}
    }
}
