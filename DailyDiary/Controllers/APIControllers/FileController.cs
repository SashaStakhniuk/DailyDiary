using DailyDiary.Models;
using DailyDiary.Models.ViewModels.WorkWithFiles;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace DailyDiary.Controllers.APIControllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class FileController : Controller
    {
        private readonly DailyDiaryDatasContext db;

        public FileController(DailyDiaryDatasContext context)
        {
            this.db = context;
        }
        [HttpPost]
        public async Task<IActionResult> AddNewHomework([FromForm] HomeworkTaskViewModel model)
        {
            try
            {
                if (string.IsNullOrEmpty(model.Theme))
                {
                    ModelState.AddModelError("Theme error", "Enter theme");
                }
                if (model.FormFile == null)
                {
                    ModelState.AddModelError("Homework error", "You should add at least 1 file for homework");
                }
                //if (model.TeacherUserId <= 0)
                //{
                //    ModelState.AddModelError("Teacher id error", "Teacher id must be > 0");
                //}
                if (model.SubjectId <= 0)
                {
                    ModelState.AddModelError("Subject's id error", "Subject's id must be > 0");
                }
                if (model.SubgroupId <= 0)
                {
                    ModelState.AddModelError("Group's id error", "Group's id must be > 0");
                }
                if (model.Deadline == null)
                {
                    ModelState.AddModelError("Deadline error", "Deadline can't be null");
                }
                var dateToday = DateTime.Now;
                if (model.Deadline < dateToday)
                {
                    ModelState.AddModelError("Deadline error", "Deadline can't be erlier than today");
                }

                
                //var teacher = await db.Teachers.Include(x => x.Person).FirstOrDefaultAsync(x => x.Person.UserId == model.TeacherUserId);
                var teacher = await db.Teachers.AsNoTracking().FirstOrDefaultAsync(x => x.Id == model.TeacherId);
                if (teacher == null)
                {
                    ModelState.AddModelError("Teacher not found error", "Teacher not found");
                    //return NotFound("Teacher not found");
                }
                var subgroup = await db.Subgroups.AsNoTracking().FirstOrDefaultAsync(x => x.Id == model.SubgroupId);
                if (subgroup == null)
                {
                    ModelState.AddModelError("Group not found error", "Group not found");

                    //return NotFound("Group not found");
                }
                var teacherSubgroup = await db.TeacherSubgroupDistributions.AsNoTracking().FirstOrDefaultAsync(x => x.TeacherId == teacher.Id && x.SubjectId == model.SubjectId && x.SubgroupId == subgroup.Id);
                if (teacherSubgroup == null)
                {
                    ModelState.AddModelError("Teacher not found error", "Teacher not found in this group");

                    //return NotFound("Teacher not found in this group");
                }

                if (!ModelState.IsValid)
                {
                    //ModelState.AddModelError("DatasModelError", "Please,enter all required datas correctly");
                    return BadRequest(ModelState);
                }
                byte[] taskInBytes = null;
                // зчитую файл в масив байтів
                using (var binaryReader = new BinaryReader(model.FormFile.OpenReadStream()))
                {
                    taskInBytes = binaryReader.ReadBytes((int)model.FormFile.Length);
                }

                var taskType = await db.TaskTypes.AsNoTracking().FirstOrDefaultAsync(x => x.TaskTypeDescription.ToLower() == "homework");
                if (taskType == null)
                {
                    await db.TaskTypes.AddAsync(new Models.DbModels.TaskType { TaskTypeDescription = "Homework" });
                    await db.SaveChangesAsync();
                }
                var task = new Models.DbModels.Task
                {
                    TaskTypeId = taskType.Id,
                    FileName = model.FileName,
                    FileType = model.FileType,
                    TaskInBytes = taskInBytes,
                    PublishDate = dateToday,
                    Deadline = model.Deadline,
                    Theme = model.Theme,
                    Comment = model.Comment,
                    TeacherSubgroupDistributionId = teacherSubgroup.Id
                };
                if (await db.Tasks.FirstOrDefaultAsync(x => x.TaskInBytes == taskInBytes && x.TeacherSubgroupDistributionId == teacherSubgroup.Id && x.Deadline == task.Deadline && x.TaskTypeId == task.TaskTypeId) == null)
                {
                    await db.Tasks.AddAsync(task);
                }
                else
                {
                    return BadRequest("Such homework already exist");
                }
                int result = await db.SaveChangesAsync();
                if (result > 0)
                {
                    return Ok("Homework task created successfully");
                }
                else
                {
                    return StatusCode(500, "Homework wasn't added for some reason");
                }
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }
    }
}
