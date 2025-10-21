import React, { useState } from "react";

interface Attendee {
  name: string;
  email: string;
}

const CreateEventPage: React.FC = () => {
  const [tenantId, setTenantId] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [venue, setVenue] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [attendees, setAttendees] = useState<Attendee[]>([{ name: "", email: "" }]);
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const handleAddAttendee = () => {
    setAttendees([...attendees, { name: "", email: "" }]);
  };

  const handleAttendeeChange = (index: number, field: keyof Attendee, value: string) => {
    const updated = [...attendees];
    updated[index][field] = value;
    setAttendees(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("http://localhost:5041/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tenantId, name, venue, startDate, endDate, attendees }),
      });

      if (response.ok) {
        setMessage("✅ Event created successfully!");
        setTenantId("");
        setName("");
        setVenue("");
        setStartDate("");
        setEndDate("");
        setAttendees([{ name: "", email: "" }]);
      } else {
        setMessage("❌ Error creating event. Check your backend connection.");
      }
    } catch (error) {
      setMessage("❌ Network error. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h1 style={styles.title}>Create Event</h1>

        <form onSubmit={handleSubmit} style={styles.form}>
          <label style={styles.label}>Tenant ID</label>
          <input
            style={styles.input}
            value={tenantId}
            onChange={(e) => setTenantId(e.target.value)}
            placeholder="Enter Tenant ID"
            required
          />

          <label style={styles.label}>Event Name</label>
          <input
            style={styles.input}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter event name"
            required
          />

          <label style={styles.label}>Venue</label>
          <input
            style={styles.input}
            value={venue}
            onChange={(e) => setVenue(e.target.value)}
            placeholder="Enter venue"
            required
          />

          <div style={styles.dateGroup}>
            <div style={styles.dateInput}>
              <label style={styles.label}>Start Date</label>
              <input
                type="datetime-local"
                style={styles.input}
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
              />
            </div>

            <div style={styles.dateInput}>
              <label style={styles.label}>End Date</label>
              <input
                type="datetime-local"
                style={styles.input}
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                required
              />
            </div>
          </div>

          <h3 style={styles.subtitle}>Attendees</h3>
          <div style={styles.attendeesContainer}>
            {attendees.map((attendee, index) => (
              <div key={index} style={styles.attendeeRow}>
                <input
                  style={{ ...styles.input, flex: 1 }}
                  value={attendee.name}
                  onChange={(e) => handleAttendeeChange(index, "name", e.target.value)}
                  placeholder="Name"
                  required
                />
                <input
                  style={{ ...styles.input, flex: 1 }}
                  value={attendee.email}
                  onChange={(e) => handleAttendeeChange(index, "email", e.target.value)}
                  placeholder="Email"
                  type="email"
                  required
                />
              </div>
            ))}
          </div>

          <div style={styles.buttonsRow}>
            <button type="button" onClick={handleAddAttendee} style={styles.secondaryButton}>
              + Add Attendee
            </button>

            <button type="submit" style={styles.primaryButton} disabled={loading}>
              {loading ? "Creating..." : "Create Event"}
            </button>
          </div>

          {message && <p style={styles.message}>{message}</p>}
        </form>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  page: {
    display: "flex",
    justifyContent: "center",
    padding: "20px",
    width: "100%",
    minHeight: "100vh",
    backgroundColor: "#f0f4f8",
    boxSizing: "border-box",
  },
  container: {
    width: "100%",
    maxWidth: "1400px",
    padding: "25px",
    borderRadius: "12px",
    backgroundColor: "#fff",
    boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
    boxSizing: "border-box",
  },
  title: {
    fontSize: "2rem",
    textAlign: "center",
    marginBottom: "20px",
    color: "#1f2937",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  label: {
    fontWeight: 600,
    color: "#4b5563",
    fontSize: "0.95rem",
  },
  input: {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #d1d5db",
    outline: "none",
    fontSize: "1rem",
    boxSizing: "border-box",
  },
  dateGroup: {
    display: "flex",
    gap: "15px",
    flexWrap: "wrap",
  },
  dateInput: {
    flex: 1,
    minWidth: "200px",
  },
  subtitle: {
    marginTop: "15px",
    fontSize: "1.1rem",
    color: "#1f2937",
  },
  attendeesContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  attendeeRow: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
  },
  buttonsRow: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: "10px",
    marginTop: "10px",
  },
  secondaryButton: {
    flex: 1,
    minWidth: "180px",
    padding: "10px",
    borderRadius: "6px",
    backgroundColor: "#e5e7eb",
    color: "#1f2937",
    border: "none",
    cursor: "pointer",
    fontWeight: 500,
  },
  primaryButton: {
    flex: 1,
    minWidth: "180px",
    padding: "12px",
    borderRadius: "6px",
    backgroundColor: "#3b82f6",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    fontWeight: 600,
    fontSize: "1rem",
  },
  message: {
    textAlign: "center",
    marginTop: "15px",
    color: "#3b82f6",
    fontWeight: 500,
  },
};

export default CreateEventPage;
