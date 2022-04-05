using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using DailyDiary.Models;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using DailyDiary.Models.ViewModels;

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

        [HttpGet("{TeacherId}")]
        public async Task<ActionResult<int>> GetNotReadNews(int TeacherId)
        {
            Teacher teacher = await db.Teachers.FirstOrDefaultAsync(x => x.TeacherId == TeacherId);
            if(teacher == null)
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
                    foreach(var el in news)
                    {
                        if(el.IsRed == false)
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
            if(news == null)
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
    }
}
