using Microsoft.EntityFrameworkCore;
using TeamEventPlanner.Data;
using TeamEventPlanner.Models;

namespace TeamEventPlanner.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

        public DbSet<Event> Events { get; set; }
        public DbSet<Attendee> Attendees { get; set; }
    }
}
