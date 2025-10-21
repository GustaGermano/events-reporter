import { useState } from "react";
import { createEvent } from "../api/api";

export default function EventsPage() {
  const [tenantId, setTenantId] = useState("11111111-1111-1111-1111-111111111111");
  const [name, setName] = useState("");
  const [venue, setVenue] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [attendees, setAttendees] = useState([{ name: "", email: "" }]);
  const [message, setMessage] = useState("");

  const addAttendee = () => setAttendees([...attendees, { name: "", email: "" }]);
  const changeAttendee = (idx:number, key:string, val:string) => {
    const copy = [...attendees];
    (copy[idx] as any)[key] = val;
    setAttendees(copy);
  }

  const submit = async () => {
    const ev = {
      name,
      venue,
      start: new Date(start).toISOString(),
      end: new Date(end).toISOString(),
      attendees
    };
    try {
      await createEvent(tenantId, ev);
      setMessage("Evento criado!");
    } catch (err:any) {
      setMessage("Erro: " + (err?.response?.data ?? err.message));
    }
  };

  return (
    <div className="container">
      <h2>Create Event</h2>
      <div>
        <label>Tenant ID:</label>
        <input value={tenantId} onChange={e=>setTenantId(e.target.value)} style={{ width: 400 }}/>
      </div>
      <div>
        <label>Name:</label>
        <input value={name} onChange={e=>setName(e.target.value)} />
      </div>
      <div>
        <label>Venue:</label>
        <input value={venue} onChange={e=>setVenue(e.target.value)} />
      </div>
      <div>
        <label>Start:</label>
        <input type="datetime-local" onChange={e=>setStart(e.target.value)} />
      </div>
      <div>
        <label>End:</label>
        <input type="datetime-local" onChange={e=>setEnd(e.target.value)} />
      </div>

      <h4>Attendees</h4>
      {attendees.map((a, i) => (
        <div key={i}>
          <input placeholder="name" value={a.name} onChange={e=>changeAttendee(i,"name",e.target.value)} />
          <input placeholder="email" value={a.email} onChange={e=>changeAttendee(i,"email",e.target.value)} />
        </div>
      ))}
      <button onClick={addAttendee}>Add Attendee</button>
      <div><button onClick={submit}>Create</button></div>
      <div>{message}</div>
    </div>
  );
}
