import { useState } from "react";

function IncidentForm() {

  const [formData, setFormData] = useState({
    title: "",
    severity: "",
    description: "",
    affectedAssets: "",
    scanReportId: "",
    jwtToken: ""
  });

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:3000/api/incidents",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${formData.jwtToken}`
          },
          body: JSON.stringify({
            title: formData.title,
            severity: formData.severity,
            description: formData.description,
            affectedAssets: formData.affectedAssets
              .split(",")
              .map(item => item.trim()),
            scanReportId: formData.scanReportId
          })
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("Incident créé avec succès");

        setFormData({
          title: "",
          severity: "",
          description: "",
          affectedAssets: "",
          scanReportId: "",
          jwtToken: ""
        });

      } else {
        alert(data.message || "Erreur");
      }

    } catch (error) {
      alert("Erreur connexion backend");
    }
  }

  return (
    <div>

      <h2>Créer un Incident</h2>

      <form onSubmit={handleSubmit}>

        <div>
          <label>Titre</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Sévérité</label>

          <select
            name="severity"
            value={formData.severity}
            onChange={handleChange}
          >
            <option value="">Choisir</option>
            <option value="critical">Critical</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>

        <div>
          <label>Description</label>

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Assets affectés</label>

          <input
            type="text"
            name="affectedAssets"
            value={formData.affectedAssets}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Scan Report ID</label>

          <input
            type="text"
            name="scanReportId"
            value={formData.scanReportId}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>JWT Token</label>

          <input
            type="password"
            name="jwtToken"
            value={formData.jwtToken}
            onChange={handleChange}
          />
        </div>

        <br />

        <button type="submit">
          Soumettre Incident
        </button>

      </form>

    </div>
  );
}

export default IncidentForm;