using DM = DailyDiary.Models;
using DailyDiary.Models;
using DailyDiary.Models.ViewModels;
using DailyDiary.Models.ViewModels.Group;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Text.Json;

namespace DailyDiary.Controllers.APIControllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class GroupController : Controller
    {
        private readonly DailyDiaryDatasContext db;

        public GroupController(DailyDiaryDatasContext db)
        {
            this.db = db;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Group>>> Get()
        {
            return await db.Groups.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Group>> Get(int id)
        {
            var group = await db.Groups.FirstOrDefaultAsync(x => x.Id == id);
            if (group != null)
            {
                return Ok(group);
            }
            return NotFound(new { error = "Group not found" });
        }

        //[HttpGet("{id}")]
        //public async Task<ActionResult<Group>> GetStudents(int id)
        //{
        //    var groups = await db.Groups
        //            .Include(c => c.Students)
        //            .ToListAsync();
        //    Group group = groups.FirstOrDefault(x => x.Id == id);
        //    return Ok(group);
        //}

        [HttpPost]
        public async Task<ActionResult<Group>> Create(GroupViewModel model)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    StudyPlan studyPlan = await db.StudyPlans.FirstOrDefaultAsync(x => x.Id == model.StudyPlanId);
                    if(studyPlan == null)
                    {
                        return NotFound("Study plan not found");
                    }

                    Group group = await db.Groups.FirstOrDefaultAsync(x => x.StudyPlanId == studyPlan.Id && x.Title.ToLower()==model.Title.ToLower());
                    if (group == null)
                    {
                        group = new Group
                        {
                            Title = model.Title,
                            StudyPlan = studyPlan
                        };
                        if (model.PreferedAuditoryId > 0)
                        {
                            var auditory = await db.Auditory.FirstOrDefaultAsync(x=> x.Id == model.PreferedAuditoryId);
                            if (auditory != null)
                            {
                                group.Auditory = auditory;
                            }
                        }
                       
                        await db.Groups.AddAsync(group);
                        await db.SaveChangesAsync();

                        var defSubgroupBlock = await db.SubgroupBlocks.FirstOrDefaultAsync(x=> x.SubgroupBlockTitle == "Default subgroup");
                        Subgroup subgroup = new Subgroup { Title = $"defSubgroupFor_{group.Title}", Group = group, SubgroupBlock = defSubgroupBlock };
                        await db.Subgroups.AddAsync(subgroup);
                        await db.SaveChangesAsync();

                        group.DefSubgroupId = subgroup.Id;
                        db.Groups.Update(group);
                        await db.SaveChangesAsync();

                        return Ok();
                    }
                    else
                    {
                        return BadRequest("Group already exist");
                    }

                }
                catch (Exception ex)
                {
                    return BadRequest(ex.Message);
                }
            }
            return BadRequest(ModelState);
        }

        //[HttpGet("id")]
        //public async Task<ActionResult<IEnumerable<Student>>> GetGroupStudentsById(int id)
        //{
        //    var students = await db.Students.Where(x => x.GroupId == id).ToListAsync();
        //    if (students != null)
        //    {
        //        return Ok(students);
        //    }
        //    return NotFound(new { error = "No one student found" });
        //}

        //[HttpGet("id")]
        //public async Task<ActionResult<IEnumerable<Teacher>>> GetGroupTeachersById(int id)
        //{
        //    IEnumerable<int> groupTeachersId = await db.TeacherGroups.Where(x => x.GroupId == id).Select(x => x.TeacherId).ToListAsync();
        //    if (groupTeachersId != null)
        //    {
        //        var teachers = new List<Teacher>();
        //        foreach (var groupTeacherId in groupTeachersId)
        //        {
        //            teachers.Add(await db.Teachers.FirstOrDefaultAsync(x => x.TeacherId == groupTeacherId));
        //        }
        //        return Ok(teachers);
        //    }
        //    return NotFound(new { error = "No one teacher found" });
        //}

        [HttpGet("{groupId}")]
        public async Task<ActionResult<IEnumerable<SubjectsHours>>> GetGroupSubjectsById(int groupId)
        {
            try
            {
                var group = await db.Groups.FirstOrDefaultAsync(x=> x.Id==groupId);
                if (group != null)
                {
                    //Додати умови знаходження конкретної групи за навчальним роком і т.п !!!!! Відображення не зовсім коректне. Для тесту->
                    var studyPlanSubjectsCollection = await db.StudyPlans.Where(x => x.Id == group.StudyPlanId).Select(x => x.SubjectsHoursCollection).FirstOrDefaultAsync();
                    if (studyPlanSubjectsCollection != null && !String.IsNullOrEmpty(studyPlanSubjectsCollection))
                    {
                        var subjectHours = JsonSerializer.Deserialize<List<SubjectsHours>>(studyPlanSubjectsCollection);

                        return subjectHours;
                    }
                    else
                    {
                        throw new Exception("Study plan for this group not found");
                    }
                }
                else
                {
                    throw new Exception("Group not found");
                }
            }
            catch (Exception e)
            {
                return NotFound(new { error = e.Message });
            }
        }
    }
}
