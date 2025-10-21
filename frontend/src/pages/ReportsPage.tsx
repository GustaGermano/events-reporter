import { useState } from "react";
import { getReport } from "../api/api";

interface Event {
  id: string;
  name: string;
  start: string;
  end: string;
  venue: string;
  attendees?: any[];
}

interface Report {
  reportGeneratedOnClientLocal: string;
  data: Event[];
}

export default function ReportsPage() {
  const [tenantId, setTenantId] = useState<string>("11111111-1111-1111-1111-111111111111");
  const [start, setStart] = useState<string>(new Date().toISOString().slice(0, 10));
  const [end, setEnd] = useState<string>(new Date().toISOString().slice(0, 10));
  const [report, setReport] = useState<Report | null>(null);

  const load = async () => {
    try {
      const s = new Date(start).toISOString();
      const e = new Date(end).toISOString();
      const data = await getReport(tenantId, s, e);
      setReport(data);
    } catch (err) {
      console.error("Failed to load report:", err);
      setReport(null);
    }
  };

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <h1 style={styles.title}>Events Reporter</h1>
        <p style={styles.subtitle}>
          Consulte e visualize relatórios de eventos de forma prática.
        </p>
      </header>

      <div style={styles.filters}>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Tenant ID:</label>
          <input
            value={tenantId}
            onChange={(e) => setTenantId(e.target.value)}
            style={styles.input}
          />
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>Start:</label>
          <input type="date" value={start} onChange={e => setStart(e.target.value)} style={styles.input} />
          <label style={{ ...styles.label, marginLeft: 10 }}>End:</label>
          <input type="date" value={end} onChange={e => setEnd(e.target.value)} style={styles.input} />
        </div>

        <button onClick={load} style={styles.button}>Load Report</button>
      </div>

      {report && (
        <div style={styles.report}>
          <div style={styles.reportHeader}>
            <strong>Report Generated On (Client local):</strong>{" "}
            {new Date(report.reportGeneratedOnClientLocal).toLocaleString()}
          </div>

          <h3 style={styles.sectionTitle}>Events</h3>
          <ul style={styles.eventList}>
            {report.data.map((ev) => (
              <li key={ev.id} style={styles.eventCard}>
                <strong>{ev.name}</strong> <br />
                <span style={styles.eventDates}>
                  ({new Date(ev.start).toLocaleString()} - {new Date(ev.end).toLocaleString()})
                </span> <br />
                <span>Venue: {ev.venue}</span> <br />
                <span>Attendees: {ev.attendees?.length ?? 0}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  page: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    minHeight: "100vh",
    width: "100%",
    padding: "20px",
    boxSizing: "border-box",
    backgroundColor: "#f0f4f8",
  },
  header: {
    width: "100%",
    maxWidth: "1600px",
    textAlign: "center",
    marginBottom: "30px",
  },
  title: {
    fontSize: "2.2rem",
    margin: 0,
    color: "#1f2937",
  },
  subtitle: {
    fontSize: "1rem",
    color: "#4b5563",
    marginTop: "8px",
  },
  filters: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: "15px",
    width: "100%",
    maxWidth: "1600px",
    marginBottom: "30px",
  },
  inputGroup: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    flex: 1,
    minWidth: "200px",
  },
  label: {
    fontWeight: "bold",
    color: "#374151",
  },
  input: {
    padding: "8px 12px",
    borderRadius: "8px",
    border: "1px solid #d1d5db",
    flex: 1,
    fontSize: "1rem",
  },
  button: {
    padding: "10px 20px",
    borderRadius: "8px",
    backgroundColor: "#3b82f6",
    color: "#fff",
    fontWeight: "bold",
    border: "none",
    cursor: "pointer",
    fontSize: "1rem",
  },
  report: {
    width: "100%",
    maxWidth: "1600px",
    backgroundColor: "#fff",
    borderRadius: "12px",
    padding: "20px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
    boxSizing: "border-box",
  },
  reportHeader: {
    marginBottom: "20px",
    color: "#374151",
  },
  sectionTitle: {
    borderBottom: "2px solid #e5e7eb",
    paddingBottom: "6px",
    marginBottom: "15px",
    color: "#1f2937",
  },
  eventList: {
    listStyle: "none",
    padding: 0,
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "12px",
  },
  eventCard: {
    padding: "12px 15px",
    borderRadius: "10px",
    backgroundColor: "#f9fafb",
    boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
    boxSizing: "border-box",
  },
  eventDates: {
    color: "#6b7280",
    fontSize: "0.9rem",
  },
};
