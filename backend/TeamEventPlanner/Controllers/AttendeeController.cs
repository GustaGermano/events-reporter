using Microsoft.AspNetCore.Mvc;
using TeamEventPlanner.Models;
using TeamEventPlanner.Repositories;
using TeamEventPlanner.Services;

namespace TeamEventPlanner.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AttendeeController : ControllerBase
    {
        private readonly IEventRepository eventRepository;
        public AttendeeController(IEventRepository eventRepository)
        {
            this.eventRepository = eventRepository;
        }

        // Not fully featured, just example to add attendee to event by id
        [HttpPost("add/{eventId:guid}")]
        public async Task<IActionResult> AddAttendee(Guid eventId, [FromBody] Attendee attendee)
        {
            var ev = await eventRepository.GetEventAsync(eventId);
            if (ev == null) return NotFound();
            attendee.EventId = ev.Id;
            ev.Attendees.Add(attendee);
            // repository handles save (we add a simple Save through repository method AddEvent)
            await eventRepository.AddEventAsync(ev);
            return Ok(attendee);
        }
    }
}
