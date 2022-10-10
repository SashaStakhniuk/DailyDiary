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
using DailyDiary.Models.DbModels;

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

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Group>>> GetAll()
        {
            return await db.Groups.ToListAsync();
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Group>>> GetAllGroupsOfCurrentStudyYear()
        {
            StudyPlanController studyPlanController = new StudyPlanController(db);
            var studyPlansIds = await studyPlanController.GetAllStudyPlansIdOfCurrentStudyYear();
            if (studyPlansIds != null)
            {
                var studyPlansId = studyPlansIds.Value.ToList();
                var groups = new List<Group>();
                foreach (var studyPlanId in studyPlansId)
                {
                    var groupsToAdd = await db.Groups.Where(x => x.StudyPlanId == studyPlanId).ToListAsync();
                    if (groupsToAdd.Count > 0)
                    {
                        groups.AddRange(groupsToAdd);
                    }
                }
                return groups;
            }
            return NotFound("No one study plan of current study year found");
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AllGroupDatasViewModel>>> GetAllGroupsDatasOfCurrentStudyYear() // навч.план, рік навчання, ід, назва групи та аудиторії, к-сть студентів у групі
        {
            var allGroupsOfCurrentStudyYear = await GetAllGroupsOfCurrentStudyYear();
            if (allGroupsOfCurrentStudyYear != null)
            {
                var groups = allGroupsOfCurrentStudyYear.Value.ToList();
                if (groups.Count > 0)
                {
                    var allGroupDatas = new List<AllGroupDatasViewModel>();
                    AllGroupDatasViewModel allGroupData = null;
                    StudyPlan studyPlan = null;
                    Auditory auditory = null;
                    Subgroup subgroup = null;
                    List<StudentsBySubgroup> students = null;
                    foreach (var group in groups)
                    {
                        allGroupData = new AllGroupDatasViewModel { GroupId = group.Id, GroupTitle = group.Title };

                        //var yearOfStudy = await db.YearOfStudy.FirstOrDefaultAsync(x=> x.Id == db.StudyPlans.Where(x => x.Id == group.StudyPlanId).Select(x=> x.YearOfStudyId).FirstOrDefault());
                        studyPlan = db.StudyPlans.Where(x => x.Id == group.StudyPlanId).Include(x => x.YearOfStudy).FirstOrDefault();
                        if (studyPlan != null)
                        {
                            allGroupData.YearOfStudy = studyPlan.YearOfStudy.YearStudy;
                            allGroupData.YearOfStudyId = studyPlan.YearOfStudyId;
                            allGroupData.StudyPlanId = studyPlan.Id;
                        }
                        auditory = await db.Auditory.FirstOrDefaultAsync(x => x.Id == group.PreferedAuditoryId);
                        if (auditory != null)
                        {
                            allGroupData.AuditoryTitle = auditory.Title;
                            allGroupData.AuditoryId = auditory.Id;
                        }
                        subgroup = await db.Subgroups.FirstOrDefaultAsync(x => x.Id == group.DefSubgroupId);
                        if (subgroup != null)
                        {
                            students = await db.StudentsBySubgroups.Where(x => x.SubgroupId == subgroup.Id).ToListAsync();
                            if (students != null)
                            {
                                allGroupData.AmountOfStudents = students.Count();
                            }
                        }
                        allGroupDatas.Add(allGroupData);
                    }
                    return allGroupDatas;
                }
            }
            return NotFound("No one group of current study year found");
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<GroupAuditoryViewModel>>> GetGroupsAuditories()
        {
            StudyPlanController studyPlanController = new StudyPlanController(db);
            var studyPlansIds = await studyPlanController.GetAllStudyPlansIdOfCurrentStudyYear();
            if (studyPlansIds != null)
            {
                var studyPlansId = studyPlansIds.Value.ToList();
                var groupsAuditories = new List<GroupAuditoryViewModel>();
                foreach (var studyPlanId in studyPlansId)
                {
                    var groups = await db.Groups.Where(x => x.StudyPlanId == studyPlanId).ToListAsync();
                    if (groups.Count > 0)
                    {
                        foreach (var group in groups)
                        {
                            if (group.PreferedAuditoryId != null)
                            {
                                var auditory = await db.Auditory.FirstOrDefaultAsync(x => x.Id == group.PreferedAuditoryId);
                                if (auditory != null)
                                {
                                    var auditoryType = await db.AuditoryType.FirstOrDefaultAsync(x => x.Id == auditory.AuditoryTypeId);
                                    if (auditoryType != null)
                                    {
                                        groupsAuditories.Add(new GroupAuditoryViewModel
                                        {
                                            GroupId = group.Id,
                                            GroupTitle = group.Title,
                                            AuditoryId = auditory.Id,
                                            AuditoryTitle = auditory.Title,
                                            AuditoryType = auditoryType.AuditoryTypeDescription
                                        });
                                    }

                                }

                            }
                        }
                    }

                }
                if (groupsAuditories.Count > 0)
                {
                    return groupsAuditories;
                }
                return NotFound("No one group has auditory");

            }
            else
            {
                return NotFound("Study plans of current study year not found");
            }
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
        public async Task<ActionResult<Group>> Create(GroupViewModel model) // не коректно працює з аудиторіями (необхідно перевіряти аудиторії усіх груп теперішнього навчального року)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    StudyPlan studyPlan = await db.StudyPlans.FirstOrDefaultAsync(x => x.Id == model.StudyPlanId); //шукаю навч план
                    if (studyPlan == null)
                    {
                        return NotFound("Study plan not found");
                    }

                    Group group = await db.Groups.FirstOrDefaultAsync(x => x.StudyPlanId == studyPlan.Id && x.Title.ToLower() == model.Title.ToLower()); // група де навчальний план = вказаному і назва написаній
                    if (group == null) // якщо не існує
                    {
                        group = new Group // створюю
                        {
                            Title = model.Title,//додаю назву
                            StudyPlan = studyPlan// додаю навч. план
                        };
                        if (model.PreferedAuditoryId > 0) // якщо вказана базова(основна) аудиторія для групи
                        {
                            var auditory = await db.Auditory.FirstOrDefaultAsync(x => x.Id == model.PreferedAuditoryId); // шукаю чи існує
                            if (auditory != null)
                            {
                                //var auditoryInGroupExist = await db.Groups.FirstOrDefaultAsync(x => x.PreferedAuditoryId == auditory.Id); // якщо аудиторія вже присвоєна якійсь групі 
                                group.Auditory = auditory; // додаю аудиторію до групи
                            }
                        }

                        await db.Groups.AddAsync(group); // додаю групу в контекст груп
                        await db.SaveChangesAsync();// зберігаю зміни в бд

                        var defSubgroupBlock = await db.SubgroupBlocks.FirstOrDefaultAsync(x => x.SubgroupBlockTitle == "Default subgroup"); // шукаю дефолтний принцип поділу групи на підгрупи
                        if (defSubgroupBlock == null) // якщо не існує такий запис
                        {
                            await db.SubgroupBlocks.AddAsync(new DM.DbModels.SubgroupBlock { SubgroupBlockTitle = "Default subgroup" }); // додаю
                            await db.SaveChangesAsync();// зберігаю зміни в бд
                        }
                        Subgroup subgroup = await db.Subgroups.FirstOrDefaultAsync(x => x.Title == $"defSubgroupFor_{group.Title}" && x.GroupId == group.Id && x.SubgroupBlock == defSubgroupBlock);
                        if (subgroup == null)
                        {
                            subgroup = new Subgroup { Title = $"defSubgroupFor_{group.Title}", Group = group, SubgroupBlock = defSubgroupBlock }; // створюю дефолтну підгрупу для групи (по ній шукаються студенти)
                            await db.Subgroups.AddAsync(subgroup); // додаю
                            await db.SaveChangesAsync(); //зберігаю
                        }
                        group.DefSubgroupId = subgroup.Id;
                        db.Groups.Update(group);
                        await db.SaveChangesAsync();

                        return Ok("Group was created");
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
        [HttpPut]
        public async Task<ActionResult<Group>> Edit(GroupViewModel model) // не коректно працює з аудиторіями (необхідно перевіряти аудиторії усіх груп теперішнього навчального року)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    StudyPlan studyPlan = await db.StudyPlans.FirstOrDefaultAsync(x => x.Id == model.StudyPlanId); //шукаю навч план
                    if (studyPlan == null)
                    {
                        return NotFound("Study plan not found");
                    }

                    Group group = await db.Groups.FirstOrDefaultAsync(x => x.Id == model.GroupId); // шукаю групу для редагування по ід
                    if (group != null) // якщо не існує
                    {
                        if (group.Title.ToLower() != model.Title.ToLower()) // якщо назва групи != назві на яку хочуть її змінити
                        {
                            if (await db.Groups.FirstOrDefaultAsync(x => x.Title.ToLower() == model.Title.ToLower()) != null) // перевіряю чи група з такою назвою існує. Якщо так
                            {
                                return BadRequest("Group with such title already exist. Try to set other title or find then edit existing group."); // повертаю помилку
                            }
                            else
                            {
                                group.Title = model.Title;//змінюю назву
                            }
                        }

                        group.StudyPlan = studyPlan;// змінюю навч. план

                        if (model.PreferedAuditoryId > 0) // якщо вказана базова(основна) аудиторія для групи
                        {
                            var auditory = await db.Auditory.FirstOrDefaultAsync(x => x.Id == model.PreferedAuditoryId); // шукаю чи існує
                            if (auditory != null) // якщо існує
                            {
                                var groupToChange = await db.Groups.FirstOrDefaultAsync(x => x.PreferedAuditoryId == auditory.Id); // шукаю чи ця аудиторія присвоєна якійсь групі
                                if (groupToChange != null)// якщо присвоєна
                                {
                                    groupToChange.PreferedAuditoryId = null; // видаляю аудиторію в знайденій групі
                                    db.Groups.Update(groupToChange); // оновлюю знайдену групу
                                }
                                group.Auditory = auditory; // додаю аудиторію до групи
                            }
                        }
                        db.Groups.Update(group);
                        await db.SaveChangesAsync();

                        var defSubgroupBlock = await db.SubgroupBlocks.FirstOrDefaultAsync(x => x.SubgroupBlockTitle == "Default subgroup"); // шукаю дефолтний принцип поділу групи на підгрупи
                        if (defSubgroupBlock == null) // якщо не існує такий запис
                        {
                            await db.SubgroupBlocks.AddAsync(new DM.DbModels.SubgroupBlock { SubgroupBlockTitle = "Default subgroup" }); // додаю
                            await db.SaveChangesAsync();// зберігаю зміни в бд
                        }

                        Subgroup subgroup = await db.Subgroups.FirstOrDefaultAsync(x => x.GroupId == group.Id && x.SubgroupBlockId == defSubgroupBlock.Id);
                        if (subgroup == null)
                        {
                            subgroup = new Subgroup { Title = $"defSubgroupFor_{model.Title}", Group = group, SubgroupBlock = defSubgroupBlock }; // створюю дефолтну підгрупу для групи (по ній шукаються студенти)
                            await db.Subgroups.AddAsync(subgroup); // додаю
                        }
                        else
                        {
                            subgroup.Title = $"defSubgroupFor_{model.Title}";
                            db.Update(subgroup);
                        }
                        await db.SaveChangesAsync(); //зберігаю

                        return Ok("Group was edited");
                    }
                    else
                    {
                        return NotFound("Group not found");
                    }

                }
                catch (Exception ex)
                {
                    return BadRequest(ex.Message);
                }
            }
            return BadRequest(ModelState);
        }

        [HttpGet("{groupId}")]
        public async Task<ActionResult<IEnumerable<SubjectsHours>>> GetGroupSubjectsById(int groupId)
        {
            try
            {
                if (groupId <= 0)
                {
                    return BadRequest("Group id can't be <= 0");
                }
                var group = await db.Groups.FirstOrDefaultAsync(x => x.Id == groupId);
                if (group != null)
                {
                    //YearOfStudyController yscontroller = new YearOfStudyController(db);
                    //var yearsOfStudy = await yscontroller.GetYearsOfStudyByCurrentStudyYear(); // навчальні роки теперішнього навчального року

                    //Додати умови знаходження конкретної групи за навчальним роком і т.п !!!!! Відображення не зовсім коректне. Для тесту->
                    var studyPlanSubjectsCollection = await db.StudyPlans.Where(x => x.Id == group.StudyPlanId).Select(x => x.SubjectsHoursCollection).FirstOrDefaultAsync();
                    if (studyPlanSubjectsCollection != null && !String.IsNullOrEmpty(studyPlanSubjectsCollection))
                    {
                        var subjectHours = JsonSerializer.Deserialize<List<SubjectsHours>>(studyPlanSubjectsCollection);

                        return subjectHours;
                    }
                    else
                    {
                        return NotFound("Study plan for this group not found");
                    }
                }
                else
                {
                    return NotFound("Group not found");
                }
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }
        [HttpDelete("{groupId:int}")]
        public async Task<IActionResult> Delete(int groupId)
        {
            try
            {
                if (groupId <= 0)
                {
                    return BadRequest("Group id can't be <= 0");
                }
                var group = await db.Groups.FirstOrDefaultAsync(x => x.Id == groupId);
                if (group != null)
                {
                    db.Groups.Remove(group);
                    var result = await db.SaveChangesAsync();
                    if (result > 0)
                        return Ok("Group (include subgroups) was deleted successfully");
                    else
                        return StatusCode(500, "Group wasn't deleted");
                }
                else
                {
                    return NotFound("Group not found");
                }
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }
    }
}
