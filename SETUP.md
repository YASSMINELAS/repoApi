# Frontend Incident Management Page - Setup Guide

## Installation

1. **Install React Router** (required for navigation):
```bash
cd frontend
npm install react-router-dom
```

## Project Structure

```
frontend/src/
├── App.jsx                 # Main app with routing
├── pages/
│   └── IncidentsPage.jsx   # Incidents list & management page
├── services/
│   └── api.js              # API service for backend communication
├── main.jsx                # React entry point
└── App.css                 # Basic styling
```

## Features Implemented

### IncidentsPage Component
- **Fetch incidents**: Loads all incidents from backend on mount
- **Filtering**: Filter by severity (critical/high/medium/low) and status (open/in-progress/resolved/closed)
- **Search**: Search incidents by title or description
- **Actions**:
  - View Details (TODO: Implement modal)
  - Resolve Incident
  - Delete Incident
- **Real-time updates**: List refreshes after actions

### API Service (`api.js`)
- Generic API request handler with error handling
- Incident endpoints:
  - `getAll(filters)` - Get incidents with optional filters
  - `getById(id)` - Get single incident
  - `getBySeverity()` - Get incidents grouped by severity
  - `create(data)` - Create new incident
  - `update(id, data)` - Update incident
  - `resolve(id)` - Mark incident as resolved
  - `delete(id)` - Delete incident

### Routing
- `/` - Home page
- `/incidents` - Incidents management page
- `/scans` - Placeholder for scans page (TODO)

## Environment Setup

The frontend assumes the backend API is running on `http://localhost:3000`. If your backend runs on a different URL, update the `API_BASE_URL` in `frontend/src/services/api.js`.

## Next Steps

1. Install dependencies: `npm install react-router-dom`
2. Start frontend: `npm run dev`
3. Navigate to `/incidents` to see the incidents list
4. Implement additional features:
   - Incident detail modal
   - Create incident form
   - Edit incident functionality
   - Severity report visualization
   - Scan integration

## Notes

- No design/CSS styling implemented yet (basic structure only)
- Loading and error states are logged to console
- API responses assume backend returns `{ data: [...] }` format
- Authentication/JWT tokens not yet implemented
