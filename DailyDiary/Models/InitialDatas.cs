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
            var subject1 = new Subject { Title = "C#" };
            var subject2 = new Subject { Title = "Math" };
            var subject3 = new Subject { Title = "Health" };
            var subject4 = new Subject { Title = "Art" };
            var subject5 = new Subject { Title = "Music" };
            var subject6 = new Subject { Title = "English" };
            var subject7 = new Subject { Title = "Algebra" };
            var subject8 = new Subject { Title = "Geometry" };
            var subject9 = new Subject { Title = "Physical Science" };
            var subject10 = new Subject { Title = "Geography" };
            var subject11 = new Subject { Title = "Computer Science" };

            var teacher1 = new Teacher { Name = "Dmitry", LastName = "Chumack", Age = 28, Specialty = "Teacher", Category = "Specialist", Degree = "Master", Education = "Higher", Experience = 2, Salary = 10000 };
            var teacher2 = new Teacher { Name = "Teacher2", LastName = "Alor", Age = 25, Specialty = "Teacher", Category = "Specialist", Degree = "Master", Education = "Higher", Experience = 0, Salary = 12000 };
            var teacher3 = new Teacher { Name = "Teacher3", LastName = "Kilons", Age = 44, Specialty = "Teacher", Category = "First category specialist", Degree = "Professor, PHD", Education = "Higher", Experience = 18, Salary = 16000 };
            var teacher4 = new Teacher { Name = "Teacher4", LastName = "Paul", Age = 28, Specialty = "Teacher", Category = "Specialist", Degree = "Master", Education = "Higher", Experience = 2, Salary = 10000 };
            var teacher5 = new Teacher { Name = "Teacher5", LastName = "Jena", Age = 25, Specialty = "Teacher", Category = "Specialist", Degree = "Master", Education = "Higher", Experience = 0, Salary = 12000 };
            var teacher6 = new Teacher { Name = "Teacher6", LastName = "Ong", Age = 44, Specialty = "Teacher", Category = "First category specialist", Degree = "Professor, PHD", Education = "Higher", Experience = 18, Salary = 16000 };

            if (!db.Subjects.Any())
            {
                db.Subjects.AddRange(
                subject1, subject10, subject9, subject8, subject7, subject6, subject5, subject4, subject3, subject2, subject11
                );
                db.SaveChanges();
            }

            DateTime data = new DateTime();
            News news = new News { Title = "Майстер-клас «Монетизація навичок і досвіду під час війни» для студентів Академії ШАГ", DataPublication = data.Date, MainInfo = "Майстер-клас  «Монетизація навичок і досвіду під час війни» для студентів Академії ШАГ від засновників компанії BRAND PEOPLE.", Base64Url = null, Sender = "Admin", IsRed = false };
            News news2 = new News { Title = "Безкоштовні майстер класи", DataPublication = data.Date, MainInfo = "Друзі, Комп'ютерна Академія ШАГ в умовах воєнного стану запускає серію онлайн майстер-класів і тематичних зустрічей для дітей 7-14 років.В період з 01.03 - 07.03 щодня будуть проходити цікаві майстер - класи, зустрічі з психологом.", Base64Url = null, Sender = "Adm", IsRed = false };

            Feedback feedback1 = new Feedback { MainInformation = "Денис, поздравляю с успешным завершением курса PHP!)", IsRead = false, Teacher = teacher1, Subject = subject2, DataPublication = data.Date };

            if (!db.News.Any())
            {
                db.News.Add(news);
                db.News.Add(news2);
                db.Feedback.Add(feedback1);
                db.SaveChanges();
            }

            var StudyPlan1 = new StudyPlan { GroupId = 1, Semester = 1 };
            var StudyPlan2 = new StudyPlan { GroupId = 1, Semester = 2 };
            var StudyPlan3 = new StudyPlan { GroupId = 3, Semester = 2 };

            if (!db.StudyPlans.Any())
            {
                db.StudyPlans.AddRange(
                    StudyPlan1, StudyPlan2, StudyPlan3
                );
                db.SaveChanges();
            }

            var SubjectsStudyPlan1 = new SubjectsStudyPlan { StudyPlanId = 1, SubjectId = 1, Hours = 40 };
            var SubjectsStudyPlan2 = new SubjectsStudyPlan { StudyPlanId = 2, SubjectId = 1, Hours = 40 };
            var SubjectsStudyPlan3 = new SubjectsStudyPlan { StudyPlanId = 3, SubjectId = 1, Hours = 60 };

            if (!db.SubjectsStudyPlans.Any())
            {
                db.SubjectsStudyPlans.AddRange(
                   SubjectsStudyPlan1, SubjectsStudyPlan2, SubjectsStudyPlan3
                );
                db.SaveChanges();
            }

            Group group1 = new Group { Title = "1-A" };
            Group group2 = new Group { Title = "1-B" };
            Group group3 = new Group { Title = "PV-911", StudyPlan = StudyPlan3 };
            Group group4 = new Group { Title = "2-B" };
            Group group5 = new Group { Title = "9-B" };
            if (!db.Groups.Any())
            {
                db.Groups.AddRange(
                    group5, group4, group3, group2, group1
                );
                db.SaveChanges();
            }

            if (!db.Subgroups.Any())
            {
                db.Subgroups.AddRange(
                    new Subgroup { Title = "Math" },
                    new Subgroup { Title = "History" },
                    new Subgroup { Title = "Music" }
                );
                db.SaveChanges();
            }

            Student st1 = new Student { Email = "denis@gmail.com", Password = "1111", Login = "login", Name = "Denis", LastName = "Goolorev", Age = 14, StudyYear = 9, GroupId = 3, SubgroupId = 3 /*Group = group5*/ };
            Student st2 = new Student { Email = "alex@gmail.com", Password = "1111", Login = "login", Name = "Alex", LastName = "Klar", Age = 6, StudyYear = 1, GroupId = 2, SubgroupId = 1 /*Group = group2*/ };
            Student st3 = new Student { Email = "stiv@gmail.com", Password = "1111", Login = "login", Name = "Stiv", LastName = "jobs", Age = 7, StudyYear = 2, GroupId = 5, SubgroupId = 2/* Group = group3*/ };

            Student st4 = new Student { Email = "denis@gmail.com", Password = "1111", Login = "login", Name = "Denis", LastName = "Goolorev", Age = 14, StudyYear = 9, GroupId = 3, SubgroupId = 3 /*Group = group5*/ };
            Student st5 = new Student { Email = "alex@gmail.com", Password = "1111", Login = "login", Name = "Alex", LastName = "Klar", Age = 6, StudyYear = 1, GroupId = 3, SubgroupId = 1 /*Group = group2*/ };
            Student st6 = new Student { Email = "stiv@gmail.com", Password = "1111", Login = "login", Name = "Stiv", LastName = "jobs", Age = 7, StudyYear = 2, GroupId = 3, SubgroupId = 2/* Group = group3*/ };
            Student st7 = new Student { Email = "denis@gmail.com", Password = "1111", Login = "login", Name = "Denis", LastName = "Goolorev", Age = 14, StudyYear = 9, GroupId = 3, SubgroupId = 3 /*Group = group5*/ };
            Student st8 = new Student { Email = "alex@gmail.com", Password = "1111", Login = "login", Name = "Alex", LastName = "Klar", Age = 6, StudyYear = 1, GroupId = 3, SubgroupId = 1 /*Group = group2*/ };
            Student st9 = new Student { Email = "stiv@gmail.com", Password = "1111", Login = "login", Name = "Stiv", LastName = "jobs", Age = 7, StudyYear = 2, GroupId = 3, SubgroupId = 2/* Group = group3*/ };
            Student st10 = new Student { Email = "denis@gmail.com", Password = "1111", Login = "login", Name = "Denis", LastName = "Goolorev", Age = 14, StudyYear = 9, GroupId = 3, SubgroupId = 3 /*Group = group5*/ };
            Student st11 = new Student { Email = "alex@gmail.com", Password = "1111", Login = "login", Name = "Alex", LastName = "Klar", Age = 6, StudyYear = 1, GroupId = 3, SubgroupId = 1 /*Group = group2*/ };
            Student st12 = new Student { Email = "stiv@gmail.com", Password = "1111", Login = "login", Name = "Stiv", LastName = "jobs", Age = 7, StudyYear = 2, GroupId = 3, SubgroupId = 2/* Group = group3*/ };

            if (!db.Students.Any())
            {
                db.Students.AddRange(
                   st1, st2, st3, st4, st5, st6, st7, st8, st9, st10, st11, st12
                );
                db.SaveChanges();
            }

            if (!db.Teachers.Any())
            {

                db.Teachers.AddRange(
                    teacher6, teacher5, teacher4, teacher3, teacher2, teacher1
                //new Teacher { Name = "Teacher1", LastName = "Jonson", Age = 28, Specialty = "Teacher", Category = "Specialist", Degree = "Master", Education = "Higher", Experience = 2, Salary = 10000 },
                //new Teacher { Name = "Teacher2", LastName = "Alor", Age = 25, Specialty = "Teacher", Category = "Specialist", Degree ="Master", Education = "Higher", Experience = 0,Salary=12000},
                //new Teacher { Name = "Teacher3", LastName = "Kilons", Age = 44, Specialty = "Teacher", Category = "First category specialist", Degree ="Professor, PHD", Education = "Higher", Experience = 18,Salary=16000},
                //new Teacher { Name = "Teacher4", LastName = "Paul", Age = 28, Specialty = "Teacher", Category = "Specialist", Degree = "Master", Education = "Higher", Experience = 2, Salary = 10000 },
                //new Teacher { Name = "Teacher5", LastName = "Jena", Age = 25, Specialty = "Teacher", Category = "Specialist", Degree = "Master", Education = "Higher", Experience = 0, Salary = 12000 },
                //new Teacher { Name = "Teacher6", LastName = "Ong", Age = 44, Specialty = "Teacher", Category = "First category specialist", Degree = "Professor, PHD", Education = "Higher", Experience = 18, Salary = 16000 }
                );
                db.SaveChanges();
            }
            if (!db.TeacherSubjects.Any())
            {
                db.TeacherSubjects.AddRange(
                   new TeacherSubject { Teacher = teacher1, Subject = subject2 },
                   new TeacherSubject { Teacher = teacher1, Subject = subject9 },
                   new TeacherSubject { Teacher = teacher2, Subject = subject1 },
                   new TeacherSubject { Teacher = teacher2, Subject = subject6 },
                   new TeacherSubject { Teacher = teacher3, Subject = subject4 },
                   new TeacherSubject { Teacher = teacher3, Subject = subject6 }

               );
                db.StudentNews.Add(new StudentNews { Student = st1, News = news });
                db.StudentNews.Add(new StudentNews { Student = st1, News = news2 });
                db.StudentNews.Add(new StudentNews { Student = st2, News = news2 });

                db.StudentFeedback.Add(new StudentFeedback { Student = st1, Feedback = feedback1 });

                db.TeacherNews.Add(new TeacherNews { Teacher = teacher1, News = news });
                db.TeacherNews.Add(new TeacherNews { Teacher = teacher1, News = news2 });
                db.TeacherNews.Add(new TeacherNews { Teacher = teacher2, News = news });

                db.SaveChanges();
            }
            if (!db.TeacherGroups.Any())
            {

                db.TeacherGroups.Add(
                    new TeacherGroup()
                    {
                        Teacher = teacher1, Group = group3
                    });
                db.SaveChanges();
            }
        }
    }
}
