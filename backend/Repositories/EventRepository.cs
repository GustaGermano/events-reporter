using Microsoft.EntityFrameworkCore;
using TeamEventPlanner.Data;
using TeamEventPlanner.Models;

namespace TeamEventPlanner.Repositories
{
    public class EventRepository : IEventRepository
    {
        private readonly AppDbContext context;
        public EventRepository(AppDbContext context)
        {
            this.context = context;
        }

        public async Task AddEventAsync(Event ev)
        {
            context.Events.Add(ev);
            await context.SaveChangesAsync();
        }

        public async Task<Event> GetEventAsync(Guid id)
        {
            return await context.Events
                .Include(e => e.Attendees)
                .FirstOrDefaultAsync(e => e.Id == id);
        }

        public async Task<IEnumerable<Event>> GetEventsByTenantAndDateRangeAsync(Guid tenantId, DateTime start, DateTime end)
        {
            return await context.Events
                .Where(e => e.TenantId == tenantId && e.Start >= start && e.End <= end)
                .Include(e => e.Attendees)
                .ToListAsync();
        }
    }
}
