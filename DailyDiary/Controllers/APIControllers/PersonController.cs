using DailyDiary.Models;
using DailyDiary.Models.DbModels;
using DailyDiary.Models.ViewModels;
using DailyDiary.Services;
using Microsoft.AspNetCore.Identity;
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
    public class PersonController : Controller
    {
        private readonly UserManager<User> userManager;
        private readonly RoleManager<IdentityRole> roleManager;
        private readonly DailyDiaryDatasContext db;

        public PersonController(DailyDiaryDatasContext context, UserManager<User> userManager, RoleManager<IdentityRole> roleManager)
        {
            this.userManager = userManager;
            this.roleManager = roleManager;
            this.db = context;
        }
        [HttpGet("details")]
        public async Task<ActionResult<PersonViewModel>> GetDatasIfPersonWasInRoleErlier(int personId, string role)
        {
            PersonViewModel personDatas = null;

            Person person = await db.Persons.FirstOrDefaultAsync(x => x.Id == personId);
            if (person == null)
            {
                return NotFound("Person not found");
            }
            Student student = null;
            Teacher teacher = null;
            Parent parent = null;

            switch (role)
            {
                case "Teacher":
                    teacher = await db.Teachers.FirstOrDefaultAsync(x => x.PersonId == person.Id);
                    if (teacher == null)
                    {
                        return NotFound("Teacher not found");
                    }

                    break;
                case "Student":
                    student = await db.Students.FirstOrDefaultAsync(x => x.PersonId == person.Id);
                    if (student == null)
                    {
                        return NotFound("Student not found");
                    }
                    break;
                case "Parent":
                    parent = await db.Parents.FirstOrDefaultAsync(x => x.PersonId == person.Id);
                    if (parent == null)
                    {
                        return NotFound("Parent not found");
                    }
                    break;

            }
            if (teacher != null)
            {
                personDatas = new PersonViewModel
                {
                    Category = teacher.Category,
                    Degree = teacher.Degree,
                    Education = teacher.Education,
                    Speciality = teacher.Speciality,
                    TeacherId = teacher.Id
                };
            }
            if (student != null)
            {
                personDatas = new PersonViewModel
                {
                    AdmissionDate = student.AdmissionDate,
                    StudentId = student.Id
                };
            
            }
            if (personDatas != null)
            {
                return Ok(personDatas);
            }
            else
            {
                return NotFound("Person wasn't in this role erlier");
            }
        }
        [HttpGet("{personId}")]
        public async Task<ActionResult<string>> GetUserLogin(int personId)
        {
            Person person = await db.Persons.Where(x => x.Id == personId).FirstOrDefaultAsync();
            if (person == null)
            {
                return BadRequest(new { error = "Person not found" });
            }
            User user = await userManager.FindByIdAsync(person.UserId);
            if (user == null)
            {
                return BadRequest(new { error = "User not found" });
            }
            return Ok(user.UserName);
            //return Ok(new string[] { user.UserName , user.Id});
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PersonViewModel>>> GetAll()
        {
            List<PersonViewModel> personToDisplay = new List<PersonViewModel>();
            List<Person> persons = await db.Persons.ToListAsync();
            foreach (Person person in persons)
            {
                User user = await userManager.FindByIdAsync(person.UserId);
                if (user != null)
                {
                    IList<string> roles = await userManager.GetRolesAsync(user); // ролі користувача
                    Teacher teacher = null;
                    Student student = null;
                    Parent parent = null;

                    foreach (string role in roles)
                    {
                        switch (role)
                        {
                            case "Teacher":
                                teacher = await db.Teachers.Where(x => x.PersonId == person.Id).FirstOrDefaultAsync();
                                break;
                            case "Student":
                                student = await db.Students.Where(x => x.PersonId == person.Id).FirstOrDefaultAsync();
                                break;
                            case "Parent":
                                parent = await db.Parents.Where(x => x.PersonId == person.Id).FirstOrDefaultAsync();
                                break;
                        }
                    }
                    PersonViewModel personToAdd = new PersonViewModel
                    {
                        PersonId = person.Id,
                        Name = person.Name,
                        LastName = person.LastName,
                        MiddleName = person.MiddleName,
                        Email = user.Email,
                        PhoneNumber = user.PhoneNumber,
                        Address = person.Address,
                        Base64URL = person.Base64URL,
                        Birthday = person.Birthday,
                        Roles = roles.ToList()
                    };

                    if (teacher != null)
                    {
                        personToAdd.TeacherId = teacher.Id;
                        personToAdd.Speciality = teacher.Speciality;
                        personToAdd.Category = teacher.Category;
                        personToAdd.Degree = teacher.Degree;
                        personToAdd.Education = teacher.Education;
                    }
                    if (student != null)
                    {
                        personToAdd.StudentId = student.Id;
                    }
                    if (parent != null)
                    {
                        personToAdd.ParentId = parent.Id;
                    }
                    personToDisplay.Add(personToAdd);
                }
            }
            //PersonViewModel personsToDisplay = new PersonViewModel();
            //foreach(Person person in persons)
            //{
            //    personsToDisplay.
            //    var roles = await userManager.GetRolesAsync(await userManager.FindByIdAsync(person.UserId));

            //}
            if (personToDisplay.Count() > 0)
            {
                return personToDisplay;
            }
            return NotFound(new { error = "No one person found" });
        }

        [HttpPost]
        public async Task<IActionResult> CreateNew(PersonViewModel model)
        {
            try
            {
                if (await userManager.FindByEmailAsync(model.Email) != null) // перевірка чи іcнує такий е-mail
                {
                    throw new Exception("Email already registered");
                    //return BadRequest(new { error = "Email already registered" });
                }
                if (model.Roles.Count() == 0) // якщо немає ролей повертаю помилку
                {
                    throw new Exception("You should set at least 1 role for this user");
                }
                if (model.Birthday < DateTime.Now.AddYears(-80) || model.Birthday >= DateTime.Now)
                {
                    throw new Exception("Birthday date can't be erlier than 80 years before this year and later or equal this year.");
                }

                GeneratorService generatorService = new GeneratorService(userManager);
                string login = await generatorService.GenerateNewLogin(model.LastName); // генерація логіну
                string password = generatorService.CreatePassword(); // генерація паролю

                User user = new User { Email = model.Email, PhoneNumber = model.PhoneNumber, UserName = login }; //створюю юзера
                var userCreated = await userManager.CreateAsync(user, password);

                if (userCreated.Succeeded)
                {
                    IdentityResult roleAdded = await userManager.AddToRolesAsync(user, model.Roles); // додаю роль юзеру
                    if (!roleAdded.Succeeded)
                    {
                        await userManager.DeleteAsync(user);
                        throw new Exception("Role(s) for this user wasn't added. User wasn't created. Try again");
                    }
                    Person personToAdd = new Person // створюю персону
                    {
                        User = user, // роблю посилання на його запис в таблиці User
                        Name = model.Name,
                        LastName = model.LastName,
                        MiddleName = model.MiddleName,
                        Address = model.Address,
                        Birthday = model.Birthday,
                        Base64URL = model.Base64URL
                    };
                    Person personExist = await db.Persons.Where(x => x.User == user).FirstOrDefaultAsync();
                    if (personExist != null)
                    {
                        throw new Exception("Person is already exist.");
                    }
                    await db.Persons.AddAsync(personToAdd);
                    await db.SaveChangesAsync();

                    foreach (string role in model.Roles) // для кожної ролі
                    {
                        switch (role)
                        {
                            case "Teacher": // якщо роль 'Teacher'
                                            //перевіряю чи всі необхідні поля існують
                                if (String.IsNullOrEmpty(model.Speciality))
                                {
                                    throw new Exception("Teacher specialty can't be empty.");
                                }
                                if (String.IsNullOrEmpty(model.Category))
                                {
                                    throw new Exception("Teacher category can't be empty.");
                                }
                                if (String.IsNullOrEmpty(model.Degree))
                                {
                                    throw new Exception("Teacher degree can't be empty.");
                                }
                                if (String.IsNullOrEmpty(model.Education))
                                {
                                    throw new Exception("Teacher education can't be empty.");
                                }
                                Teacher teacher = new Teacher // створюю Викладача
                                {
                                    Person = personToAdd, // роблю посилання на його запис в таблиці Person
                                    Category = model.Category,
                                    Degree = model.Degree,
                                    Education = model.Education,
                                    Speciality = model.Speciality
                                };
                                Teacher teacherExist = await db.Teachers.Where(x => x.Person == personToAdd).FirstOrDefaultAsync();
                                if (teacherExist != null)
                                {
                                    throw new Exception("Teacher is already exist.");
                                }
                                await db.Teachers.AddAsync(teacher);
                                break;
                            case "Student": // якщо роль Student
                                if (String.IsNullOrEmpty(model.AdmissionDate.ToString()))
                                {
                                    throw new Exception("Student admissionDate can't be empty.");
                                }
                                if (model.AdmissionDate < DateTime.Now.AddYears(-12) || model.AdmissionDate >= DateTime.Now.AddYears(1))
                                {
                                    throw new Exception("AdmissionDate can't be erlier than 12 years before this year and later than 1 year after this year.");
                                }
                                Student student = new Student // cтворюю студента
                                {
                                    Person = personToAdd,// роблю посилання на його запис в таблиці Person
                                    AdmissionDate = model.AdmissionDate
                                };
                                Student studentExist = await db.Students.Where(x => x.Person == personToAdd).FirstOrDefaultAsync();
                                if (studentExist != null)
                                {
                                    throw new Exception("Student is already exist.");
                                }
                                await db.Students.AddAsync(student);
                                break;
                            case "Parrent":
                                Parent parent = new Parent
                                {
                                    Person = personToAdd // роблю посилання на його запис в таблиці Person
                                };// cтворюю студента
                                Parent parentExist = await db.Parents.Where(x => x.Person == personToAdd).FirstOrDefaultAsync();
                                if (parentExist != null)
                                {
                                    throw new Exception("Parent is already exist.");
                                }
                                await db.Parents.AddAsync(parent);
                                break;
                        }
                    }

                    await db.SaveChangesAsync(); // зберігаю дані
                    return Ok();
                }

            }
            catch (Exception e)
            {
                return BadRequest(new { error = e.Message });
            }
            return BadRequest();
        }
        [HttpPut]
        public async Task<IActionResult> EditPerson(PersonViewModel model)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    Person personToEdit = await db.Persons.Where(x => x.Id == model.PersonId).FirstOrDefaultAsync();
                    if (personToEdit == null)
                    {
                        throw new Exception("Person not found.");
                    }
                    User userToEdit = await userManager.FindByIdAsync(personToEdit.UserId);
                    if (userToEdit == null) // перевірка чи іcнує такий е-mail
                    {
                        throw new Exception("User not found");
                        //return BadRequest(new { error = "Email already registered" });
                    }
                    if (String.IsNullOrEmpty(model.Address))
                    {
                        throw new Exception("You have to enter the address");
                    }
                    if (model.Birthday < DateTime.Now.AddYears(-80) || model.Birthday >= DateTime.Now)
                    {
                        throw new Exception("Birthday date can't be erlier than 80 years before this year and later or equal this year.");
                    }
                    userToEdit.Email = model.Email;
                    userToEdit.PhoneNumber = model.PhoneNumber;
                    userToEdit.UserName = model.Login;
                    var result = await userManager.UpdateAsync(userToEdit);
                    if (!result.Succeeded)
                    {
                        return BadRequest(result.Errors);
                    }
                    var userRoles = await userManager.GetRolesAsync(userToEdit); // дістаю усі ролі користувача
                    var removedRoles = userRoles.Except(model.Roles); // ролі, треба видалити
                    var addedRoles = model.Roles.Except(userRoles); // список ролей, які були додані (без ролей які вже співпадають з ролями користувача)

                    await userManager.RemoveFromRolesAsync(userToEdit, removedRoles); //видаляю зайві
                    await userManager.AddToRolesAsync(userToEdit, addedRoles); // додаю нові

                    personToEdit.Name = model.Name;
                    personToEdit.LastName = model.LastName;
                    personToEdit.MiddleName = model.MiddleName;
                    personToEdit.Address = model.Address;
                    personToEdit.Birthday = model.Birthday;
                    personToEdit.Base64URL = model.Base64URL;
                    db.Persons.Update(personToEdit);
                    await db.SaveChangesAsync();

                    foreach (string role in model.Roles) // для кожної ролі
                    {

                        //if(! await userManager.IsInRoleAsync(userToEdit, role))
                        // {

                        // }
                        switch (role)
                        {
                            case "Teacher": // якщо роль 'Teacher'

                                //перевіряю чи всі необхідні поля існують
                                if (String.IsNullOrEmpty(model.Speciality))
                                {
                                    throw new Exception("Teacher specialty can't be empty.");
                                }
                                if (String.IsNullOrEmpty(model.Category))
                                {
                                    throw new Exception("Teacher category can't be empty.");
                                }
                                if (String.IsNullOrEmpty(model.Degree))
                                {
                                    throw new Exception("Teacher degree can't be empty.");
                                }
                                if (String.IsNullOrEmpty(model.Education))
                                {
                                    throw new Exception("Teacher education can't be empty.");
                                }
                                Teacher teacherExist = await db.Teachers.Where(x => x.Person == personToEdit).FirstOrDefaultAsync(); // запис, в якому ід персони = ід персони, що треба відредагувати
                                if (teacherExist == null)
                                {
                                    Teacher teacher = new Teacher // створюю Викладача
                                    {
                                        Person = personToEdit, // роблю посилання на його запис в таблиці Person
                                        Category = model.Category,
                                        Degree = model.Degree,
                                        Education = model.Education,
                                        Speciality = model.Speciality
                                    };
                                    await db.Teachers.AddAsync(teacher);
                                }
                                else
                                {
                                    teacherExist.Person = personToEdit; // роблю посилання на його запис в таблиці Person
                                    teacherExist.Category = model.Category;
                                    teacherExist.Degree = model.Degree;
                                    teacherExist.Education = model.Education;
                                    teacherExist.Speciality = model.Speciality;
                                    db.Teachers.Update(teacherExist);
                                }


                                break;
                            case "Student": // якщо роль Student
                                if (String.IsNullOrEmpty(model.AdmissionDate.ToString()))
                                {
                                    throw new Exception("Student admissionDate can't be empty.");
                                }
                                if (model.AdmissionDate < DateTime.Now.AddYears(-12) || model.AdmissionDate >= DateTime.Now.AddYears(1))
                                {
                                    throw new Exception("AdmissionDate can't be erlier than 12 years before this year and later than 1 year after this year.");
                                }
                                Student student = new Student // cтворюю студента
                                {
                                    //Person = personToEdit,// роблю посилання на його запис в таблиці Person
                                    AdmissionDate = model.AdmissionDate
                                };
                                Student studentExist = await db.Students.Where(x => x.Person == personToEdit).FirstOrDefaultAsync();
                                if (studentExist == null)
                                {
                                    await db.Students.AddAsync(student);
                                }
                                else
                                {
                                    //studentExist.Person = personToEdit;// роблю посилання на його запис в таблиці Person
                                    studentExist.AdmissionDate = model.AdmissionDate;
                                    db.Students.Update(studentExist);
                                }
                                break;
                            case "Parrent":
                                Parent parent = new Parent
                                {
                                    Person = personToEdit // роблю посилання на його запис в таблиці Person
                                };// cтворюю студента
                                Parent parentExist = await db.Parents.Where(x => x.Person == personToEdit).FirstOrDefaultAsync();
                                if (parentExist == null)
                                {
                                    await db.Parents.AddAsync(parent);
                                }
                                else
                                {
                                    //parentExist.Person = personToEdit; // роблю посилання на його запис в таблиці Person
                                    db.Parents.Update(parentExist);
                                }
                                break;
                        }
                    }
                    await db.SaveChangesAsync();
                    return Ok();
                }
                else
                {
                    return BadRequest(ModelState);
                }
            }
            catch (Exception e)
            {
                return BadRequest(new { error = e.Message });
            }
        }
    }
}
