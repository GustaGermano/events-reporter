using Microsoft.AspNetCore.Mvc;
using TeamEventPlanner.Models;
using TeamEventPlanner.Services;

namespace TeamEventPlanner.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EventsController : ControllerBase
    {
        private readonly IEventService eventService;
        public EventsController(IEventService eventService)
        {
            this.eventService = eventService;
        }

        // Create new event (tenant ID must be provided as header X-Tenant-ID)
        [HttpPost]
        public async Task<IActionResult> CreateEvent([FromBody] Event ev)
        {
            var tenantHeader = Request.Headers["X-Tenant-ID"].FirstOrDefault();
            if (string.IsNullOrEmpty(tenantHeader) || !Guid.TryParse(tenantHeader, out var tenantId))
                return BadRequest("X-Tenant-ID header is required and must be a GUID.");

            ev.TenantId = tenantId;
            await eventService.CreateEventAsync(ev);
            return CreatedAtAction(nameof(GetEvent), new { id = ev.Id }, ev);
        }

        // Get single event
        [HttpGet("{id:guid}")]
        public async Task<IActionResult> GetEvent(Guid id)
        {
            var ev = await eventService.GetEventAsync(id);
            if (ev == null) return NotFound();
            return Ok(ev);
        }

        // Report data endpoint - accepts tenant via header and date range via query
        [HttpGet("report")]
        public async Task<IActionResult> GetReport([FromQuery] DateTime start, [FromQuery] DateTime end, [FromQuery] DateTime clientNow)
        {
            var tenantHeader = Request.Headers["X-Tenant-ID"].FirstOrDefault();
            if (string.IsNullOrEmpty(tenantHeader) || !Guid.TryParse(tenantHeader, out var tenantId))
                return BadRequest("X-Tenant-ID header is required and must be a GUID.");

            // Get data
            var items = await eventService.GetReportDataAsync(tenantId, start.ToUniversalTime(), end.ToUniversalTime());

            // Return along with client local time for "Report Generated On" feature
            return Ok(new
            {
                ReportGeneratedOnClientLocal = clientNow, // frontend passes client's now
                Data = items
            });
        }
    }
}
