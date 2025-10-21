using TeamEventPlanner.Models;

namespace TeamEventPlanner.Services
{
    public interface IEventService
    {
        Task<IEnumerable<Event>> GetReportDataAsync(Guid tenantId, DateTime start, DateTime end);
        Task<Event> GetEventAsync(Guid id);
        Task CreateEventAsync(Event ev);
    }
}
