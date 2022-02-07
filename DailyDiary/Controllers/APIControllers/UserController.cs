using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DailyDiary.Controllers.APIControllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class UserController : Controller
    {

        [HttpGet]
        public IEnumerable<string> GetAll()
        {
            List<string> strings = new List<string>();
            strings.Add("User1");
            strings.Add("User2");
            strings.Add("User3");
            return strings;
        }
    }
}
