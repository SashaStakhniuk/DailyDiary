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
using DailyDiary.Models.ViewModels.Subgroup;

namespace DailyDiary.Controllers.APIControllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class SubgroupController : Controller
    {
        private readonly DailyDiaryDatasContext db;

        public SubgroupController(DailyDiaryDatasContext db)
        {
            this.db = db;
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<Subgroup>> Get(int id)
        {
            var group = await db.Subgroups.FirstOrDefaultAsync(x => x.Id == id);
            if (group != null)
            {
                return Ok(group);
            }
            return NotFound(new { error = "Group not found" });
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Subgroup>>> GetAll()
        {
            return await db.Subgroups.ToListAsync();
        }
        [HttpGet("{groupId}")]
        public async Task<ActionResult<IEnumerable<Subgroup>>> GetAllByGroupId(int groupId)
        {
            var groups = await db.Subgroups.Where(x => x.GroupId == groupId).ToListAsync();
            if (groups != null)
            {
                return groups;
            }
            return NotFound("No one subgroup found");
        }
        [HttpGet("{groupId}")]
        public async Task<ActionResult<IEnumerable<Subgroup>>> GetAllExceptDefaultByGroupId(int groupId)
        {
            var group = await db.Groups.Include(x => x.Subgroups).FirstOrDefaultAsync(x => x.Id == groupId);
            if (group == null)
            {
                return NotFound("Group not found");
            }
            //var subgroups = await db.Subgroups.Where(x => x.Id != group.DefSubgroupId && x.GroupId == group.Id).ToListAsync();
            var subgroups = group.Subgroups.Where(x => x.Id != group.DefSubgroupId && x.GroupId == group.Id).ToList();
            if (subgroups != null)
            {
                foreach (var subgroup in subgroups)
                {
                    subgroup.Group = null;
                }
                return subgroups;
            }
            return NotFound("No one subgroup found");
        }
        [HttpPost]
        public async Task<IActionResult> AddStudents(StudentsBySubroupsDistributionViewModel model) // розподілення студентів групи по підгрупах
        {
            try
            {
                if (model.StudentsId.Count == 0) // якщо не обрано ніодного студента
                {
                    return NotFound("No one student selected");
                } 

                var group = await db.Groups.FirstOrDefaultAsync(x => x.Id == model.GroupId); // шукаю групу
                if (group == null)
                {
                    return NotFound("Group not found");
                }
                var subgroup = await db.Subgroups.FirstOrDefaultAsync(x => x.Id == model.SubgroupId && x.GroupId == group.Id); // шукаю підгрупу групи
                if (subgroup == null)
                {
                    return NotFound("Subgroup not found");
                }

                //foreach (var studentId in model.StudentsId) // для кожного ід студента
                //{
                //    var studentToAdd = await db.Students.FirstOrDefaultAsync(x => x.Id == studentId); // шукаю студента
                //    if (studentToAdd != null)
                //    {
                //        var studentInSubgroupExist = await db.StudentsBySubgroups.FirstOrDefaultAsync(x=> x.StudentId == studentId && x.SubgroupId == subgroup.Id); // шукаю чи в підгрупі студент вже існує
                //        if (studentInSubgroupExist == null)
                //        {
                //            await db.StudentsBySubgroups.AddAsync(new StudentsBySubgroup { Student = studentToAdd, Subgroup = subgroup });
                //        }
                //    }
                //}

                var otherSubgroupsIdTheSameDistributeBlock = await db.Subgroups.Where(x => x.GroupId == group.Id && x.SubgroupBlockId == subgroup.SubgroupBlockId).Select(x => x.Id).ToListAsync(); // шукаю усі підгрупи даного блоку поділу
                int existingStudentAmount = 0; //кількість студентів серед обраних(ті які потрібно додати в підгрупу), вже розподілені в іншу групу цього блоку
                bool oneOrMoreStudentInSubgroupSameBlockExist = false; // перевірка чи студент існує в будь-якій іншій підгрупі цього блоку

                foreach (int studentId in model.StudentsId) // для кожного ід студента
                {
                    var studentToAdd = await db.Students.FirstOrDefaultAsync(x => x.Id == studentId); // шукаю студента
                    if (studentToAdd != null) // якщо існує
                    {
                        foreach(int subgroupId in otherSubgroupsIdTheSameDistributeBlock) // перевіряю чи існує цей студент в будь-якій іншій підгрупі цього ж блоку (студент може одночасно знаходитись в тільки в одній підгрупі певного блоку поділу
                        {
                            var studentInSubgroupExist = await db.StudentsBySubgroups.FirstOrDefaultAsync(x => x.StudentId == studentId && x.SubgroupId == subgroupId); // шукаю чи в підгрупі студент вже існує
                            if (studentInSubgroupExist != null)
                            {
                                oneOrMoreStudentInSubgroupSameBlockExist = true;
                                existingStudentAmount++;
                                break;
                            }
                        }
                        if (!oneOrMoreStudentInSubgroupSameBlockExist) // якщо ні в одній з підгруп цього блоку поділу студент не існує
                        {
                            await db.StudentsBySubgroups.AddAsync(new StudentsBySubgroup { Student = studentToAdd, Subgroup = subgroup }); // додаю у потрібну підгрупу
                        }
                        else
                        {
                            oneOrMoreStudentInSubgroupSameBlockExist = false;
                        }
                    }
                }
                var result = await db.SaveChangesAsync();
                if (result > 0)
                {
                    string toDisplay = "Student was added successfully.";
                    if (existingStudentAmount > 0)
                    {
                        toDisplay += $" {existingStudentAmount} from {model.StudentsId.Count} wasn't added. This student exist in this or other subgroups";
                    }
                    return Ok(toDisplay);
                }
                else
                {
                    return BadRequest("Student(s) already present in group");
                }
                //return StatusCode(500);
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }
        [HttpPost]
        public async Task<IActionResult> Create(SubgroupViewModel model)
        {
            try
            {
                if (String.IsNullOrWhiteSpace(model.SubgroupTitle))
                {
                    return BadRequest("Subgroup title can't be empty");
                }
                if (String.IsNullOrWhiteSpace(model.SubgroupBlockTitle))
                {
                    return BadRequest("Subgroup block title can't be empty");
                }
                var group = await db.Groups.FirstOrDefaultAsync(x => x.Id == model.GroupId);
                if (group == null)
                {
                    return NotFound("Group not found");
                }

                var subgroup = await db.Subgroups.FirstOrDefaultAsync(x => x.Title.ToLower() == model.SubgroupTitle.ToLower().Replace(" ", "_") && x.GroupId == group.Id);
                if (subgroup != null)
                {
                    return NotFound("Subgroup with entered name already exist for this group. Enter other title for subgroup.");
                }

                var subgroupBlock = await db.SubgroupBlocks.FirstOrDefaultAsync(x => x.SubgroupBlockTitle.ToLower().Replace(" ", string.Empty) == model.SubgroupBlockTitle.ToLower().Replace(" ", string.Empty));
                if (subgroupBlock == null)
                {
                    await db.SubgroupBlocks.AddAsync(new SubgroupBlock { SubgroupBlockTitle = model.SubgroupBlockTitle });
                    await db.SaveChangesAsync();
                }
                await db.Subgroups.AddAsync(new Subgroup { Title =  model.SubgroupTitle.Replace(" ", "_"), Group = group, SubgroupBlock = subgroupBlock});
                var result = await db.SaveChangesAsync();
                if (result > 0)
                {
                    return Ok();
                }
                else
                {
                    return StatusCode(500,"Subgroup wasn't added");
                }
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }
        [HttpDelete("{subgroupId:int}")]
        public async Task<IActionResult> Delete(int subgroupId)
        {
            try
            {
                if (subgroupId <= 0)
                {
                    return BadRequest("Subgroup id can't be <= 0");
                }
                var subgroup = await db.Subgroups.FirstOrDefaultAsync(x => x.Id == subgroupId);
                if (subgroup != null)
                {
                    db.Subgroups.Remove(subgroup);
                    var result = await db.SaveChangesAsync();
                    if (result > 0)
                        return Ok("Subgroup was deleted successfully");
                    else
                        return StatusCode(500, "Subgroup wasn't deleted");
                }
                else
                {
                    return NotFound("Subgroup not found");
                }
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }
    }
}