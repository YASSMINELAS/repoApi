import { useState, useEffect } from 'react';
import { incidentService } from '../services/api';

function IncidentsPage() {
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    severity: '',
    status: '',
    search: '',
  });

  // Fetch incidents on component mount and when filters change
  useEffect(() => {
    fetchIncidents();
  }, [filters]);

  const fetchIncidents = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Build query params from filters
      const queryParams = {};
      if (filters.severity) queryParams.severity = filters.severity;
      if (filters.status) queryParams.status = filters.status;
      if (filters.search) queryParams.search = filters.search;

      const response = await incidentService.getAll(queryParams);
      setIncidents(response.data || []);
    } catch (err) {
      setError(err.message || 'Failed to fetch incidents');
      console.error('Error fetching incidents:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value,
    }));
  };

  const handleResolveIncident = async (id) => {
    try {
      await incidentService.resolve(id);
      // Refresh incidents list
      fetchIncidents();
    } catch (err) {
      console.error('Error resolving incident:', err);
      alert('Failed to resolve incident');
    }
  };

  const handleDeleteIncident = async (id) => {
    if (window.confirm('Are you sure you want to delete this incident?')) {
      try {
        await incidentService.delete(id);
        // Refresh incidents list
        fetchIncidents();
      } catch (err) {
        console.error('Error deleting incident:', err);
        alert('Failed to delete incident');
      }
    }
  };

  return (
    <div className="incidents-page">
      <h1>Incidents Management</h1>

      {/* Filters Section */}
      <div className="filters-section">
        <div className="filter-group">
          <label>Severity:</label>
          <select 
            value={filters.severity}
            onChange={(e) => handleFilterChange('severity', e.target.value)}
          >
            <option value="">All Severities</option>
            <option value="critical">Critical</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Status:</label>
          <select 
            value={filters.status}
            onChange={(e) => handleFilterChange('status', e.target.value)}
          >
            <option value="">All Status</option>
            <option value="open">Open</option>
            <option value="in-progress">In Progress</option>
            <option value="resolved">Resolved</option>
            <option value="closed">Closed</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Search:</label>
          <input
            type="text"
            placeholder="Search incidents..."
            value={filters.search}
            onChange={(e) => handleFilterChange('search', e.target.value)}
          />
        </div>

        <button onClick={fetchIncidents} className="btn-refresh">
          Refresh
        </button>
      </div>

      {/* Status Indicators */}
      <div className="status-info">
        {loading && <p>Loading incidents...</p>}
        {error && <p className="error">Error: {error}</p>}
        {!loading && !error && <p>Total incidents: {incidents.length}</p>}
      </div>

      {/* Incidents List/Table */}
      <div className="incidents-list">
        {!loading && incidents.length === 0 ? (
          <p>No incidents found.</p>
        ) : (
          <div className="incidents-container">
            {incidents.map((incident) => (
              <div key={incident._id} className="incident-item">
                <div className="incident-header">
                  <h3>{incident.title}</h3>
                  <span className={`severity-badge severity-${incident.priority}`}>
                    {incident.priority}
                  </span>
                  <span className={`status-badge status-${incident.status}`}>
                    {incident.status}
                  </span>
                </div>

                <div className="incident-details">
                  <p><strong>ID:</strong> {incident._id}</p>
                  <p><strong>Category:</strong> {incident.category}</p>
                  <p><strong>Source:</strong> {incident.source}</p>
                  <p><strong>Description:</strong> {incident.description.substring(0, 200)}...</p>
                  <p><strong>Created:</strong> {new Date(incident.createdAt).toLocaleString()}</p>
                </div>

                <div className="incident-actions">
                  <button 
                    className="btn-view"
                    onClick={() => {
                      // TODO: Implement view details/modal
                      console.log('View incident:', incident._id);
                    }}
                  >
                    View Details
                  </button>
                  
                  {incident.status !== 'resolved' && (
                    <button 
                      className="btn-resolve"
                      onClick={() => handleResolveIncident(incident._id)}
                    >
                      Resolve
                    </button>
                  )}

                  <button 
                    className="btn-delete"
                    onClick={() => handleDeleteIncident(incident._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default IncidentsPage;
