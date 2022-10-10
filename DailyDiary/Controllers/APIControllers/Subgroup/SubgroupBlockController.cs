using DailyDiary.Models;
using DailyDiary.Models.DbModels;
using DailyDiary.Models.ViewModels.Subgroup;
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
    public class SubgroupBlockController : Controller
    {
        private readonly DailyDiaryDatasContext db;
        public SubgroupBlockController(DailyDiaryDatasContext datasContext)
        {
            this.db = datasContext;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<SubgroupBlock>>> GetAll()
        {
            return await db.SubgroupBlocks.ToListAsync();
        }

        [HttpPost]
        public async Task<IActionResult> Create(SubgroupBlockViewModel model)
        {
            if (String.IsNullOrWhiteSpace(model.SubgroupBlockTitle))
            {
                return BadRequest("Title for subgroup block can't be empty");
            }
            var subgroupBlockToAdd = await db.SubgroupBlocks.FirstOrDefaultAsync(x=> x.SubgroupBlockTitle.ToLower()==model.SubgroupBlockTitle.ToLower());
            if (subgroupBlockToAdd != null)
            {
                return BadRequest("Subgroup block with entered name already exist.");
            }
            await db.SubgroupBlocks.AddAsync(new SubgroupBlock { SubgroupBlockTitle = model.SubgroupBlockTitle });

            var result = await db.SaveChangesAsync();
            if (result > 0)
            {
                return Ok("Subgroup block created successfully");
            }
            else
            {
                return BadRequest("Subgroup block wasn't added");
            }
        }

    }
}
