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

  const fetchLeads = async () => {
    const res = await API.get("/leads");
    setLeads(res.data);
  };

  const addLead = async () => {
    await API.post("/leads", {
      name,
      email,
      source: "Website"
    });

    fetchLeads();
    setName("");
    setEmail("");
  };

  const updateStatus = async (id, status) => {
    await API.put(`/leads/${id}`, { status });
    fetchLeads();
  };

  const deleteLead = async (id) => {
    await API.delete(`/leads/${id}`);
    fetchLeads();
  };

  return (
    <div className="dashboard-container">
      <div className="overlay">
        <h1>Mini CRM Dashboard</h1>

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

          <button onClick={addLead}>Add Lead</button>
        </div>

        <input
          className="search-box"
          type="text"
          placeholder="Search by name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="lead-list">
          {leads
            .filter((lead) =>
              lead.name.toLowerCase().includes(search.toLowerCase())
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