﻿using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DailyDiary.Models
{
    public class DailyDiaryDatasContext : DbContext
    {

        // Using Idenitity
        public DbSet<Student> Students { get; set; }
        public DbSet<Teacher> Teachers { get; set; }

        public DbSet<Group> Groups { get; set; }
        public DbSet<Subgroup> Subgroups { get; set; }
        public DbSet<Subject> Subjects { get; set; }
        public DbSet<TeacherSubject> TeacherSubjects { get; set; }
        public DbSet<TeacherGroup> TeacherGroups { get; set; }
        public DbSet<TeacherNews> TeacherNews { get; set; }
        //public DbSet<GroupSubject> GroupSubjects { get; set; }
        public DbSet<StudyPlan> StudyPlans { get; set; }
        public DbSet<SubjectsStudyPlan> SubjectsStudyPlans { get; set; }
        public DbSet<GroupHomework> GroupHomeworks { get; set; }
        public DbSet<GroupClasswork> GroupClassworks { get; set; }
        public DbSet<StudentHomework> StudentHomeworks { get; set; }
        public DbSet<StudentClasswork> StudentClassworks { get; set; }
        public DbSet<StudentNews> StudentNews { get; set; }
        public DbSet<StudentFeedback> StudentFeedback { get; set; }
        public DbSet<News> News { get; set; }
        public DbSet<Feedback> Feedback { get; set; }

        public DailyDiaryDatasContext(DbContextOptions<DailyDiaryDatasContext> options) : base(options)
        {
            //Database.EnsureDeleted();
            Database.EnsureCreated();
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {

            //  Many-to-Many  Student and Feedback

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
            //_________________________________________________________________Many-to-Many_______Teachers&Groups____________________________________->
            builder.Entity<TeacherGroup>()
                .HasKey(tg => new { tg.TeacherId, tg.GroupId });
            builder.Entity<TeacherGroup>()
                .HasOne(t => t.Teacher)
                .WithMany(tg => tg.TeacherGroups)
                .HasForeignKey(t => t.TeacherId);
            builder.Entity<TeacherGroup>()
                .HasOne(s => s.Group)
                .WithMany(tg => tg.TeacherGroups)
                .HasForeignKey(s => s.GroupId);
            //<-_________________________________________________________________Many-to-Many_______Teachers&Groups____________________________________
            //_________________________________________________________________Many-to-Many_______Groups&Subjects____________________________________->
            builder.Entity<SubjectsStudyPlan>()
                .HasKey(ssp => new { ssp.StudyPlanId , ssp.SubjectId });
            builder.Entity<SubjectsStudyPlan>()
                .HasOne(s => s.Subject)
                .WithMany(ssp => ssp.SubjectsStudyPlans)
                .HasForeignKey(s => s.SubjectId);
            builder.Entity<SubjectsStudyPlan>()
                .HasOne(s => s.StudyPlan)
                .WithMany(ssp => ssp.SubjectsStudyPlans)
                .HasForeignKey(s => s.StudyPlanId);
            //<-_________________________________________________________________Many-to-Many_______Groups&Subjects____________________________________

            //_________________________________________________________________Many-to-Many_______ Student&Homework ____________________________________->

            builder.Entity<StudentHomework>()
                .HasKey(sh => new { sh.GroupHomeworkId, sh.StudentId });
            builder.Entity<StudentHomework>()
                .HasOne(gh => gh.GroupHomework)
                .WithMany(sh => sh.StudentHomeworks)
                .HasForeignKey(gh => gh.GroupHomeworkId);
            builder.Entity<StudentHomework>()
                .HasOne(s => s.Student)
                .WithMany(sh => sh.StudentHomeworks)
                .HasForeignKey(s => s.StudentId);
            //<-_________________________________________________________________Many-to-Many_______ Student&Homework ____________________________________
            //_________________________________________________________________Many-to-Many_______ Student&Classwork ____________________________________->

            builder.Entity<StudentClasswork>()
                .HasKey(sc => new { sc.GroupClassworkId, sc.StudentId });
            builder.Entity<StudentClasswork>()
                .HasOne(gc => gc.GroupClasswork)
                .WithMany(sh => sh.StudentClassworks)
                .HasForeignKey(gc => gc.GroupClassworkId);
            builder.Entity<StudentClasswork>()
                .HasOne(s => s.Student)
                .WithMany(sc => sc.StudentClassworks)
                .HasForeignKey(s => s.StudentId);
            //<-_________________________________________________________________Many-to-Many_______ Student&Classwork ____________________________________

        }

    }
}
