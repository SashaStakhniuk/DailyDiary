using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using DailyDiary.Models.DbModels;
using DailyDiary.Models.IntermediateModels;


namespace DailyDiary.Models
{
    public static class InitialIdentity
    {
        private static readonly string _mainAdminRoleName = "MainAdmin";
        private static readonly string _mainAdminPassword = "Qwerty1!";

        public static async System.Threading.Tasks.Task Initialize(IServiceProvider serviceProvider)
        {

            var roleManager = serviceProvider.GetRequiredService<RoleManager<IdentityRole>>();
            var userManager = serviceProvider.GetRequiredService<UserManager<User>>();
            var datasContext = serviceProvider.GetRequiredService<DailyDiaryDatasContext>();

            try
            {
                Subject csSubject = new Subject { Title = "C#", Priority = 1 };
                Subject mathSubject = new Subject { Title = "Math", Priority = 1 };
                Subject healthSubject = new Subject { Title = "Health", Priority = 4 };
                Subject artSubject = new Subject { Title = "Art", Priority = 4 };
                Subject musicSubject = new Subject { Title = "Music", Priority = 4 };
                Subject englishSubject = new Subject { Title = "English", Priority = 3 };
                Subject algebraSubject = new Subject { Title = "Algebra", Priority = 1 };
                Subject geometrySubject = new Subject { Title = "Geometry", Priority = 1 };
                Subject physicSubject = new Subject { Title = "Physical Science", Priority = 1 };
                Subject geographySubject = new Subject { Title = "Geography", Priority = 2 };
                Subject computerScienceSubject = new Subject { Title = "Computer Science", Priority = 1 };

                if (!datasContext.Subjects.Any())
                {
                    datasContext.Subjects.AddRange(
                    computerScienceSubject, geographySubject, physicSubject, geometrySubject, algebraSubject, englishSubject, musicSubject, artSubject, healthSubject, mathSubject, csSubject
                    );
                    await datasContext.SaveChangesAsync();
                }

                var rolesExist = await roleManager.Roles.ToListAsync();
                if (rolesExist.Count() == 0) // додаю ролі
                {
                    await roleManager.CreateAsync(new IdentityRole(_mainAdminRoleName));
                    await roleManager.CreateAsync(new IdentityRole("Admin"));
                    await roleManager.CreateAsync(new IdentityRole("Teacher"));
                    await roleManager.CreateAsync(new IdentityRole("Student"));
                    await roleManager.CreateAsync(new IdentityRole("Parrent"));
                }
                if (!userManager.Users.Any()) // додаю Користувачів
                {
                    List<User> users = new List<User>();

                    User admin1 = new User { UserName = "DenisLogin" };
                    User admin2 = new User { UserName = "SashaLogin", Email = "sstahnuk@gmail.com" };

                    users.Add(admin1);
                    users.Add(admin2);
                    foreach (var user in users)
                    {
                        var result = await userManager.CreateAsync(user, _mainAdminPassword);
                        if (result.Succeeded)
                        {
                            await userManager.AddToRoleAsync(user, _mainAdminRoleName);
                        }
                    }
                    users.Clear();

                    User user1 = new User { UserName = "Teacher1Login", Email = "teacher1@gmail.com", PhoneNumber = "+380000000000" };
                    User user2 = new User { UserName = "Teacher2Login", Email = "teacher2@gmail.com", PhoneNumber = "+380000000000" };
                    User user3 = new User { UserName = "Teacher3Login", Email = "teacher3@gmail.com", PhoneNumber = "+380000000000" };
                    User user4 = new User { UserName = "Teacher4Login", Email = "teacher4@gmail.com", PhoneNumber = "+380000000000" };
                    User user5 = new User { UserName = "Teacher5Login", Email = "teacher5@gmail.com", PhoneNumber = "+380000000000" };
                    User user6 = new User { UserName = "Teacher6Login", Email = "teacher6@gmail.com", PhoneNumber = "+380000000000" };
                    User user7 = new User { UserName = "Teacher7Login", Email = "teacher7@gmail.com", PhoneNumber = "+380000000000" };
                    User user8 = new User { UserName = "Teacher8Login", Email = "teacher8@gmail.com", PhoneNumber = "+380000000000" };

                    users.AddRange(new List<User>() { user1, user2, user3, user4, user5, user6, user7, user8 });

                    foreach (var user in users)
                    {
                        var result = await userManager.CreateAsync(user, _mainAdminPassword);
                        if (result.Succeeded)
                        {
                            await userManager.AddToRoleAsync(user, "Teacher");
                        }
                    }
                    users.Clear();

                    User user9 = new User { UserName = "Student1Login", Email = "Student1@gmail.com", PhoneNumber = "+380000000000" };
                    User user10 = new User { UserName = "Student2Login", Email = "Student2@gmail.com", PhoneNumber = "+380000000000" };
                    User user11 = new User { UserName = "Student3Login", Email = "Student3@gmail.com", PhoneNumber = "+380000000000" };
                    User user12 = new User { UserName = "Student4Login", Email = "Student4@gmail.com", PhoneNumber = "+380000000000" };
                    User user13 = new User { UserName = "Student5Login", Email = "Student5@gmail.com", PhoneNumber = "+380000000000" };
                    User user14 = new User { UserName = "Student6Login", Email = "Student6@gmail.com", PhoneNumber = "+380000000000" };
                    User user15 = new User { UserName = "Student7Login", Email = "Student7@gmail.com", PhoneNumber = "+380000000000" };
                    User user16 = new User { UserName = "Student8Login", Email = "Student8@gmail.com", PhoneNumber = "+380000000000" };
                    User user17 = new User { UserName = "Student9Login", Email = "Student9@gmail.com", PhoneNumber = "+380000000000" };
                    User user18 = new User { UserName = "Student10Login", Email = "Student10@gmail.com", PhoneNumber = "+380000000000" };

                    User user19 = new User { UserName = "Student11Login", Email = "Student11@gmail.com", PhoneNumber = "+380000000000" };
                    User user20 = new User { UserName = "Student12Login", Email = "Student12@gmail.com", PhoneNumber = "+380000000000" };
                    User user21 = new User { UserName = "Student13Login", Email = "Student13@gmail.com", PhoneNumber = "+380000000000" };
                    User user22 = new User { UserName = "Student14Login", Email = "Student14@gmail.com", PhoneNumber = "+380000000000" };
                    User user23 = new User { UserName = "Student15Login", Email = "Student15@gmail.com", PhoneNumber = "+380000000000" };
                    User user24 = new User { UserName = "Student16Login", Email = "Student16@gmail.com", PhoneNumber = "+380000000000" };
                    User user25 = new User { UserName = "Student17Login", Email = "Student17@gmail.com", PhoneNumber = "+380000000000" };
                    User user26 = new User { UserName = "Student18Login", Email = "Student18@gmail.com", PhoneNumber = "+380000000000" };
                    User user27 = new User { UserName = "Student19Login", Email = "Student19@gmail.com", PhoneNumber = "+380000000000" };
                    User user28 = new User { UserName = "Student20Login", Email = "Student20@gmail.com" };
                    users.AddRange(new List<User>() { user9, user10, user11, user12, user13, user14, user15, user16, user17, user18, user19, user20, user21, user22, user23, user24, user25, user26, user27, user28 });
                    foreach (var user in users)
                    {
                        var result = await userManager.CreateAsync(user, _mainAdminPassword);
                        if (result.Succeeded)
                        {
                            await userManager.AddToRoleAsync(user, "Student");
                        }
                    }
                    // ---------------------------------Teachers-------------------------------->
                    Person person1 = new Person { User = admin2, Name = "Oleksandr", MiddleName = "Yuriyovich", LastName = "Stakhniuk", Birthday = new DateTime(2001, 10, 15), Status = "I'm just a tired man", Address = "Kyiv" };
                    Person person2 = new Person { User = user1, Name = "Teacher1", MiddleName = "Teacher1", LastName = "Teacher1", Birthday = new DateTime(1975, 12, 1), Status = "I'm test teacher of math and computer science", Address = "Kyiv" };
                    Person person3 = new Person { User = user2, Name = "Teacher2", MiddleName = "Teacher2", LastName = "Teacher2", Birthday = new DateTime(1980, 5, 7), Status = "I'm test teacher of geography", Address = "Kyiv" };
                    Person person4 = new Person { User = user3, Name = "Dmitry", MiddleName = "", LastName = "Chumak", Birthday = DateTime.Now.AddYears(-28), Status = "I'm test teacher of C# and computer science", Address = "Kyiv" };
                    Person person5 = new Person { User = user4, Name = "Alor", MiddleName = "Teacher4", LastName = "Teacher4", Birthday = DateTime.Now.AddYears(-27), Status = "I'm test teacher of math and physic", Address = "Kyiv" };
                    Person person6 = new Person { User = user5, Name = "Kilons", MiddleName = "Teacher5", LastName = "Teacher5", Birthday = DateTime.Now.AddYears(-31), Status = "I'm test teacher of musik", Address = "Kyiv" };
                    Person person7 = new Person { User = user6, Name = "Paul", MiddleName = "Teacher6", LastName = "Teacher6", Birthday = DateTime.Now.AddYears(-30), Status = "I'm test teacher of english", Address = "Kyiv" };
                    Person person8 = new Person { User = user7, Name = "Jena", MiddleName = "Teacher7", LastName = "Teacher7", Birthday = DateTime.Now.AddYears(-26), Status = "I'm test teacher of health ", Address = "Kyiv" };
                    Person person9 = new Person { User = user8, Name = "Ong", MiddleName = "Teacher8", LastName = "Teacher8", Birthday = DateTime.Now.AddYears(-35), Status = "I'm test teacher of art", Address = "Kyiv" };
                    // <---------------------------------Teachers--------------------------------

                    // ---------------------------------Students-------------------------------->
                    Person person10 = new Person { User = user9, Name = "Sasha", MiddleName = "Student1", LastName = "Student1", Birthday = DateTime.Now.AddYears(-5), Status = "I'm test student of 1 class", Address = "Kyiv" };
                    Person person11 = new Person { User = user10, Name = "Denis", MiddleName = "Student2", LastName = "Student1", Birthday = DateTime.Now.AddYears(-5), Status = "I'm test student of 1 class", Address = "Kyiv" };
                    Person person12 = new Person { User = user11, Name = "Oleg", MiddleName = "Student3", LastName = "Student1", Birthday = DateTime.Now.AddYears(-5), Status = "I'm test student of 1 class", Address = "Kyiv" };
                    Person person13 = new Person { User = user12, Name = "Roma", MiddleName = "Student4", LastName = "Student1", Birthday = DateTime.Now.AddYears(-5), Status = "I'm test student of 1 class", Address = "Kyiv" };
                    Person person14 = new Person { User = user13, Name = "Vika", MiddleName = "Student5", LastName = "Student1", Birthday = DateTime.Now.AddYears(-5), Status = "I'm test student of 1 class", Address = "Kyiv" };

                    Person person15 = new Person { User = user14, Name = "Anton", MiddleName = "Student6", LastName = "Student6", Birthday = DateTime.Now.AddYears(-5), Status = "I'm test student of 1 class", Address = "Kyiv" };
                    Person person16 = new Person { User = user15, Name = "Yulia", MiddleName = "Student7", LastName = "Student7", Birthday = DateTime.Now.AddYears(-5), Status = "I'm test student of 1 class", Address = "Kyiv" };
                    Person person17 = new Person { User = user16, Name = "Irina", MiddleName = "Student8", LastName = "Student8", Birthday = DateTime.Now.AddYears(-5), Status = "I'm test student of 1 class", Address = "Kyiv" };
                    Person person18 = new Person { User = user17, Name = "Yana", MiddleName = "Student9", LastName = "Student9", Birthday = DateTime.Now.AddYears(-5), Status = "I'm test student of 1 class", Address = "Kyiv" };
                    Person person19 = new Person { User = user18, Name = "Alina", MiddleName = "Student10", LastName = "Student10", Birthday = DateTime.Now.AddYears(-5), Status = "I'm test student of 1 class", Address = "Kyiv" };

                    Person person20 = new Person { User = user19, Name = "Mihailo", MiddleName = "Student11", LastName = "Student11", Birthday = DateTime.Now.AddYears(-6), Status = "I'm test student of 1 class", Address = "Kyiv" };
                    Person person21 = new Person { User = user20, Name = "Andriy", MiddleName = "Student12", LastName = "Student12", Birthday = DateTime.Now.AddYears(-6), Status = "I'm test student of 1 class", Address = "Kyiv" };
                    Person person22 = new Person { User = user21, Name = "Nadiya", MiddleName = "Student13", LastName = "Student13", Birthday = DateTime.Now.AddYears(-6), Status = "I'm test student of 1 class", Address = "Kyiv" };
                    Person person23 = new Person { User = user22, Name = "Alina", MiddleName = "Student14", LastName = "Student14", Birthday = DateTime.Now.AddYears(-6), Status = "I'm test student of 1 class", Address = "Kyiv" };
                    Person person24 = new Person { User = user23, Name = "Ivanka", MiddleName = "Student15", LastName = "Student15", Birthday = DateTime.Now.AddYears(-6), Status = "I'm test student of 1 class", Address = "Kyiv" };

                    Person person25 = new Person { User = user24, Name = "Angelina", MiddleName = "Student16", LastName = "Student16", Birthday = DateTime.Now.AddYears(-6), Status = "I'm test student of 1 class", Address = "Kyiv" };
                    Person person26 = new Person { User = user25, Name = "Sasha", MiddleName = "Student17", LastName = "Student17", Birthday = DateTime.Now.AddYears(-6), Status = "I'm test student of 1 class", Address = "Kyiv" };
                    Person person27 = new Person { User = user26, Name = "Solomiya", MiddleName = "Student18", LastName = "Student18", Birthday = DateTime.Now.AddYears(-6), Status = "I'm test student of 1 class", Address = "Kyiv" };
                    Person person28 = new Person { User = user27, Name = "Solomon", MiddleName = "Student19", LastName = "Student19", Birthday = DateTime.Now.AddYears(-6), Status = "I'm test student of 1 class", Address = "Kyiv" };
                    Person person29 = new Person { User = user28, Name = "Katya", MiddleName = "Student20", LastName = "Student20", Birthday = DateTime.Now.AddYears(-6), Status = "I'm test student of 1 class", Address = "Kyiv" };
                    // <---------------------------------Students--------------------------------

                    datasContext.Persons.AddRange(person1, person2, person3, person4, person5, person6, person7, person8, person9, person10, person11, person12, person13, person14, person15, person16, person17, person18, person19, person20, person21, person22, person23, person24, person25, person26, person27, person28, person29);
                    await datasContext.SaveChangesAsync();
                    // ---------------------------------TeachersAdditionalDatas-------------------------------->
                    TeacherCategory teacherSpecialist = new TeacherCategory { Description = "Specialist" };
                    TeacherCategory teacherFirstCategorySpecialist = new TeacherCategory { Description = "First category specialist" };

                    if (!datasContext.TeacherCategories.Any())
                    {
                        datasContext.TeacherCategories.AddRange(teacherSpecialist, teacherFirstCategorySpecialist);
                        await datasContext.SaveChangesAsync();
                    }
                    TeacherDegree teacherMaster = new TeacherDegree { Description = "Master" };
                    TeacherDegree teacherPHD = new TeacherDegree { Description = "Professor, PHD" };

                    if (!datasContext.TeacherDegrees.Any())
                    {
                        datasContext.TeacherDegrees.AddRange(teacherMaster, teacherPHD);
                        await datasContext.SaveChangesAsync();
                    }
                    TeacherEducation teacherHigher = new TeacherEducation { Description = "Higher" };

                    if (!datasContext.TeacherEducations.Any())
                    {
                        datasContext.TeacherEducations.Add(teacherHigher);
                        await datasContext.SaveChangesAsync();
                    }
                    TeacherSpeciality teacherMathAndComputer = new TeacherSpeciality { Description = "Teacher of math and computer science" };
                    TeacherSpeciality teacherGeography = new TeacherSpeciality { Description = "Teacher of geography" };
                    TeacherSpeciality teacherComputer = new TeacherSpeciality { Description = "Teacher of C# and computer science" };
                    TeacherSpeciality teacherMathPhysic = new TeacherSpeciality { Description = "Teacher of math and physic" };
                    TeacherSpeciality teacherMusic = new TeacherSpeciality { Description = "Teacher of music" };
                    TeacherSpeciality teacherEnglish = new TeacherSpeciality { Description = "Teacher of english" };
                    TeacherSpeciality teacherHealth = new TeacherSpeciality { Description = "Teacher of health" };
                    TeacherSpeciality teacherArt = new TeacherSpeciality { Description = "Teacher of art" };

                    if (!datasContext.TeacherSpecialities.Any())
                    {
                        datasContext.TeacherSpecialities.AddRange(teacherMathAndComputer, teacherGeography, teacherComputer, teacherMathPhysic, teacherMusic, teacherEnglish, teacherHealth, teacherArt);
                        await datasContext.SaveChangesAsync();
                    }
                    // <---------------------------------TeachersAdditionalDatas--------------------------------


                    // ---------------------------------Teachers-------------------------------->

                    Teacher teacher1 = new Teacher { Person = person2, Category = teacherSpecialist, Degree = teacherMaster, Education = teacherHigher, Speciality = teacherMathAndComputer, TeacherSubjects = new List<TeacherSubject>() { new TeacherSubject { Subject = mathSubject }, new TeacherSubject { Subject = computerScienceSubject } } };
                    Teacher teacher2 = new Teacher { Person = person3, Category = teacherSpecialist, Degree = teacherMaster, Education = teacherHigher, Speciality = teacherGeography, TeacherSubjects = new List<TeacherSubject>() { new TeacherSubject { Subject = geographySubject } } };
                    Teacher teacher3 = new Teacher { Person = person4, Category = teacherSpecialist, Degree = teacherMaster, Education = teacherHigher, Speciality = teacherComputer, Experience = 2, Salary = 10000, TeacherSubjects = new List<TeacherSubject>() { new TeacherSubject { Subject = csSubject }, new TeacherSubject { Subject = computerScienceSubject } } };
                    Teacher teacher4 = new Teacher { Person = person5, Category = teacherSpecialist, Degree = teacherMaster, Education = teacherHigher, Speciality = teacherMathPhysic, Experience = 0, Salary = 12000, TeacherSubjects = new List<TeacherSubject>() { new TeacherSubject { Subject = algebraSubject }, new TeacherSubject { Subject = geometrySubject }, new TeacherSubject { Subject = mathSubject }, new TeacherSubject { Subject = physicSubject } } };
                    Teacher teacher5 = new Teacher { Person = person6, Category = teacherFirstCategorySpecialist, Degree = teacherPHD, Education = teacherHigher, Speciality = teacherMusic, Experience = 18, Salary = 16000, TeacherSubjects = new List<TeacherSubject>() { new TeacherSubject { Subject = musicSubject } } };
                    Teacher teacher6 = new Teacher { Person = person7, Category = teacherSpecialist, Degree = teacherMaster, Education = teacherHigher, Speciality = teacherEnglish, Experience = 2, Salary = 10000, TeacherSubjects = new List<TeacherSubject>() { new TeacherSubject { Subject = englishSubject } } };
                    Teacher teacher7 = new Teacher { Person = person8, Category = teacherSpecialist, Degree = teacherMaster, Education = teacherHigher, Speciality = teacherHealth, Experience = 0, Salary = 12000, TeacherSubjects = new List<TeacherSubject>() { new TeacherSubject { Subject = healthSubject } } };
                    Teacher teacher8 = new Teacher { Person = person9, Category = teacherFirstCategorySpecialist, Degree = teacherPHD, Education = teacherHigher, Speciality = teacherArt, Experience = 18, Salary = 16000, TeacherSubjects = new List<TeacherSubject>() { new TeacherSubject { Subject = healthSubject } } };

                    if (!datasContext.Teachers.Any())
                    {
                        datasContext.Teachers.AddRange(
                        teacher8, teacher7, teacher6, teacher5, teacher4, teacher3, teacher2, teacher1
                        );
                        await datasContext.SaveChangesAsync();
                    }
                    // <---------------------------------Teachers--------------------------------

                    // ---------------------------------Students-------------------------------->
                    var dateTimeFirstSeptember = new DateTime(2022, 9, 1);
                    Student student1 = new Student { Person = person10, AdmissionDate = dateTimeFirstSeptember.AddYears(-6) };
                    Student student2 = new Student { Person = person11, AdmissionDate = dateTimeFirstSeptember.AddYears(-6) };
                    Student student3 = new Student { Person = person12, AdmissionDate = dateTimeFirstSeptember.AddYears(-6) };
                    Student student4 = new Student { Person = person13, AdmissionDate = dateTimeFirstSeptember.AddYears(-6) };
                    Student student5 = new Student { Person = person14, AdmissionDate = dateTimeFirstSeptember.AddYears(-6) };

                    Student student6 = new Student { Person = person15, AdmissionDate = dateTimeFirstSeptember.AddYears(-6) };
                    Student student7 = new Student { Person = person16, AdmissionDate = dateTimeFirstSeptember.AddYears(-6) };
                    Student student8 = new Student { Person = person17, AdmissionDate = dateTimeFirstSeptember.AddYears(-6) };
                    Student student9 = new Student { Person = person18, AdmissionDate = dateTimeFirstSeptember.AddYears(-6) };
                    Student student10 = new Student { Person = person19, AdmissionDate = dateTimeFirstSeptember.AddYears(-6) };

                    Student student11 = new Student { Person = person20, AdmissionDate = dateTimeFirstSeptember.AddYears(-7) };
                    Student student12 = new Student { Person = person21, AdmissionDate = dateTimeFirstSeptember.AddYears(-7) };
                    Student student13 = new Student { Person = person22, AdmissionDate = dateTimeFirstSeptember.AddYears(-7) };
                    Student student14 = new Student { Person = person23, AdmissionDate = dateTimeFirstSeptember.AddYears(-7) };
                    Student student15 = new Student { Person = person24, AdmissionDate = dateTimeFirstSeptember.AddYears(-7) };

                    Student student16 = new Student { Person = person25, AdmissionDate = dateTimeFirstSeptember.AddYears(-7) };
                    Student student17 = new Student { Person = person26, AdmissionDate = dateTimeFirstSeptember.AddYears(-7) };
                    Student student18 = new Student { Person = person27, AdmissionDate = dateTimeFirstSeptember.AddYears(-7) };
                    Student student19 = new Student { Person = person28, AdmissionDate = dateTimeFirstSeptember.AddYears(-7) };
                    Student student20 = new Student { Person = person29, AdmissionDate = dateTimeFirstSeptember.AddYears(-7) };

                    if (!datasContext.Students.Any())
                    {
                        datasContext.Students.AddRange(student1, student2, student3, student4, student5, student6, student7, student8, student9, student10, student11, student12, student13, student14, student15, student16, student17, student18, student19, student20);
                        await datasContext.SaveChangesAsync();
                    }
                    // <---------------------------------Students--------------------------------

                    StudyYear sy1 = new StudyYear { Title = "TestingSystemYear", StartYear = DateTime.Now, FinishYear = DateTime.Now.AddYears(1) };

                    if (!datasContext.StudyYears.Any())
                    {
                        datasContext.StudyYears.Add(sy1);
                        await datasContext.SaveChangesAsync();
                    }

                    YearOfStudy year1 = new YearOfStudy { YearStudy = 1, StudyYear = sy1 };
                    YearOfStudy year2 = new YearOfStudy { YearStudy = 2, StudyYear = sy1 };
                    YearOfStudy year3 = new YearOfStudy { YearStudy = 3, StudyYear = sy1 };
                    YearOfStudy year4 = new YearOfStudy { YearStudy = 4, StudyYear = sy1 };
                    YearOfStudy year5 = new YearOfStudy { YearStudy = 5, StudyYear = sy1 };
                    YearOfStudy year6 = new YearOfStudy { YearStudy = 6, StudyYear = sy1 };
                    YearOfStudy year7 = new YearOfStudy { YearStudy = 7, StudyYear = sy1 };
                    YearOfStudy year8 = new YearOfStudy { YearStudy = 8, StudyYear = sy1 };
                    YearOfStudy year9 = new YearOfStudy { YearStudy = 9, StudyYear = sy1 };
                    YearOfStudy year10 = new YearOfStudy { YearStudy = 10, StudyYear = sy1 };
                    YearOfStudy year11 = new YearOfStudy { YearStudy = 11, StudyYear = sy1 };

                    if (!datasContext.YearOfStudy.Any())
                    {
                        datasContext.YearOfStudy.AddRange(
                        //year1, year2, year3, year4, year5, year6, year7, year8, year9, year10, year11
                        year11, year10, year9, year8, year7, year6, year5, year4, year3, year2, year1
                        );
                        await datasContext.SaveChangesAsync();
                    }
                    StudyPlan studyPlanForFirstClasses = new StudyPlan { Title = "Study plan for 1 class ", YearOfStudy = year1, Semester = 0, MaxAllowedLessonsPerDay = 3, SubjectsHoursCollection = "[{\"SubjectId\":\"9\",\"Hours\":\"10.5\"},{\"SubjectId\":\"8\",\"Hours\":\"20.5\"},{\"SubjectId\":\"7\",\"Hours\":\"30.5\"}]" };

                    if (!datasContext.StudyPlans.Any())
                    {
                        datasContext.StudyPlans.Add(studyPlanForFirstClasses);
                        await datasContext.SaveChangesAsync();
                    }

                    SubgroupBlock sb1 = new SubgroupBlock { SubgroupBlockTitle = "Default subgroup" };
                    SubgroupBlock sb2 = new SubgroupBlock { SubgroupBlockTitle = "Divide by gender" };
                    SubgroupBlock sb3 = new SubgroupBlock { SubgroupBlockTitle = "Divide by english knowledge level" };

                    if (!datasContext.SubgroupBlocks.Any())
                    {
                        datasContext.SubgroupBlocks.AddRange(sb3, sb2, sb1);
                        await datasContext.SaveChangesAsync();
                    }

                    Group group1 = new Group { Title = "1-A", StudyPlan = studyPlanForFirstClasses };
                    Group group2 = new Group { Title = "1-B", StudyPlan = studyPlanForFirstClasses };
                    if (!datasContext.Groups.Any())
                    {
                        datasContext.Groups.AddRange(
                           group2, group1
                        );
                        await datasContext.SaveChangesAsync();
                    }

                    Subgroup defSubgroupForFirstGroup = new Subgroup { Title = "defSubgroupFor_1-A", Group = group1, SubgroupBlock = sb1 };
                    Subgroup boysSubgroupForFirstGroup = new Subgroup { Title = "boysSubgroup_1-A", Group = group1, SubgroupBlock = sb2 };
                    Subgroup girlsSubgroupForFirstGroup = new Subgroup { Title = "girlsSubgroup_1-A", Group = group1, SubgroupBlock = sb2 };

                    Subgroup defSubgroupForSecondGroup = new Subgroup { Title = "defSubgroupFor_1-B", Group = group2, SubgroupBlock = sb1 };
                    Subgroup boysSubgroupForSecondGroup = new Subgroup { Title = "boysSubgroup_1-B", Group = group2, SubgroupBlock = sb2 };
                    Subgroup girlsSubgroupForSecondGroup = new Subgroup { Title = "girlsSubgroup_1-B", Group = group2, SubgroupBlock = sb2 };

                    if (!datasContext.Subgroups.Any())
                    {
                        datasContext.Subgroups.AddRange(defSubgroupForFirstGroup, boysSubgroupForFirstGroup, girlsSubgroupForFirstGroup,
                        defSubgroupForSecondGroup, boysSubgroupForSecondGroup, girlsSubgroupForSecondGroup);
                        await datasContext.SaveChangesAsync();


                        //group1 = await datasContext.Groups.FirstOrDefaultAsync(x => x.Title == "1-A");
                        group1.Subgroups = new List<Subgroup>() { defSubgroupForFirstGroup, boysSubgroupForFirstGroup, girlsSubgroupForFirstGroup };

                        group1.DefSubgroupId = defSubgroupForFirstGroup.Id;
                        datasContext.Groups.Update(group1);

                        group2.Subgroups = new List<Subgroup>() { defSubgroupForSecondGroup, boysSubgroupForSecondGroup, girlsSubgroupForSecondGroup };

                        group2.DefSubgroupId = defSubgroupForSecondGroup.Id;
                        datasContext.Groups.Update(group2);

                        await datasContext.SaveChangesAsync();
                    }

                    if (!datasContext.StudentsBySubgroups.Any())
                    {
                        await datasContext.StudentsBySubgroups.AddRangeAsync(
                        new StudentsBySubgroup { Student = student1, Subgroup = defSubgroupForFirstGroup },
                        new StudentsBySubgroup { Student = student2, Subgroup = defSubgroupForFirstGroup },
                        new StudentsBySubgroup { Student = student3, Subgroup = defSubgroupForFirstGroup },
                        new StudentsBySubgroup { Student = student4, Subgroup = defSubgroupForFirstGroup },
                        new StudentsBySubgroup { Student = student5, Subgroup = defSubgroupForFirstGroup },
                        new StudentsBySubgroup { Student = student6, Subgroup = defSubgroupForFirstGroup },
                        new StudentsBySubgroup { Student = student7, Subgroup = defSubgroupForFirstGroup },
                        new StudentsBySubgroup { Student = student8, Subgroup = defSubgroupForFirstGroup },
                        new StudentsBySubgroup { Student = student9, Subgroup = defSubgroupForFirstGroup },
                        new StudentsBySubgroup { Student = student10, Subgroup = defSubgroupForFirstGroup },

                        new StudentsBySubgroup { Student = student11, Subgroup = defSubgroupForSecondGroup },
                        new StudentsBySubgroup { Student = student12, Subgroup = defSubgroupForSecondGroup },
                        new StudentsBySubgroup { Student = student13, Subgroup = defSubgroupForSecondGroup },
                        new StudentsBySubgroup { Student = student14, Subgroup = defSubgroupForSecondGroup },
                        new StudentsBySubgroup { Student = student15, Subgroup = defSubgroupForSecondGroup },
                        new StudentsBySubgroup { Student = student16, Subgroup = defSubgroupForSecondGroup },
                        new StudentsBySubgroup { Student = student17, Subgroup = defSubgroupForSecondGroup },
                        new StudentsBySubgroup { Student = student18, Subgroup = defSubgroupForSecondGroup },
                        new StudentsBySubgroup { Student = student19, Subgroup = defSubgroupForSecondGroup },
                        new StudentsBySubgroup { Student = student20, Subgroup = defSubgroupForSecondGroup }
                         );
                        await datasContext.SaveChangesAsync();
                    }


                    UnionBlock ub1 = new UnionBlock { UnionBlockTitle = "Subgroup of boys. First classes" };
                    UnionBlock ub2 = new UnionBlock { UnionBlockTitle = "Subgroup of girls. First classes" };

                    if (!datasContext.UnionBlocks.Any())
                    {
                        datasContext.UnionBlocks.AddRange(ub1, ub2);
                        await datasContext.SaveChangesAsync();
                    }

                    Union union1 = new Union { UnionBlock = ub1, UnionTitle = "Union of subgroups of boys 1-A and 1-B" };
                    Union union2 = new Union { UnionBlock = ub2, UnionTitle = "Union of subgroups of girls 1-A and 1-B" };

                    if (!datasContext.Unions.Any())
                    {
                        datasContext.Unions.AddRange(union1, union2);
                        await datasContext.SaveChangesAsync();
                    }

                    UnionsSubgroup us1 = new UnionsSubgroup { Union = union1, Subgroup = boysSubgroupForFirstGroup };
                    UnionsSubgroup us2 = new UnionsSubgroup { Union = union1, Subgroup = boysSubgroupForSecondGroup };
                    UnionsSubgroup us3 = new UnionsSubgroup { Union = union2, Subgroup = girlsSubgroupForFirstGroup };
                    UnionsSubgroup us4 = new UnionsSubgroup { Union = union2, Subgroup = girlsSubgroupForSecondGroup };

                    if (!datasContext.UnionsSubgroups.Any())
                    {
                        await datasContext.AddRangeAsync(us1, us2, us3, us4);
                        await datasContext.SaveChangesAsync();
                        //union1.UnionsSubgroups = new List<UnionsSubgroup>() { us1,us2};
                        //union2.UnionsSubgroups = new List<UnionsSubgroup>() { us3, us4 };                       
                    }

                    //Group group3 = new Group { Title = "PV-911", YearOfStudy = year2, StudyYear = sy1 };
                    //Group group4 = new Group { Title = "2-A", YearOfStudy = year2, StudyYear = sy1 };
                    //Group group5 = new Group { Title = "2-B", YearOfStudy = year2, StudyYear = sy1 };
                    //Group group6 = new Group { Title = "3-A", YearOfStudy = year3, StudyYear = sy1 };
                    //Group group7 = new Group { Title = "3-B", YearOfStudy = year3, StudyYear = sy1 };
                    //Group group8 = new Group { Title = "4-A", YearOfStudy = year4, StudyYear = sy1 };
                    //Group group9 = new Group { Title = "4-B", YearOfStudy = year4, StudyYear = sy1 };
                    //Group group10 = new Group { Title = "5-A", YearOfStudy = year5, StudyYear = sy1 };
                    //Group group11 = new Group { Title = "5-B", YearOfStudy = year5, StudyYear = sy1 };
                    //Group group12 = new Group { Title = "6-A", YearOfStudy = year6, StudyYear = sy1 };
                    //Group group13 = new Group { Title = "6-B", YearOfStudy = year6, StudyYear = sy1 };
                    //Group group14 = new Group { Title = "7-A", YearOfStudy = year7, StudyYear = sy1 };
                    //Group group15 = new Group { Title = "7-B", YearOfStudy = year7, StudyYear = sy1 };
                    //Group group16 = new Group { Title = "8-A", YearOfStudy = year8, StudyYear = sy1 };
                    //Group group17 = new Group { Title = "8-B", YearOfStudy = year8, StudyYear = sy1 };
                    //Group group18 = new Group { Title = "9-A", YearOfStudy = year9, StudyYear = sy1 };
                    //Group group19 = new Group { Title = "9-B", YearOfStudy = year9, StudyYear = sy1 };
                    //Group group20 = new Group { Title = "10-A", YearOfStudy = year10, StudyYear = sy1 };
                    //Group group21 = new Group { Title = "10-B", YearOfStudy = year10, StudyYear = sy1 };
                    //Group group22 = new Group { Title = "11-A", YearOfStudy = year11, StudyYear = sy1 };
                    //Group group23 = new Group { Title = "11-B", YearOfStudy = year11, StudyYear = sy1 };

                    //if (!datasContext.Groups.Any())
                    //{
                    //    datasContext.Groups.AddRange(
                    //       //group23, group22, group21, group20, group19, group18, group17, group16, group15, group14, group13, group12, group11, group10,
                    //       //group9, group8, group7, group6, group5, group4, group3,
                    //       group2, group1
                    //    );
                    //    await datasContext.SaveChangesAsync();
                    //}
                    AuditoryType teachersAuditory = new AuditoryType { AuditoryTypeDescription = "Teachers' room" };
                    AuditoryType mathAuditory = new AuditoryType { AuditoryTypeDescription = "Mathematics classroom" };
                    AuditoryType physicsAuditory = new AuditoryType { AuditoryTypeDescription = "Physics classroom" };
                    AuditoryType chemistryAuditory = new AuditoryType { AuditoryTypeDescription = "Chemistry classroom" };
                    AuditoryType historyAuditory = new AuditoryType { AuditoryTypeDescription = "History classroom" };
                    AuditoryType assemblyAuditory = new AuditoryType { AuditoryTypeDescription = "Assembly hall" };
                    AuditoryType gymAuditory = new AuditoryType { AuditoryTypeDescription = "Gym" };

                    if (!datasContext.AuditoryTypes.Any())
                    {
                        await datasContext.AuditoryTypes.AddRangeAsync(teachersAuditory, mathAuditory, physicsAuditory, chemistryAuditory, historyAuditory, assemblyAuditory, gymAuditory);
                        await datasContext.SaveChangesAsync();
                    }

                    Auditory mathCab1 = new Auditory { Title = "11-B", AuditoryType = mathAuditory, PlacesAmount = 40 };
                    Auditory mathCab2 = new Auditory { Title = "11-A", AuditoryType = mathAuditory, PlacesAmount = 30 };
                    Auditory teachersCab = new Auditory { Title = "1", AuditoryType = teachersAuditory, PlacesAmount = 30 };
                    Auditory physicsCab = new Auditory { Title = "10-A", AuditoryType = physicsAuditory, PlacesAmount = 30 };
                    Auditory chemistryCab = new Auditory { Title = "9-D", AuditoryType = chemistryAuditory, PlacesAmount = 30 };
                    Auditory historyCab = new Auditory { Title = "2-C", AuditoryType = historyAuditory, PlacesAmount = 30 };
                    Auditory assemblyHall = new Auditory { Title = "Assembly hall", AuditoryType = assemblyAuditory, PlacesAmount = 250 };
                    Auditory gym = new Auditory { Title = "Gym", AuditoryType = gymAuditory, PlacesAmount = 60 };

                    if (!datasContext.Auditory.Any())
                    {
                        await datasContext.Auditory.AddRangeAsync(mathCab1, mathCab2, teachersCab, physicsCab, chemistryCab, historyCab, assemblyHall, gym);
                        await datasContext.SaveChangesAsync();
                    }

                    if (!datasContext.DaysOfWeek.Any())
                    {
                        //await datasContext.DaysOfWeek.AddRangeAsync(
                        //    new DbModels.DayOfWeek { EngTitle = "Sunday" },
                        //    new DbModels.DayOfWeek { EngTitle = "Monday" },
                        //    new DbModels.DayOfWeek { EngTitle = "Tuesday" },
                        //    new DbModels.DayOfWeek { EngTitle = "Wednesday" },
                        //    new DbModels.DayOfWeek { EngTitle = "Thursday" },
                        //    new DbModels.DayOfWeek { EngTitle = "Friday" },
                        //    new DbModels.DayOfWeek { EngTitle = "Saturday" }
                        //    );
                        await datasContext.DaysOfWeek.AddRangeAsync(
                          new DbModels.DayOfWeek { EngTitle = "Saturday" },
                          new DbModels.DayOfWeek { EngTitle = "Friday" },
                          new DbModels.DayOfWeek { EngTitle = "Thursday" },
                          new DbModels.DayOfWeek { EngTitle = "Wednesday" },
                          new DbModels.DayOfWeek { EngTitle = "Tuesday" },
                          new DbModels.DayOfWeek { EngTitle = "Monday" },
                          new DbModels.DayOfWeek { EngTitle = "Sunday" }
                          );
                        await datasContext.SaveChangesAsync();
                        //await datasContext.DaysOfWeek.AddRangeAsync(
                        //  new DbModels.DayOfWeek { EngTitle = "Saturday", EngShortTitle = "Sat", UaTitle = "Субота", UaShortTitle = "Сб" },
                        //  new DbModels.DayOfWeek { EngTitle = "Friday", EngShortTitle = "Fri", UaTitle = "П'ятниця", UaShortTitle = "Пт" },
                        //  new DbModels.DayOfWeek { EngTitle = "Thursday", EngShortTitle = "Thu", UaTitle = "Четвер", UaShortTitle = "Чт" },
                        //  new DbModels.DayOfWeek { EngTitle = "Wednesday", EngShortTitle = "Wed", UaTitle = "Середа", UaShortTitle = "Ср" },
                        //  new DbModels.DayOfWeek { EngTitle = "Tuesday", EngShortTitle = "Tue", UaTitle = "Вівторок", UaShortTitle = "Вт" },
                        //  new DbModels.DayOfWeek { EngTitle = "Monday", EngShortTitle = "Mon", UaTitle = "Понеділок", UaShortTitle = "Пн" },
                        //  new DbModels.DayOfWeek { EngTitle = "Sunday", EngShortTitle = "Sun", UaTitle = "Неділя", UaShortTitle = "Нд" }
                        //  );
                        //System.DayOfWeek.Thursday;
                    }
                    if (!datasContext.LessonsShedule.Any())
                    {
                        DateTime dateTime = DateTime.Today;

                        await datasContext.LessonsShedule.AddRangeAsync(
                        new LessonShedule
                        {
                            LessonNumber = 8,
                            StartTime = dateTime.AddHours(15).AddMinutes(15).ToShortTimeString(),
                            EndTime = dateTime.AddHours(16).ToShortTimeString()
                        },
                        new LessonShedule
                        {
                            LessonNumber = 7,
                            StartTime = dateTime.AddHours(14).AddMinutes(20).ToShortTimeString(),
                            EndTime = dateTime.AddHours(15).AddMinutes(5).ToShortTimeString()
                        },
                        new LessonShedule
                        {
                            LessonNumber = 6,
                            StartTime = dateTime.AddHours(13).AddMinutes(25).ToShortTimeString(),
                            EndTime = dateTime.AddHours(14).AddMinutes(10).ToShortTimeString()
                        },
                        new LessonShedule
                        {
                            LessonNumber = 5,
                            StartTime = dateTime.AddHours(12).AddMinutes(30).ToShortTimeString(),
                            EndTime = dateTime.AddHours(13).AddMinutes(15).ToShortTimeString()
                        },
                        new LessonShedule
                        {
                            LessonNumber = 4,
                            StartTime = dateTime.AddHours(11).AddMinutes(35).ToShortTimeString(),
                            EndTime = dateTime.AddHours(12).AddMinutes(20).ToShortTimeString()
                        },
                        new LessonShedule
                        {
                            LessonNumber = 3,
                            StartTime = dateTime.AddHours(10).AddMinutes(30).ToShortTimeString(),
                            EndTime = dateTime.AddHours(11).AddMinutes(15).ToShortTimeString()
                        },
                        new LessonShedule
                        {
                            LessonNumber = 2,
                            StartTime = dateTime.AddHours(9).AddMinutes(25).ToShortTimeString(),
                            EndTime = dateTime.AddHours(10).AddMinutes(10).ToShortTimeString()
                        },
                        new LessonShedule
                        {
                            LessonNumber = 1,
                            StartTime = dateTime.AddHours(8).AddMinutes(30).ToShortTimeString(),
                            EndTime = dateTime.AddHours(9).AddMinutes(15).ToShortTimeString()
                        }
                            );

                        await datasContext.SaveChangesAsync();
                    }

                    //DateTime data = new DateTime();
                    //News news = new News { Title = "Майстер-клас «Монетизація навичок і досвіду під час війни» для студентів Академії ШАГ", DataPublication = data.Date, MainInfo = "Майстер-клас  «Монетизація навичок і досвіду під час війни» для студентів Академії ШАГ від засновників компанії BRAND PEOPLE.", Base64Url = null, Sender = "Admin", IsRed = false };
                    //News news2 = new News { Title = "Безкоштовні майстер класи", DataPublication = data.Date, MainInfo = "Друзі, Комп'ютерна Академія ШАГ в умовах воєнного стану запускає серію онлайн майстер-класів і тематичних зустрічей для дітей 7-14 років.В період з 01.03 - 07.03 щодня будуть проходити цікаві майстер - класи, зустрічі з психологом.", Base64Url = null, Sender = "Adm", IsRed = false };


                    ////SubjectsStudyPlan SubjectsStudyPlan1 = new SubjectsStudyPlan { StudyPlanId = 1, SubjectId = 1, Hours = 40 };

                    //FeedatasContextack feedatasContextack1 = new FeedatasContextack { MainInformation = "Денис, поздравляю с успешным завершением курса PHP!)", IsRead = false, Teacher = teacher1, Subject = subject2, DataPublication = data.Date };

                    //if (!datasContext.News.Any())
                    //{
                    //    datasContext.News.Add(news);
                    //    datasContext.News.Add(news2);
                    //    datasContext.SaveChanges();
                    //}

                    //if (!datasContext.FeedatasContextack.Any())
                    //{
                    //    datasContext.FeedatasContextack.Add(feedatasContextack1);
                    //    datasContext.SaveChanges();
                    //}




                    //if (!datasContext.Subgroups.Any())
                    //{
                    //    datasContext.Subgroups.AddRange(
                    //        new Subgroup { Title = "Math" },
                    //        new Subgroup { Title = "History" },
                    //        new Subgroup { Title = "Music" }
                    //    );
                    //    datasContext.SaveChanges();
                    //}

                    //    datasContext.StudentNews.Add(new StudentNews { Student = st1, News = news });
                    //    datasContext.StudentNews.Add(new StudentNews { Student = st1, News = news2 });
                    //    datasContext.StudentNews.Add(new StudentNews { Student = st2, News = news2 });

                    //    datasContext.StudentFeedatasContextack.Add(new StudentFeedatasContextack { Student = st1, FeedatasContextack = feedatasContextack1 });

                    //    datasContext.TeacherNews.Add(new TeacherNews { Teacher = teacher1, News = news });
                    //    datasContext.TeacherNews.Add(new TeacherNews { Teacher = teacher1, News = news2 });
                    //    datasContext.TeacherNews.Add(new TeacherNews { Teacher = teacher2, News = news });

                    //    datasContext.SaveChanges();
                    //}
                    //if (!datasContext.TeacherGroups.Any())
                    //{
                    //    datasContext.TeacherGroups.Add(
                    //        new TeacherGroup()
                    //        {
                    //            Teacher = teacher1,
                    //            Group = group3
                    //        });
                    //}
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
            //await datasContext.SaveChangesAsync();
        }
    }
}
