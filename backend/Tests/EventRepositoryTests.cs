using Microsoft.EntityFrameworkCore;
using TeamEventPlanner.Data;
using TeamEventPlanner.Models;
using TeamEventPlanner.Repositories;
using Xunit;

public class EventRepositoryTests
{
    [Fact]
    public async Task GetEventsByTenantAndDateRangeAsync_ReturnsOnlyTenantEvents()
    {
        var options = new DbContextOptionsBuilder<AppDbContext>()
            .UseInMemoryDatabase(databaseName: "TestDb")
            .Options;

        using (var context = new AppDbContext(options))
        {
            var tenantA = Guid.NewGuid();
            var tenantB = Guid.NewGuid();

            context.Events.Add(new Event { TenantId = tenantA, Name = "A1", Start = DateTime.UtcNow, End = DateTime.UtcNow.AddHours(1) });
            context.Events.Add(new Event { TenantId = tenantB, Name = "B1", Start = DateTime.UtcNow, End = DateTime.UtcNow.AddHours(1) });

            context.SaveChanges();

            var repo = new EventRepository(context);
            var results = await repo.GetEventsByTenantAndDateRangeAsync(tenantA, DateTime.UtcNow.AddDays(-1), DateTime.UtcNow.AddDays(1));
            Assert.Single(results);
        }
    }
}
