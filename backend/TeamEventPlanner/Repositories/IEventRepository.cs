using TeamEventPlanner.Models;

namespace TeamEventPlanner.Repositories
{
    public interface IEventRepository
    {
        Task<IEnumerable<Event>> GetEventsByTenantAndDateRangeAsync(Guid tenantId, DateTime start, DateTime end);
        Task<Event> GetEventAsync(Guid id);
        Task AddEventAsync(Event ev);
    }
}
