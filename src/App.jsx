import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import IncidentsPage from './pages/IncidentsPage';

function App() {
  return (
    <Router>
      <div className="app">
        <nav className="navbar">
          <h1>SOC Dashboard</h1>
         <ul>
  <li><Link to="/">Home</Link></li>
  <li><Link to="/incidents">Incidents</Link></li>
  <li><Link to="/scans">Scans</Link></li>
</ul>
        </nav>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/incidents" element={<IncidentsPage />} />
            {/* TODO: Add Scans page */}
            {/* <Route path="/scans" element={<ScansPage />} /> */}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

function Home() {
  return (
    <div>
      <h2>Welcome to SOC Dashboard</h2>
      <p>Select a section from the navigation menu.</p>
    </div>
  );
}

export default App;