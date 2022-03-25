using DailyDiary.Models;
using DailyDiary.Models.ViewModels;
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
    public class GroupHomeworksController : Controller
    {              
         private readonly DailyDiaryDatasContext db;
         public GroupHomeworksController(DailyDiaryDatasContext datasContext)
         {
             this.db = datasContext;
         }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<GroupHomework>>> Get()
        {
            return await db.GroupHomeworks.ToListAsync();
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<GroupHomework>> Get(int id)
        {
            var homework = await db.GroupHomeworks.FirstOrDefaultAsync(x => x.GroupHomeworkId == id);
            if (homework == null)
            {
                return NotFound();
            }
            return Ok(homework);
        }

        [HttpPut]
        //[Authorize(Roles = "MainAdmin,Admin,Teacher")]
        [HttpPost]
        //public IActionResult CreatePhoto(Base64FilesViewModel bvm)
        //{
        //    if (bvm.Photo_Base64 != null)
        //    {
        //        Base64File file = new Base64File { Name = bvm.Name };
        //        byte[] imageData = null;
        //        // считываем переданный файл в массив байтов
        //        using (var binaryReader = new BinaryReader(bvm.Photo_Base64.OpenReadStream()))
        //        {
        //            imageData = binaryReader.ReadBytes((int)bvm.Photo_Base64.Length);
        //        }
        //        // установка массива байтов
        //        file.Photo_Base64 = imageData;
        //        context.Base64Files.Add(file);
        //        context.SaveChanges();
        //        return RedirectToAction("Index");
        //    }
        //    else
        //    {
        //        return View(bvm);
        //    }
        //}
        public async Task<IActionResult> CreateOrUpdateHomeworkAsync(GroupHomeworksViewModel model)
        {
            if (ModelState.IsValid)
            {
                if (model != null)
                {

                    // тут зробити перевірку моделі
                    //if (model.Salary <= 0)
                    //{
                    //    ModelState.AddModelError("SalaryError", "Salary must be bigger than 0");
                    //}
                    //if (!ModelState.IsValid)
                    //{
                    //    //ModelState.AddModelError("DatasModelError", "Please,enter all required datas correctly");
                    //    return BadRequest(ModelState);
                    //}


                    var homeworkDatasToEdit = await db.GroupHomeworks.FirstOrDefaultAsync(x => x.GroupHomeworkId == model.GroupHomeworkId);
                    if (homeworkDatasToEdit == null)
                    {
                        var group = await db.Groups.FindAsync(model.GroupId);
                        var subject = await db.Subjects.FindAsync(model.SubjectId);
                        var teacher = await db.Teachers.FindAsync(model.TeacherId);

                        homeworkDatasToEdit = new GroupHomework
                        {
                            //SubjectId = model.SubjectId,
                            Subject = subject,
                            Theme = model.Theme,
                            //TeacherId = model.TeacherId,
                            Teacher = teacher,
                            //GroupId = model.GroupId,
                            Group = group,
                            //Homework = Encoding.ASCII.GetBytes(model.Homework),
                            //model.Homework = Encoding.ASCII.GetString(Homework);
                            Homework = model.Homework,//base64 string
                            // Published = model.Published,
                            Published = DateTime.Now,
                            Deadline = model.Deadline
                        };
                    }
                    else
                    {                        
                        //classworkDatasToEdit.GroupClassworkId = model.GroupClassworkId;
                        homeworkDatasToEdit.SubjectId = model.SubjectId;
                        homeworkDatasToEdit.Theme = model.Theme;
                        homeworkDatasToEdit.TeacherId = model.TeacherId;
                        homeworkDatasToEdit.GroupId = model.GroupId;
                        homeworkDatasToEdit.Published = model.Published;
                        homeworkDatasToEdit.Deadline = model.Deadline;
                    }
                    db.GroupHomeworks.Update(homeworkDatasToEdit);
                    await db.SaveChangesAsync();
                    return Ok(homeworkDatasToEdit);
                }
            }

            return BadRequest(ModelState);
        }
        [HttpDelete("{id}")]
        [Authorize(Roles = "MainAdmin,Admin")]
        public async Task<ActionResult<GroupHomework>> Delete(int id)
        {
            var homework = await db.GroupHomeworks.FirstOrDefaultAsync(x => x.GroupHomeworkId == id);
            if (homework == null)
            {
                return NotFound();
            }
            db.GroupHomeworks.Remove(homework);
            await db.SaveChangesAsync();
            return Ok(homework);
        }

        [HttpGet("id")]
        public async Task<ActionResult<IEnumerable<GroupHomework>>> GetBySubjectId(int id)
        {
            var homeworks = await db.GroupHomeworks.Where(x=> x.SubjectId == id).ToListAsync();
            if(homeworks== null)
            return NotFound();
            return Ok(homeworks);
        }
        [HttpGet("details")]
        public async Task<ActionResult<IEnumerable<GroupHomework>>> GetByGroupIdAndTeacherId(int groupId,int teacherId)
        {
            var homeworks = await db.GroupHomeworks.Where(x => x.GroupId == groupId && x.TeacherId == teacherId).ToListAsync();
            if (homeworks == null)
                return NotFound();
            return Ok(homeworks);
        }
        
        [HttpGet("id")]
        public async Task<ActionResult<IEnumerable<GroupHomework>>> GetByGroupId(int id)
        {
            var homeworks = await db.GroupHomeworks.Where(x => x.GroupId == id).ToListAsync();
            if (homeworks == null)
                return NotFound();
            return Ok(homeworks);
        }
        [HttpPost]
        public async Task<ActionResult<IEnumerable<GroupHomework>>> GetByTheme(GroupHomeworksViewModel model)
        {

            var homeworks = await db.GroupHomeworks.Where(x => x.Theme.ToLower() == model.Theme.ToLower()).ToListAsync();
            if (homeworks == null)
                return NotFound();
            return Ok(homeworks);
        }
        //[HttpPost]
        //public async Task<ActionResult<IEnumerable<GroupHomework>>> GetByDate(GroupHomeworksViewModel model)
        //{
        //    if(model!=null)
        //    {
        //        var homeworks = await db.GroupHomeworks.Where(x => x.Date.ToShortDateString() == model.Date.ToShortDateString()).ToListAsync();
        //        if (homeworks == null)
        //            return NotFound();
        //        return Ok(homeworks);
        //    }
        //    return BadRequest(new { error = "Model is empty"});            
        //}

        //[HttpPost]
        //public async Task<ActionResult<IEnumerable<GroupHomework>>> GetBySubjectIdAndDate(GroupHomeworksViewModel model)
        //{
        //    if (model != null)
        //    {
        //        var homeworks = await db.GroupHomeworks.Where(x => x.Date.ToShortDateString() == model.Date.ToShortDateString() && x.SubjectId == model.SubjectId).ToListAsync();
        //        if (homeworks == null)
        //            return NotFound();
        //        return Ok(homeworks);
        //    }
        //    return BadRequest(new { error = "Model is empty" });
        //}
    }
}
