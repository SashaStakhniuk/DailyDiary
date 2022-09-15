using DailyDiary.Models.DbModels;
using DailyDiary.Models.IntermediateModels;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DailyDiary.Models
{
    public class DailyDiaryDatasContext : DbContext
    {
        public DailyDiaryDatasContext(DbContextOptions<DailyDiaryDatasContext> options) : base(options)
        {
            Database.EnsureCreated();
        }
        public virtual DbSet<Person> Persons { get; set; }
        public virtual DbSet<StudyYear> StudyYears { get; set; } // навчальний рік (2022/2023)
        public virtual DbSet<YearOfStudy> YearOfStudy { get; set; } // рік навчання (1-11)
        public virtual DbSet<StudyPlan> StudyPlans { get; set; }
        public virtual DbSet<Group> Groups { get; set; }
        public virtual DbSet<Subgroup> Subgroups { get; set; }
        public virtual DbSet<SubgroupBlock> SubgroupBlocks { get; set; }// принципи поділу груп на підгрупи
        public virtual DbSet<Union> Unions { get; set; }
        public virtual DbSet<UnionBlock> UnionBlocks { get; set; } // принципи поділу груп одного року навчання на підгрупи
        public virtual DbSet<UnionsSubgroup> UnionsSubgroups { get; set; }
        public virtual DbSet<Teacher> Teachers { get; set; } // викладачі
        public virtual DbSet<Subject> Subjects { get; set; } // предмети
        public virtual DbSet<TeacherSubject> TeacherSubjects { get; set; } // які предмети можуть вести викладачі
        public virtual DbSet<Student> Students { get; set; } // студенти
        public virtual DbSet<Parent> Parents { get; set; } // батьки
        public virtual DbSet<ParentStudent> ParentStudents { get; set; }
        public virtual DbSet<StudentsBySubgroup> StudentsBySubgroups { get; set; } // розділення студентів по (групах) підгрупах
        public virtual DbSet<AuditoryType> AuditoryType { get; set; }
        public virtual DbSet<Auditory> Auditory { get; set; }
        public virtual DbSet<LessonType> LessonType { get; set; }
        public virtual DbSet<TaskType> TaskTypes { get; set; }
        public virtual DbSet<DbModels.Task> Tasks { get; set; }
        public virtual DbSet<StudentsWork> StudentsWorks { get; set; }
        public virtual DbSet<StudyMaterial> StudyMaterials { get; set; }
        public virtual DbSet<WorkPlan> WorkPlans { get; set; }
        public virtual DbSet<LessonStudyMaterial> LessonStudyMaterials { get; set; }
        public virtual DbSet<Shedule> Shedules { get; set; }
        public virtual DbSet<TeacherSubgroupDistribution> TeacherSubgroupDistributions { get; set; }
        public virtual DbSet<TeacherNews> TeacherNews { get; set; }
        public virtual DbSet<StudentNews> StudentNews { get; set; }
        public virtual DbSet<StudentFeedback> StudentFeedback { get; set; }
        public virtual DbSet<News> News { get; set; }
        public virtual DbSet<Feedback> Feedback { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            builder.Entity<AuditoryType>().HasIndex(x => x.AuditoryTypeDescription).IsUnique();
            builder.Entity<TaskType>().HasIndex(x => x.TaskTypeDescription).IsUnique();
            builder.Entity<LessonType>().HasIndex(x => x.LessonTypeDescription).IsUnique();
            //builder.Entity<Subject>().HasIndex(x => x.Title).IsUnique();


            builder.Entity<User>().HasIndex(x => x.Email).IsUnique();

            builder.Entity<User>()
                 .HasOne(p => p.Person)
                 .WithOne(u => u.User)
                 .HasForeignKey<Person>(p => p.UserId);
            //_________________________________________________________________Many-to-Many_______Parents&Students____________________________________->

            builder.Entity<ParentStudent>()
                .HasKey(ps => new { ps.ParentId, ps.StudentId });
            builder.Entity<ParentStudent>()
                .HasOne(p => p.Parent)
                .WithMany(ps => ps.ParentStudents)
                .HasForeignKey(p => p.ParentId);
            builder.Entity<ParentStudent>()
                .HasOne(s => s.Student)
                .WithMany(ps => ps.ParentStudents)
                .HasForeignKey(s => s.StudentId);
            //<-_________________________________________________________________Many-to-Many_______Parents&Students____________________________________

            //_________________________________________________________________Many-to-Many_______Subroup & Student____________________________________->

            builder.Entity<StudentsBySubgroup>()
                .HasKey(ss => new { ss.StudentId, ss.SubgroupId });
            builder.Entity<StudentsBySubgroup>()
                .HasOne(ss => ss.Student)
                .WithMany(s => s.StudentsBySubgroups)
                .HasForeignKey(ss => ss.StudentId);
            builder.Entity<StudentsBySubgroup>()
                .HasOne(ss => ss.Subgroup)
                .WithMany(s => s.StudentsBySubgroups)
                .HasForeignKey(ss => ss.SubgroupId);
            //_________________________________________________________________Many-to-Many_______Subroup & Student____________________________________->
            //_________________________________________________________________Many-to-Many_______Subroup & Unions____________________________________->
            builder.Entity<UnionsSubgroup>()
                .HasKey(us => new { us.UnionId, us.SubgroupId });
            builder.Entity<UnionsSubgroup>()
                .HasOne(us => us.Union)
                .WithMany(u => u.UnionsSubgroups)
                .HasForeignKey(us => us.UnionId);
            builder.Entity<UnionsSubgroup>()
                .HasOne(us => us.Subgroup)
                .WithMany(s => s.UnionsSubgroups)
                .HasForeignKey(us => us.SubgroupId);
            //_________________________________________________________________Many-to-Many_______Subroup & Unions____________________________________->

            //_________________________________________________________________Many-to-Many_______WorkPlan & StudyMaterial____________________________________->
            builder.Entity<LessonStudyMaterial>()
                .HasKey(lsm => new { lsm.StudyMaterialId, lsm.WorkPlanId });
            builder.Entity<LessonStudyMaterial>()
                .HasOne(lsm => lsm.StudyMaterial)
                .WithMany(u => u.LessonStudyMaterials)
                .HasForeignKey(lsm => lsm.StudyMaterialId);
            builder.Entity<LessonStudyMaterial>()
                .HasOne(lsm => lsm.WorkPlan)
                .WithMany(s => s.LessonStudyMaterials)
                .HasForeignKey(lsm => lsm.WorkPlanId);
            //_________________________________________________________________Many-to-Many_______WorkPlan & StudyMaterial____________________________________->


            builder.Entity<StudentFeedback>()
                .HasKey(sn => new { sn.StudentId, sn.FeedbackId });

            builder.Entity<StudentFeedback>()
                .HasOne(s => s.Student)
                .WithMany(sf => sf.StudentFeedback)
                .HasForeignKey(s => s.StudentId);

            builder.Entity<StudentFeedback>()
                .HasOne(f => f.Feedback)
                .WithMany(sf => sf.StudentFeedback)
                .HasForeignKey(f => f.FeedbackId);

            //  Many-to-Many  Student and News

            builder.Entity<StudentNews>()
                .HasKey(sn => new { sn.StudentId, sn.NewsId });

            builder.Entity<StudentNews>()
                .HasOne(student => student.Student)
                .WithMany(sn => sn.StudentNews)
                .HasForeignKey(student => student.StudentId);

            builder.Entity<StudentNews>()
                .HasOne(news => news.News)
                .WithMany(sn => sn.StudentNews)
                .HasForeignKey(news => news.NewsId);

            //  Many-to-Many  Teacher and News

            builder.Entity<TeacherNews>()
                    .HasKey(tn => new { tn.TeacherId, tn.NewsId });

            builder.Entity<TeacherNews>()
                    .HasOne(tch => tch.Teacher)
                    .WithMany(tn => tn.TeacherNews)
                    .HasForeignKey(tch => tch.TeacherId);

            builder.Entity<TeacherNews>()
                    .HasOne(n => n.News)
                    .WithMany(tn => tn.TeacherNews)
                    .HasForeignKey(n => n.NewsId);

            //_________________________________________________________________Many-to-Many_______Teachers&Subjects____________________________________->

            builder.Entity<TeacherSubject>()
                                //.HasKey(ts => new { ts.Id, ts.TeacherId, ts.SubjectId });
              .HasKey(ts => new { ts.TeacherId, ts.SubjectId });

            builder.Entity<TeacherSubject>()
                .HasOne(t => t.Teacher)
                .WithMany(ts => ts.TeacherSubjects)
                .HasForeignKey(t => t.TeacherId);
            builder.Entity<TeacherSubject>()
                .HasOne(s => s.Subject)
                .WithMany(ts => ts.TeacherSubjects)
                .HasForeignKey(s => s.SubjectId);
            //<-_________________________________________________________________Many-to-Many_______Teachers&Subjects____________________________________
           
        }
    }
}
