using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DailyDiary.Models
{
    public class InitialDatas
    {
        public static void Initialize(IdentityContext db)
        {
            try
            {

                Teacher teacher1 = new Teacher { Name = "Dmitry", LastName = "Chumack", Age = 28, Specialty = "Teacher", Category = "Specialist", Degree = "Master", Education = "Higher", Experience = 2, Salary = 10000 };
                Teacher teacher2 = new Teacher { Name = "Teacher2", LastName = "Alor", Age = 25, Specialty = "Teacher", Category = "Specialist", Degree = "Master", Education = "Higher", Experience = 0, Salary = 12000 };
                Teacher teacher3 = new Teacher { Name = "Teacher3", LastName = "Kilons", Age = 44, Specialty = "Teacher", Category = "First category specialist", Degree = "Professor, PHD", Education = "Higher", Experience = 18, Salary = 16000 };
                Teacher teacher4 = new Teacher { Name = "Teacher4", LastName = "Paul", Age = 28, Specialty = "Teacher", Category = "Specialist", Degree = "Master", Education = "Higher", Experience = 2, Salary = 10000 };
                Teacher teacher5 = new Teacher { Name = "Teacher5", LastName = "Jena", Age = 25, Specialty = "Teacher", Category = "Specialist", Degree = "Master", Education = "Higher", Experience = 0, Salary = 12000 };
                Teacher teacher6 = new Teacher { Name = "Teacher6", LastName = "Ong", Age = 44, Specialty = "Teacher", Category = "First category specialist", Degree = "Professor, PHD", Education = "Higher", Experience = 18, Salary = 16000 };

                Student st1 = new Student { Order = 1, Email = "jonson@gmail.com", Password = "jonson", Login = "jonson", Name = "Denis", LastName = "Goolorev", Age = 14, YearOfStudy = 9, AdmissionDate = new DateTime(), Base64URL = "some url", Birthday = new DateTime(), Rate = 10 };

                DateTime data = new DateTime();
                News news = new News { Title = "Майстер-клас «Монетизація навичок і досвіду під час війни» для студентів Академії ШАГ", DataPublication = data.Date, MainInfo = "Майстер-клас  «Монетизація навичок і досвіду під час війни» для студентів Академії ШАГ від засновників компанії BRAND PEOPLE.", Base64Url = null, Sender = "Admin", IsRed = false };
                News news2 = new News { Title = "Безкоштовні майстер класи", DataPublication = data.Date, MainInfo = "Друзі, Комп'ютерна Академія ШАГ в умовах воєнного стану запускає серію онлайн майстер-класів і тематичних зустрічей для дітей 7-14 років.В період з 01.03 - 07.03 щодня будуть проходити цікаві майстер - класи, зустрічі з психологом.", Base64Url = null, Sender = "Adm", IsRed = false };

                Group group1 = new Group { Title = "1-A" };
                Group group2 = new Group { Title = "1-B" };
                Group group3 = new Group { Title = "PV-911" };
                Group group4 = new Group { Title = "2-B" };
                Group group5 = new Group { Title = "9-B" };

                Student st2 = new Student { Order = 2, Email = "alex@gmail.com", Password = "1111", Login = "login", Name = "Alex", LastName = "Klar", Age = 6, YearOfStudy = 1, Group = group2 };
                Student st3 = new Student { Order = 3, Email = "stiv@gmail.com", Password = "1111", Login = "login", Name = "Stiv", LastName = "jobs", Age = 7, YearOfStudy = 2, Group = group3 };
                Student st4 = new Student { Order = 4, Email = "denis@gmail.com", Password = "1111", Login = "login", Name = "Jon", LastName = "Oliver", Age = 14, YearOfStudy = 9, Group = group5 };
                Student st5 = new Student { Order = 5, Email = "alex@gmail.com", Password = "1111", Login = "login", Name = "Bred", LastName = "Pit", Age = 6, YearOfStudy = 1, Group = group2 };
                Student st6 = new Student { Order = 6, Email = "stiv@gmail.com", Password = "1111", Login = "login", Name = "Santa", LastName = "Lichia", Age = 7, YearOfStudy = 2, Group = group3 };
                Student st7 = new Student { Order = 7, Email = "denis@gmail.com", Password = "1111", Login = "login", Name = "Fill", LastName = "Gonson", Age = 14, YearOfStudy = 9, Group = group5 };
                Student st8 = new Student { Order = 8, Email = "alex@gmail.com", Password = "1111", Login = "login", Name = "Angelina", LastName = "Joli", Age = 6, YearOfStudy = 1, Group = group2 };
                Student st9 = new Student { Order = 9, Email = "stiv@gmail.com", Password = "1111", Login = "login", Name = "Mishel", LastName = "Streach", Age = 7, YearOfStudy = 2, Group = group3 };
                Student st10 = new Student { Order = 10, Email = "denis@gmail.com", Password = "1111", Login = "login", Name = "Paul", LastName = "Li", Age = 14, YearOfStudy = 9, Group = group5 };
                Student st11 = new Student { Order = 11, Email = "alex@gmail.com", Password = "1111", Login = "login", Name = "Alex", LastName = "Stedhem", Age = 6, YearOfStudy = 1, Group = group2 };
                Student st12 = new Student { Order = 12, Email = "stiv@gmail.com", Password = "1111", Login = "login", Name = "Jena", LastName = "Ops", Age = 7, YearOfStudy = 2, Group = group3 };

                SubjectsStudyPlan SubjectsStudyPlan1 = new SubjectsStudyPlan { StudyPlanId = 1, SubjectId = 1, Hours = 40 };

                //Feedback feedback1 = new Feedback { MainInformation = "Денис, поздравляю с успешным завершением курса PHP!)", IsRead = false, Teacher = teacher1, Subject = subject2, DataPublication = data.Date };

                if(!db.Students.Any())
                {
                    db.Students.AddRange(
                       st1, st2, st3, st4, st5, st6, st7, st8, st9, st10, st11, st12
                    );
                }

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

                if (!db.Groups.Any())
                {
                    db.Groups.AddRange(
                        group5, group4, group3, group2, group1
                    );
                    db.SaveChanges();
                }
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
                db.SaveChanges();
            } catch(Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
        }
    }
}
