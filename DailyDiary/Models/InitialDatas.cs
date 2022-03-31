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
            var subject1 = new Subject { Title = "Reading" };
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

            if (!db.Subjects.Any())
            {
               
                db.Subjects.AddRange(
                subject11, subject10, subject9, subject8, subject7, subject6, subject5, subject4, subject3, subject2, subject1
                );
                db.SaveChanges();
            }

            Group group1 = new Group { Title = "1-A" };
            Group group2 = new Group { Title = "1-B" };
            Group group3 = new Group { Title = "2-A" };
            Group group4 = new Group { Title = "2-B" };
            Group group5 = new Group { Title = "9-B" };
            if (!db.Groups.Any())
            {
                db.Groups.AddRange(
                    group5, group4, group3, group2,group1
                    //new Group { Title = "1-A" },
                    //new Group { Title = "1-B" },
                    //new Group { Title = "2-A" },
                    //new Group { Title = "2-B" },
                    //new Group { Title = "9-B" }
                );
                db.SaveChanges();
            }
            if(!db.StudyPlans.Any())
            {
                db.StudyPlans.AddRange(
                    new StudyPlan { GroupId = 1, Semester = 1  },
                    new StudyPlan { GroupId = 1, Semester = 2 },
                    new StudyPlan { GroupId = 2, Semester = 2 }
                    );
                db.SaveChanges();
            }
            if (!db.SubjectsStudyPlans.Any())
            {
                db.SubjectsStudyPlans.AddRange(
                    new SubjectsStudyPlan { StudyPlanId = 1, SubjectId = 1, Hours = 40},
                    new SubjectsStudyPlan { StudyPlanId = 2, SubjectId = 1, Hours = 40},
                    new SubjectsStudyPlan { StudyPlanId = 3, SubjectId = 2, Hours = 60}
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
            if (!db.Students.Any())
            {
                db.Students.AddRange(
                    new Student { Email = "denis@gmail.com", Password = "1111",  Login = "login", Name = "Denis", LastName = "Goolorev", Age = 14, StudyYear = 9, GroupId = 3 , SubgroupId = 3 /*Group = group5*/ },
                    new Student { Email = "alex@gmail.com", Password = "1111", Login = "login", Name = "Alex", LastName = "Klar", Age = 6, StudyYear = 1, GroupId = 2, SubgroupId = 1 /*Group = group2*/ },
                    new Student { Email = "stiv@gmail.com", Password = "1111", Login = "login", Name = "Stiv", LastName = "jobs", Age = 7, StudyYear = 2, GroupId = 5, SubgroupId = 2/* Group = group3*/ }
                );
                db.SaveChanges();
            }

           var teacher1 = new Teacher { Name = "Teacher1", LastName = "Jonson", Age = 28, Specialty = "Teacher", Category = "Specialist", Degree = "Master", Education = "Higher", Experience = 2, Salary = 10000 };
           var teacher2 = new Teacher { Name = "Teacher2", LastName = "Alor", Age = 25, Specialty = "Teacher", Category = "Specialist", Degree = "Master", Education = "Higher", Experience = 0, Salary = 12000 };
           var teacher3 = new Teacher { Name = "Teacher3", LastName = "Kilons", Age = 44, Specialty = "Teacher", Category = "First category specialist", Degree = "Professor, PHD", Education = "Higher", Experience = 18, Salary = 16000 };
           var teacher4 = new Teacher { Name = "Teacher4", LastName = "Paul", Age = 28, Specialty = "Teacher", Category = "Specialist", Degree = "Master", Education = "Higher", Experience = 2, Salary = 10000 };
           var teacher5 = new Teacher { Name = "Teacher5", LastName = "Jena", Age = 25, Specialty = "Teacher", Category = "Specialist", Degree = "Master", Education = "Higher", Experience = 0, Salary = 12000 };
           var teacher6 = new Teacher { Name = "Teacher6", LastName = "Ong", Age = 44, Specialty = "Teacher", Category = "First category specialist", Degree = "Professor, PHD", Education = "Higher", Experience = 18, Salary = 16000 };
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
                db.SaveChanges();
            }
            if (!db.TeacherGroups.Any())
            {

                db.TeacherGroups.AddRange(
                   new TeacherGroup { TeacherId = 1, Group = group2 },
                   new TeacherGroup { TeacherId = 1, Group = group3 },
                   new TeacherGroup { TeacherId = 2, Group = group3 },                  
                   new TeacherGroup { TeacherId = 2, Group = group2 }                  

               );
                db.SaveChanges();
            }

        }
    }
}
