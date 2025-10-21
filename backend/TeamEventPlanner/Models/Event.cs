using System.ComponentModel.DataAnnotations;

namespace TeamEventPlanner.Models
{
    public class Event
    {
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid();

        public Guid TenantId { get; set; } // multi-tenant support

        [Required]
        public string Name { get; set; }

        public DateTime Start { get; set; }
        public DateTime End { get; set; }

        public string Venue { get; set; }

        public ICollection<Attendee> Attendees { get; set; } = new List<Attendee>();
    }
}
