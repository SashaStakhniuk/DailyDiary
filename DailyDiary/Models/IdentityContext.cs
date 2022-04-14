using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DailyDiary.Models
{
    public class IdentityContext : IdentityDbContext<Person>
    {
        public IdentityContext(DbContextOptions<IdentityContext> options) : base(options)
        {
            //Database.EnsureDeleted();
            Database.EnsureCreated();
        }
        //public DbSet<User> Users { get; set; }
    }
}
