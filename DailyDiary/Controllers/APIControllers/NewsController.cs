using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using DailyDiary.Models;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

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


    }
}
