const API_BASE_URL = 'http://localhost:3000/api';

// Generic API request handler
const apiRequest = async (endpoint, method = 'GET', data = null) => {
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (data) {
    options.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, options);
    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`API request failed for ${endpoint}:`, error);
    throw error;
  }
};

// Incident endpoints
export const incidentService = {
  // Get all incidents with optional filters
  getAll: (filters = {}) => {
    const params = new URLSearchParams(filters);
    return apiRequest(`/incidents?${params.toString()}`);
  },

  // Get incident by ID
  getById: (id) => apiRequest(`/incidents/${id}`),

  // Get incidents by severity
  getBySeverity: () => apiRequest('/incidents/severity-report'),

  // Create incident
  create: (incidentData) => apiRequest('/incidents', 'POST', incidentData),

  // Update incident
  update: (id, updateData) => apiRequest(`/incidents/${id}`, 'PUT', updateData),

  // Resolve incident
  resolve: (id) => apiRequest(`/incidents/${id}/resolve`, 'PATCH'),

  // Delete incident
  delete: (id) => apiRequest(`/incidents/${id}`, 'DELETE'),
};

// Scan endpoints (for reference)
export const scanService = {
  getAll: () => apiRequest('/scans'),
  getById: (id) => apiRequest(`/scans/${id}`),
};
