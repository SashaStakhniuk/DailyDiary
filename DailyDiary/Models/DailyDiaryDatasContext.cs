using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DailyDiary.Models
{
    public class DailyDiaryDatasContext : DbContext
    {
        
        public DbSet<Student> Students { get; set; }
        public DbSet<Teacher> Teachers { get; set; }
        public DbSet<Subject> Subjects { get; set; }
        public DbSet<TeacherSubject> TeacherSubjects { get; set; }
        public DailyDiaryDatasContext(DbContextOptions<DailyDiaryDatasContext> options) : base(options)
        {
            Database.EnsureDeleted();
            Database.EnsureCreated();
        }
        protected override void OnModelCreating(ModelBuilder builder)
        {
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
        }

    }
}
