using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TeamEventPlanner.Models
{
    public class Attendee
    {
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid();

        [Required]
        public string Name { get; set; }

        [Required]
        public string Email { get; set; }

        [ForeignKey("Event")]
        public Guid EventId { get; set; }
        public Event Event { get; set; }
    }
}
