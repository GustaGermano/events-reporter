import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE || "http://localhost:5000/api"
});

// helper: pass tenant header and client local time
export const getReport = async (tenantId: string, start: string, end: string) => {
  const clientNow = new Date().toISOString();
  const res = await api.get(`/events/report`, {
    params: { start, end, clientNow },
    headers: { "X-Tenant-ID": tenantId }
  });
  return res.data;
};

export const createEvent = async (tenantId: string, ev: any) => {
  const res = await api.post('/events', ev, { headers: { "X-Tenant-ID": tenantId }});
  return res.data;
};

export default api;
