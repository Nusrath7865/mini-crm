import React, { useEffect, useState } from "react";
import API from "../services/api";
import "./Dashboard.css";

function Dashboard() {
  const [leads, setLeads] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchLeads();
  }, []);

  // FETCH LEADS
  const fetchLeads = async () => {
    try {
      const res = await API.get("/leads");
      setLeads(res.data);
    } catch (err) {
      console.log("Error fetching leads:", err);
    }
  };

  // ADD LEAD (FIXED)
  const addLead = async () => {
    if (!name.trim() || !email.trim()) {
      alert("Name and Email are required");
      return;
    }

    try {
      await API.post("/leads", {
        name,
        email,
        source: "Website"
      });

      fetchLeads();
      setName("");
      setEmail("");
    } catch (err) {
      console.log("Error adding lead:", err);
      alert("Failed to add lead");
    }
  };

  // UPDATE STATUS
  const updateStatus = async (id, status) => {
    try {
      await API.put(`/leads/${id}`, { status });
      fetchLeads();
    } catch (err) {
      console.log("Error updating status:", err);
    }
  };

  // DELETE LEAD
  const deleteLead = async (id) => {
    try {
      await API.delete(`/leads/${id}`);
      fetchLeads();
    } catch (err) {
      console.log("Error deleting lead:", err);
    }
  };

  return (
    <div className="dashboard-container">
      <div className="overlay">
        <h1>Mini CRM Dashboard</h1>

        {/* FORM */}
        <div className="form-section">
          <input
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button
            onClick={addLead}
            disabled={!name.trim() || !email.trim()}
          >
            Add Lead
          </button>
        </div>

        {/* SEARCH */}
        <input
          className="search-box"
          type="text"
          placeholder="Search by name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* LEAD LIST */}
        <div className="lead-list">
          {leads
            .filter((lead) =>
              lead.name?.toLowerCase().includes(search.toLowerCase())
            )
            .map((lead) => (
              <div className="lead-card" key={lead._id}>
                <h3>{lead.name}</h3>
                <p>{lead.email}</p>
                <p>Status: {lead.status}</p>

                <button onClick={() => updateStatus(lead._id, "contacted")}>
                  Contacted
                </button>

                <button onClick={() => updateStatus(lead._id, "converted")}>
                  Converted
                </button>

                <button onClick={() => deleteLead(lead._id)}>
                  Delete
                </button>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;