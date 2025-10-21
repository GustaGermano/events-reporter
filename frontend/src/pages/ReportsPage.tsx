import { useState } from "react";
import { getReport } from "../api/api";

export default function ReportsPage() {
  const [tenantId, setTenantId] = useState("11111111-1111-1111-1111-111111111111");
  const [start, setStart] = useState(new Date().toISOString().slice(0,10));
  const [end, setEnd] = useState(new Date().toISOString().slice(0,10));
  const [report, setReport] = useState<any>(null);

  const load = async () => {
    const s = new Date(start).toISOString();
    const e = new Date(end).toISOString();
    const data = await getReport(tenantId, s, e);
    setReport(data);
  };

  return (
    <div className="container">
      <h2>Reports</h2>
      <div>
        <label>Tenant ID: </label>
        <input value={tenantId} onChange={(e)=>setTenantId(e.target.value)} style={{ width: 400 }} />
      </div>
      <div>
        <label>Start: </label>
        <input type="date" value={start} onChange={e=>setStart(e.target.value)} />
        <label> End: </label>
        <input type="date" value={end} onChange={e=>setEnd(e.target.value)} />
      </div>
      <button onClick={load}>Load Report</button>

      {report && (
        <div style={{ marginTop: 20 }}>
          <div><strong>Report Generated On (Client local):</strong> {new Date(report.reportGeneratedOnClientLocal).toLocaleString()}</div>
          <h3>Events</h3>
          <ul>
            {report.data.map((ev:any) => (
              <li key={ev.id}>
                <strong>{ev.name}</strong> ({new Date(ev.start).toLocaleString()} - {new Date(ev.end).toLocaleString()}) <br/>
                Venue: {ev.venue} <br/>
                Attendees: {ev.attendees?.length ?? 0}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
