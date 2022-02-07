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
            if (!db.Students.Any())
            {
                db.Students.AddRange(
                    new Student { Name = "student1", LastName = "LastName", Age = 14, StudyYear = 9/*, Group = "9-B"*/ },
                    new Student { Name = "student2", LastName = "LastName", Age = 13, StudyYear = 8/*, Group = "8-A"*/ },
                    new Student { Name = "student3", LastName = "LastName", Age = 12, StudyYear = 7/*, Group = "7-C"*/ }
                );
                db.SaveChanges();
            }
           
            if (!db.Teachers.Any())
            {
                db.Teachers.AddRange(
                    new Teacher { Name = "Teacher1", LastName = "LastName", Age = 28, Specialty = "Teacher", Category="Specialist", Degree ="Master", Experience= 2,Salary = 10000 },
                    new Teacher { Name = "Teacher2", LastName = "LastName", Age = 25, Specialty = "Teacher", Category = "Specialist", Degree ="Master", Experience = 0,Salary=12000},
                    new Teacher { Name = "Teacher3", LastName = "LastName", Age = 44, Specialty = "Teacher", Category = "First category specialist", Degree ="Professor, PHD", Experience = 18,Salary=16000}
                );
                db.SaveChanges();
            }
            //if (!db.Subjects.Any())
            //{
            //    db.Subjects.AddRange(
            //        new Subject { Title = "Reading" },
            //        new Subject { Title = "Math" },
            //        new Subject { Title = "Health" },
            //        new Subject { Title = "Art" },
            //        new Subject { Title = "Music"},
            //        new Subject { Title = "English" },
            //        new Subject { Title = "Algebra" },
            //        new Subject { Title = "Geometry" },
            //        new Subject { Title = "Physical Science" },
            //        new Subject { Title = "Geography" },
            //        new Subject { Title = "Computer Science" }
            //    );                
            //    db.SaveChanges();
            //}
            //if (!db.TeacherSubjects.Any())
            //{
            //    db.TeacherSubjects.AddRange(
            //       new TeacherSubject { TeacherId = 1,SubjectId=1 },
            //       new TeacherSubject { TeacherId = 1,SubjectId=2 },
            //       new TeacherSubject { TeacherId = 1,SubjectId=3 },
            //       new TeacherSubject { TeacherId = 2,SubjectId=3 },
            //       new TeacherSubject { TeacherId = 3,SubjectId=4 }       
            //   );
            //    db.SaveChanges();
            //}

        }
    }
}
