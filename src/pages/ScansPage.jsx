import { useState, useEffect } from 'react';
import { incidentService } from '../services/api';

function ScansPage() {
  const [scans, setScans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchScans();
  }, []);

  const fetchScans = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await incidentService.getAll(); // TODO: Use scanService
      setScans(response.data || []);
    } catch (err) {
      setError(err.message || 'Failed to fetch scans');
      console.error('Error fetching scans:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="scans-page">
      <h1>Scans</h1>
      
      {loading && <p>Loading scans...</p>}
      {error && <p className="error">Error: {error}</p>}
      
      <div className="scans-list">
        {!loading && scans.length === 0 ? (
          <p>No scans found.</p>
        ) : (
          <div>
            {scans.map((scan) => (
              <div key={scan._id} className="scan-item">
                <h3>{scan.name || 'Scan'}</h3>
                <p>ID: {scan._id}</p>
                <p>Status: {scan.status}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ScansPage;
