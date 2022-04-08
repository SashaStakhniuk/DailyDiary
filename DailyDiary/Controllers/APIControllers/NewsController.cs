using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using DailyDiary.Models;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using DailyDiary.Models.ViewModels;
using DailyDiary.Models.ViewModels.News;

namespace DailyDiary.Controllers.APIControllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class NewsController : Controller
    {

        private readonly DailyDiaryDatasContext db;

        public NewsController(DailyDiaryDatasContext datasContext)
        {
            this.db = datasContext;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<News>>> GetTeacherNewssById(int id)
        {
            List<News> news = new List<News>();
            var teachersNews = await db.TeacherNews.Where(x => x.TeacherId == id).Select(x => x.NewsId).ToListAsync();
            if (teachersNews.Count != 0)
            {
                foreach (var teacherNew in teachersNews)
                {
                    news.Add(await db.News.FirstOrDefaultAsync(x => x.Id == teacherNew));
                }
                return Ok(news);
            }
            return NotFound(new { error = "Teacher's groups not found" });
        }

        [HttpPost]
        public async Task<ActionResult<bool>> SandMessageForStudent(StudentNewsViewModel model)
        {
            Student student = await db.Students.FirstOrDefaultAsync(x => x.StudentId == model.StudentId);
            if(student == null)
            {
                return NotFound();
            }
            else
            {
                News news = new News { Title = model.Title, DataPublication = model.DataPublication, MainInfo = model.MainInfo, Sender = model.Sender, Base64Url = model.Base64Url, IsRed = false };
                db.News.Add(news);
                StudentNews studentNews = new StudentNews { Student = student, News = news };
                db.StudentNews.Add(studentNews);
                await db.SaveChangesAsync();
                return Ok(true);
            }
        }

        [HttpPost]
        public async Task<ActionResult<bool>> SendForAllStudents(StudentNewsViewModel model)
        {
            List<Student> students = await db.Students.ToListAsync();
            foreach(var student in students)
            {
                News news = new News { Title = model.Title, DataPublication = model.DataPublication, MainInfo = model.MainInfo, Sender = model.Sender, Base64Url = model.Base64Url, IsRed = false };
                db.News.Add(news);
                StudentNews studentNews = new StudentNews { Student = student, News = news };
                db.StudentNews.Add(studentNews);
            }
            await db.SaveChangesAsync();
            return Ok(true);
        }

        [HttpPost]
        public async Task<ActionResult<bool>> SendMessageForTeacher(NewsViewModel model)
        {
            Teacher teacher = await db.Teachers.FirstOrDefaultAsync(x => x.TeacherId == model.TeacherId);
            if (teacher == null)
            {
                return NotFound(false);
            }
            else
            {
                News news = new News { Title = model.Title, DataPublication = model.DataPublication, MainInfo = model.MainInfo, Sender = model.Sender, Base64Url = model.Base64Url, IsRed = false };
                db.News.Add(news);
                TeacherNews teacherNews = new TeacherNews { Teacher = teacher, News = news };
                db.TeacherNews.Add(teacherNews);
                await db.SaveChangesAsync();
                return Ok(true);
            }
        }

        [HttpPost]
        public async Task<ActionResult<bool>> SendForAllTeachers(NewsViewModel model) 
        {
            List<Teacher> teachers = await db.Teachers.ToListAsync();

            foreach(var teacher in teachers)
            {
                News news = new News { Title = model.Title, DataPublication = model.DataPublication, MainInfo = model.MainInfo, Sender = model.Sender, Base64Url = model.Base64Url, IsRed = false };
                db.News.Add(news);
                TeacherNews teacherNews = new TeacherNews { Teacher = teacher, News = news };
                db.TeacherNews.Add(teacherNews);
            }
            await db.SaveChangesAsync();
            return Ok(true);
        }

        [HttpGet("{id}/{newsSkip}")]
        public async Task<ActionResult<IEnumerable<News>>> GetRangTeacherNewssById(int id, int newsSkip)
        {
            List<News> news = new List<News>();
            var teachersNews = await db.TeacherNews.Where(x => x.TeacherId == id).Select(x => x.NewsId).ToListAsync();
            if (teachersNews.Count != 0)
            {
                foreach (var teacherNew in teachersNews)
                {
                    news.Add(await db.News.FirstOrDefaultAsync(x => x.Id == teacherNew));
                }
                if (news.Count() > 0)
                {
                    return Ok(news.OrderByDescending(n => n.Id).Skip(newsSkip).Take(5).ToList());
                }
                else
                {
                    return Ok(false);
                }
            }
            return NotFound(new { error = "Teacher's groups not found" });
        }

        [HttpGet("{StudentId}")]
        public async Task<ActionResult<int>> GetNotStudentReadNews(int StudentId)
        {
            Student student = await db.Students.FirstOrDefaultAsync(x => x.StudentId == StudentId);
            if(student == null)
            {
                return NotFound();
            }
            else
            {

                int count = 0;
                List<News> news = new List<News>();
                var studentNews = await db.StudentNews.Where(x => x.StudentId == StudentId).Select(x => x.NewsId).ToListAsync();
                if (studentNews.Count() != 0)
                {
                    foreach (var studentNewID in studentNews)
                    {
                        news.Add(await db.News.FirstOrDefaultAsync(x => x.Id == studentNewID));
                    }
                    foreach (var studentNew in news)
                    {
                        if(studentNew.IsRed == false)
                        {
                            count++;
                        }
                    }

                    return Ok(count);

                }

                // Поиск В промежуточной табоице 
                /*int count = 0;
                List<News> news = new List<News>();
                var studentNews = await db.StudentNews.Where(x => x.StudentId == StudentId).ToListAsync();
                foreach(var studentMews in studentNews)
                {
                    if(studentMews.isRead == false)
                    {
                        count++;
                    }
                }*/
                return Ok(count);
            }
            return BadRequest();
        }

        [HttpGet("{TeacherId}")]
        public async Task<ActionResult<int>> GetNotReadNews(int TeacherId)
        {
            Teacher teacher = await db.Teachers.FirstOrDefaultAsync(x => x.TeacherId == TeacherId);
            if (teacher == null)
            {
                return NotFound();
            }
            else
            {
                int count = 0;
                List<News> news = new List<News>();
                var teachersNews = await db.TeacherNews.Where(x => x.TeacherId == TeacherId).Select(x => x.NewsId).ToListAsync();
                if (teachersNews.Count != 0)
                {
                    foreach (var teacherNew in teachersNews)
                    {
                        news.Add(await db.News.FirstOrDefaultAsync(x => x.Id == teacherNew));
                    }
                    foreach (var el in news)
                    {
                        if (el.IsRed == false)
                        {
                            count++;
                        }
                    }
                    return Ok(count);
                }
            }
            return BadRequest();
        }

        [HttpGet("{NewsId}")]
        public async Task<ActionResult<bool>> NewsIsRead(int NewsId)
        {
            News news = await db.News.FirstOrDefaultAsync(x => x.Id == NewsId);
            if (news == null)
            {
                return NotFound(false);
            }
            else
            {
                news.IsRed = true;
                await db.SaveChangesAsync();
                return Ok(true);
            }
        }

        [HttpGet("{NewsId}")]
        public async Task<ActionResult<bool>> NewsStudentIsRead(int NewsId)
        {

            // ! Если искать в промежуточной таблице 

            /*StudentNews studentNews = await db.StudentNews.FirstOrDefaultAsync(x => x.StudentId == id && x.NewsId == NewsId);
            if(studentNews == null)
            {
                return NotFound(false);
            }
            else
            {
                studentNews.isRead = true;
                await db.SaveChangesAsync();
                return Ok(true);
            }*/

            News news = await db.News.FirstOrDefaultAsync(x => x.Id == NewsId);
            if (news == null)
            {
                return NotFound(false);
            }
            else
            {
                news.IsRed = true;
                await db.SaveChangesAsync();
                return Ok(true);
            }
        }

        [HttpGet("{id}/{newsSkip}")]
        public async Task<ActionResult<IEnumerable<News>>> GetRangStudentNewssById(int id, int newsSkip)
        {
            List<News> news = new List<News>();
            var studentNews = await db.StudentNews.Where(x => x.StudentId == id).Select(x => x.NewsId).ToListAsync();
            if (studentNews.Count != 0)
            {
                foreach (var studentNew in studentNews)
                {
                    news.Add(await db.News.FirstOrDefaultAsync(x => x.Id == studentNew));
                }
                if (news.Count() > 0)
                {
                    return Ok(news.OrderByDescending(n => n.Id).Skip(newsSkip).Take(5).ToList());
                }
                else
                {
                    return Ok(false);
                }
            }
            return NotFound(new { error = "Student's groups not found" });
        }
    }
}
