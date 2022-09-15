using DailyDiary.Models.DbModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DailyDiary.Models
{
    public class InitialDatas
    {
        public static void Initialize(DailyDiaryDatasContext db)
        {
            try
            {
                StudyYear sy1 = new StudyYear { Title = "TestingSystemYear", StartYear = DateTime.Now, FinishYear = DateTime.Now.AddYears(1) };

                if (!db.StudyYears.Any())
                {
                    db.StudyYears.Add(
                        sy1
                    );
                    db.SaveChanges();
                }

                YearOfStudy year1 = new YearOfStudy { YearStudy = 1, StudyYear = sy1};
                YearOfStudy year2 = new YearOfStudy { YearStudy = 2, StudyYear = sy1};
                YearOfStudy year3 = new YearOfStudy { YearStudy = 3, StudyYear = sy1};
                YearOfStudy year4 = new YearOfStudy { YearStudy = 4, StudyYear = sy1};
                YearOfStudy year5 = new YearOfStudy { YearStudy = 5, StudyYear = sy1};
                YearOfStudy year6 = new YearOfStudy { YearStudy = 6, StudyYear = sy1};
                YearOfStudy year7 = new YearOfStudy { YearStudy = 7, StudyYear = sy1};
                YearOfStudy year8 = new YearOfStudy { YearStudy = 8, StudyYear = sy1};
                YearOfStudy year9 = new YearOfStudy { YearStudy = 9, StudyYear = sy1};
                YearOfStudy year10 = new YearOfStudy { YearStudy = 10, StudyYear = sy1};
                YearOfStudy year11 = new YearOfStudy { YearStudy = 11, StudyYear = sy1};
                if (!db.YearOfStudy.Any())
                {
                    db.YearOfStudy.AddRange(
                    year1, year2, year3, year4, year5, year6, year7, year8, year9, year10, year11
                    //year11, year10, year9, year8, year7, year6, year5, year4, year3, year2, year1
                    );
                    db.SaveChanges();
                }

                Subject subject1 = new Subject { Title = "C#", Priority = 1 };
                Subject subject2 = new Subject { Title = "Math", Priority = 1 };
                Subject subject3 = new Subject { Title = "Health", Priority = 4 };
                Subject subject4 = new Subject { Title = "Art", Priority = 4 };
                Subject subject5 = new Subject { Title = "Music", Priority = 4 };
                Subject subject6 = new Subject { Title = "English", Priority = 3 };
                Subject subject7 = new Subject { Title = "Algebra", Priority = 1 };
                Subject subject8 = new Subject { Title = "Geometry", Priority = 1 };
                Subject subject9 = new Subject { Title = "Physical Science", Priority = 1 };
                Subject subject10 = new Subject { Title = "Geography", Priority = 2 };
                Subject subject11 = new Subject { Title = "Computer Science", Priority = 1 };

                if (!db.Subjects.Any())
                {
                    db.Subjects.AddRange(
                    subject11, subject10, subject9, subject8, subject7, subject6, subject5, subject4, subject3, subject2, subject1
                    );
                    db.SaveChanges();
                }

                //Teacher teacher1 = new Teacher { Name = "Dmitry", LastName = "Chumack", Specialty = "Teacher", Category = "Specialist", Degree = "Master", Education = "Higher", Experience = 2, Salary = 10000, TeacherSubjects = new List<TeacherSubject>() { new TeacherSubject { Subject = subject2 }, new TeacherSubject { Subject = subject9 } } };
                //Teacher teacher2 = new Teacher { Name = "Teacher2", LastName = "Alor", Specialty = "Teacher", Category = "Specialist", Degree = "Master", Education = "Higher", Experience = 0, Salary = 12000, TeacherSubjects = new List<TeacherSubject>() { new TeacherSubject { Subject = subject1 }, new TeacherSubject { Subject = subject6 } } };
                //Teacher teacher3 = new Teacher { Name = "Teacher3", LastName = "Kilons", Specialty = "Teacher", Category = "First category specialist", Degree = "Professor, PHD", Education = "Higher", Experience = 18, Salary = 16000, TeacherSubjects = new List<TeacherSubject>() { new TeacherSubject { Subject = subject4 }, new TeacherSubject { Subject = subject6 } } };
                //Teacher teacher4 = new Teacher { Name = "Teacher4", LastName = "Paul", Specialty = "Teacher", Category = "Specialist", Degree = "Master", Education = "Higher", Experience = 2, Salary = 10000 };
                //Teacher teacher5 = new Teacher { Name = "Teacher5", LastName = "Jena", Specialty = "Teacher", Category = "Specialist", Degree = "Master", Education = "Higher", Experience = 0, Salary = 12000 };
                //Teacher teacher6 = new Teacher { Name = "Teacher6", LastName = "Ong", Specialty = "Teacher", Category = "First category specialist", Degree = "Professor, PHD", Education = "Higher", Experience = 18, Salary = 16000 };

                //if (!db.Teachers.Any())
                //{
                //    db.Teachers.AddRange(
                //     teacher6, teacher5, teacher4, teacher3, teacher2, teacher1
                //    );
                //    db.SaveChanges();
                //}

                //Group group1 = new Group { Title = "1-A", YearOfStudy = year1,StudyYear=sy1 };
                //Group group2 = new Group { Title = "1-B", YearOfStudy = year1, StudyYear = sy1 };
                //Group group3 = new Group { Title = "PV-911", YearOfStudy = year2, StudyYear = sy1 };
                //Group group4 = new Group { Title = "2-A", YearOfStudy = year2, StudyYear=sy1 };
                //Group group5 = new Group { Title = "2-B", YearOfStudy = year2, StudyYear=sy1 };
                //Group group6 = new Group { Title = "3-A", YearOfStudy = year3, StudyYear=sy1 };
                //Group group7 = new Group { Title = "3-B", YearOfStudy = year3, StudyYear=sy1 };
                //Group group8 = new Group { Title = "4-A", YearOfStudy = year4, StudyYear=sy1 };
                //Group group9 = new Group { Title = "4-B", YearOfStudy = year4, StudyYear = sy1 };
                //Group group10 = new Group { Title = "5-A", YearOfStudy = year5, StudyYear=sy1 };
                //Group group11 = new Group { Title = "5-B", YearOfStudy = year5, StudyYear=sy1 };
                //Group group12 = new Group { Title = "6-A", YearOfStudy = year6, StudyYear=sy1 };
                //Group group13 = new Group { Title = "6-B", YearOfStudy = year6, StudyYear=sy1 };
                //Group group14 = new Group { Title = "7-A", YearOfStudy = year7, StudyYear=sy1 };
                //Group group15 = new Group { Title = "7-B", YearOfStudy = year7, StudyYear=sy1 };
                //Group group16 = new Group { Title = "8-A", YearOfStudy = year8, StudyYear=sy1 };
                //Group group17 = new Group { Title = "8-B", YearOfStudy = year8, StudyYear=sy1 };
                //Group group18 = new Group { Title = "9-A", YearOfStudy = year9, StudyYear=sy1 };
                //Group group19 = new Group { Title = "9-B", YearOfStudy = year9, StudyYear=sy1 };
                //Group group20 = new Group { Title = "10-A", YearOfStudy = year10, StudyYear=sy1 };
                //Group group21 = new Group { Title = "10-B", YearOfStudy = year10, StudyYear=sy1 };
                //Group group22 = new Group { Title = "11-A", YearOfStudy = year11, StudyYear=sy1 };
                //Group group23 = new Group { Title = "11-B", YearOfStudy = year11, StudyYear = sy1 };

                //if (!db.Groups.Any())
                //{
                //    db.Groups.AddRange(
                //       group23, group22, group21, group20, group19, group18, group17, group16, group15, group14, group13, group12, group11, group10,
                //       group9, group8, group7, group6, group5, group4, group3, group2, group1
                //    );
                //    db.SaveChanges();
                //}

                //Student st1 = new Student { Order = 1, Email = "jonson@gmail.com", Password = "jonson", Login = "jonson", Name = "Denis", LastName = "Goolorev", Age = 14, YearOfStudy = 9, AdmissionDate = new DateTime(), Base64URL = "some url", Birthday = new DateTime(), Rate = 10 };
                //Student st2 = new Student { Order = 2, Email = "alex@gmail.com", Password = "1111", Login = "login", Name = "Alex", LastName = "Klar", Age = 6, YearOfStudy = 1 /*Group = group2*/ };
                //Student st3 = new Student { Order = 3, Email = "stiv@gmail.com", Password = "1111", Login = "login", Name = "Stiv", LastName = "jobs", Age = 7, YearOfStudy = 2 /* Group = group3*/ };
                //Student st4 = new Student { Order = 4, Email = "denis@gmail.com", Password = "1111", Login = "login", Name = "Jon", LastName = "Oliver", Age = 14, YearOfStudy = 9 /*Group = group5*/ };
                //Student st5 = new Student { Order = 5, Email = "alex@gmail.com", Password = "1111", Login = "login", Name = "Bred", LastName = "Pit", Age = 6, YearOfStudy = 1 /*Group = group2*/ };
                //Student st6 = new Student { Order = 6, Email = "stiv@gmail.com", Password = "1111", Login = "login", Name = "Santa", LastName = "Lichia", Age = 7, YearOfStudy = 2/* Group = group3*/ };
                //Student st7 = new Student { Order = 7, Email = "denis@gmail.com", Password = "1111", Login = "login", Name = "Fill", LastName = "Gonson", Age = 14, YearOfStudy = 9 /*Group = group5*/ };
                //Student st8 = new Student { Order = 8, Email = "alex@gmail.com", Password = "1111", Login = "login", Name = "Angelina", LastName = "Joli", Age = 6, YearOfStudy = 1 /*Group = group2*/ };
                //Student st9 = new Student { Order = 9, Email = "stiv@gmail.com", Password = "1111", Login = "login", Name = "Mishel", LastName = "Streach", Age = 7, YearOfStudy = 2 /* Group = group3*/ };
                //Student st10 = new Student { Order = 10, Email = "denis@gmail.com", Password = "1111", Login = "login", Name = "Paul", LastName = "Li", Age = 14, YearOfStudy = 9 /*Group = group5*/ };
                //Student st11 = new Student { Order = 11, Email = "alex@gmail.com", Password = "1111", Login = "login", Name = "Alex", LastName = "Stedhem", Age = 6, YearOfStudy = 1 /*Group = group2*/ };
                //Student st12 = new Student { Order = 12, Email = "stiv@gmail.com", Password = "1111", Login = "login", Name = "Jena", LastName = "Ops", Age = 7, YearOfStudy = 2 /* Group = group3*/ };

                //Student st1 = new Student { Order = 1, Name = "Denis", LastName = "Goolorev", Age = 14, AdmissionDate = new DateTime(), Base64URL = "some url", Birthday = new DateTime(), Rate = 10 };
                //Student st2 = new Student { Order = 2, Name = "Alex", LastName = "Klar", Age = 6, /*Group = group2*/ };
                //Student st3 = new Student { Order = 3, Name = "Stiv", LastName = "jobs", Age = 7, /* Group = group3*/ };
                //Student st4 = new Student { Order = 4, Name = "Jon", LastName = "Oliver", Age = 14, /*Group = group5*/ };
                //Student st5 = new Student { Order = 5, Name = "Bred", LastName = "Pit", Age = 6, /*Group = group2*/ };
                //Student st6 = new Student { Order = 6, Name = "Santa", LastName = "Lichia", Age = 7, /* Group = group3*/ };
                //Student st7 = new Student { Order = 7, Name = "Fill", LastName = "Gonson", Age = 14, /*Group = group5*/ };
                //Student st8 = new Student { Order = 8, Name = "Angelina", LastName = "Joli", Age = 6, /*Group = group2*/ };
                //Student st9 = new Student { Order = 9, Name = "Mishel", LastName = "Streach", Age = 7, /* Group = group3*/ };
                //Student st10 = new Student { Order = 10, Name = "Paul", LastName = "Li", Age = 14, /*Group = group5*/ };
                //Student st11 = new Student { Order = 11, Name = "Alex", LastName = "Stedhem", Age = 6, /*Group = group2*/ };
                //Student st12 = new Student { Order = 12, Name = "Jena", LastName = "Ops", Age = 7, /* Group = group3*/ };

                //if (!db.Students.Any())
                //{
                //    db.Students.AddRange(
                //     st1, st2, st3, st4, st5, st6, st7, st8, st9, st10, st11, st12
                //  );
                //    db.SaveChanges();
                //}

                //DateTime data = new DateTime();
                //News news = new News { Title = "Майстер-клас «Монетизація навичок і досвіду під час війни» для студентів Академії ШАГ", DataPublication = data.Date, MainInfo = "Майстер-клас  «Монетизація навичок і досвіду під час війни» для студентів Академії ШАГ від засновників компанії BRAND PEOPLE.", Base64Url = null, Sender = "Admin", IsRed = false };
                //News news2 = new News { Title = "Безкоштовні майстер класи", DataPublication = data.Date, MainInfo = "Друзі, Комп'ютерна Академія ШАГ в умовах воєнного стану запускає серію онлайн майстер-класів і тематичних зустрічей для дітей 7-14 років.В період з 01.03 - 07.03 щодня будуть проходити цікаві майстер - класи, зустрічі з психологом.", Base64Url = null, Sender = "Adm", IsRed = false };


                ////SubjectsStudyPlan SubjectsStudyPlan1 = new SubjectsStudyPlan { StudyPlanId = 1, SubjectId = 1, Hours = 40 };

                //Feedback feedback1 = new Feedback { MainInformation = "Денис, поздравляю с успешным завершением курса PHP!)", IsRead = false, Teacher = teacher1, Subject = subject2, DataPublication = data.Date };






                //if (!db.News.Any())
                //{
                //    db.News.Add(news);
                //    db.News.Add(news2);
                //    db.SaveChanges();
                //}

                //if (!db.Feedback.Any())
                //{
                //    db.Feedback.Add(feedback1);
                //    db.SaveChanges();
                //}



                //if (!db.SubjectsStudyPlans.Any())
                //{
                //    db.SubjectsStudyPlans.AddRange(
                //       SubjectsStudyPlan1
                //    );
                //    db.SaveChanges();
                //}
                //if (!db.Subgroups.Any())
                //{
                //    db.Subgroups.AddRange(
                //        new Subgroup { Title = "Math" },
                //        new Subgroup { Title = "History" },
                //        new Subgroup { Title = "Music" }
                //    );
                //    db.SaveChanges();
                //}
                //if (!db.TeacherSubjects.Any())
                //{
                //    db.TeacherSubjects.AddRange(
                //       new TeacherSubject { Teacher = teacher1, Subject = subject2 },
                //       new TeacherSubject { Teacher = teacher1, Subject = subject9 },
                //       new TeacherSubject { Teacher = teacher2, Subject = subject1 },
                //       new TeacherSubject { Teacher = teacher2, Subject = subject6 },
                //       new TeacherSubject { Teacher = teacher3, Subject = subject4 },
                //       new TeacherSubject { Teacher = teacher3, Subject = subject6 }

                //   );
                //    db.StudentNews.Add(new StudentNews { Student = st1, News = news });
                //    db.StudentNews.Add(new StudentNews { Student = st1, News = news2 });
                //    db.StudentNews.Add(new StudentNews { Student = st2, News = news2 });

                //    db.StudentFeedback.Add(new StudentFeedback { Student = st1, Feedback = feedback1 });

                //    db.TeacherNews.Add(new TeacherNews { Teacher = teacher1, News = news });
                //    db.TeacherNews.Add(new TeacherNews { Teacher = teacher1, News = news2 });
                //    db.TeacherNews.Add(new TeacherNews { Teacher = teacher2, News = news });

                //    db.SaveChanges();
                //}
                //if (!db.TeacherGroups.Any())
                //{
                //    db.TeacherGroups.Add(
                //        new TeacherGroup()
                //        {
                //            Teacher = teacher1,
                //            Group = group3
                //        });
                //}
            } catch(Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
        }
    }
}
