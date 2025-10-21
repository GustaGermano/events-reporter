import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import EventsPage from './pages/EventsPage';
import ReportsPage from './pages/ReportsPage';

function App() {
  return (
    <BrowserRouter>
      <div style={{ padding: 10 }}>
        <Link to="/">Events</Link> | <Link to="/reports">Reports</Link>
      </div>
      <Routes>
        <Route path="/" element={<EventsPage />} />
        <Route path="/reports" element={<ReportsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
