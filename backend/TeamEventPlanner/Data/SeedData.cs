using TeamEventPlanner.Models;

namespace TeamEventPlanner.Data
{
    public static class SeedData
    {
        public static void Initialize(AppDbContext context)
        {
            if (context.Events.Any()) return;

            // create two tenants
            var tenantA = Guid.Parse("11111111-1111-1111-1111-111111111111");
            var tenantB = Guid.Parse("22222222-2222-2222-2222-222222222222");

            var rnd = new Random();

            List<Event> events = new List<Event>();

            for (int t = 0; t < 2; t++)
            {
                var tenant = t == 0 ? tenantA : tenantB;
                for (int i = 0; i < 7; i++)
                {
                    var start = DateTime.UtcNow.Date.AddDays(i).AddHours(9 + rnd.Next(0, 6));
                    var end = start.AddHours(2);
                    var ev = new Event
                    {
                        TenantId = tenant,
                        Name = $"Event {t}-{i}",
                        Start = start,
                        End = end,
                        Venue = $"Venue {i}"
                    };

                    for (int a = 0; a < 6; a++)
                    {
                        ev.Attendees.Add(new Attendee
                        {
                            Name = $"Attendee {t}-{i}-{a}",
                            Email = $"person{t}{i}{a}@example.com"
                        });
                    }
                    events.Add(ev);
                }
            }

            context.Events.AddRange(events);
            context.SaveChanges();
        }
    }
}
