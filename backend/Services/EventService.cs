using TeamEventPlanner.Models;
using TeamEventPlanner.Repositories;

namespace TeamEventPlanner.Services
{
    public class EventService : IEventService
    {
        private readonly IEventRepository repository;
        public EventService(IEventRepository repository)
        {
            this.repository = repository;
        }

        public Task CreateEventAsync(Event ev) => repository.AddEventAsync(ev);

        public Task<Event> GetEventAsync(Guid id) => repository.GetEventAsync(id);

        public Task<IEnumerable<Event>> GetReportDataAsync(Guid tenantId, DateTime start, DateTime end)
            => repository.GetEventsByTenantAndDateRangeAsync(tenantId, start, end);
    }
}
