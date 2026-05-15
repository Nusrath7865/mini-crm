import React, { useEffect, useState } from "react";
import API from "../services/api";

function Dashboard() {

  const [leads, setLeads] = useState([]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      const res = await API.get("/leads");
      setLeads(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addLead = async () => {
    try {

      await API.post("/leads", {
        name,
        email,
        status: "new",
      });

      fetchLeads();

      setName("");
      setEmail("");

    } catch (error) {
      console.log(error);
    }
  };

  const updateStatus = async (id, status) => {
    try {

      await API.put(`/leads/${id}`, {
        status,
      });

      fetchLeads();

    } catch (error) {
      console.log(error);
    }
  };

  const deleteLead = async (id) => {
    try {

      await API.delete(`/leads/${id}`);

      fetchLeads();

    } catch (error) {
      console.log(error);
    }
  };

  const filteredLeads = leads.filter((lead) =>
    lead.name.toLowerCase().includes(search.toLowerCase())
  );

  const contactedLeads = leads.filter(
    (lead) => lead.status === "contacted"
  ).length;

  const convertedLeads = leads.filter(
    (lead) => lead.status === "converted"
  ).length;

  return (
    <div className="dashboard">

      <h1>Mini CRM Dashboard</h1>

      <div className="stats-container">

        <div className="stat-box">
          <h3>Total Leads</h3>
          <p>{leads.length}</p>
        </div>

        <div className="stat-box">
          <h3>Contacted</h3>
          <p>{contactedLeads}</p>
        </div>

        <div className="stat-box">
          <h3>Converted</h3>
          <p>{convertedLeads}</p>
        </div>

      </div>

      <div className="form-container">

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

        <button onClick={addLead}>
          Add Lead
        </button>

      </div>

      <input
        type="text"
        placeholder="Search by name"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-box"
      />

      <div className="cards-container">

        {filteredLeads.map((lead) => (

          <div className="card" key={lead._id}>

            <h2>{lead.name}</h2>

            <p>{lead.email}</p>

            <p className={lead.status}>
              Status: {lead.status}
            </p>

            <button
              onClick={() =>
                updateStatus(lead._id, "contacted")
              }
            >
              Contacted
            </button>

            <button
              onClick={() =>
                updateStatus(lead._id, "converted")
              }
            >
              Converted
            </button>

            <button
              onClick={() => deleteLead(lead._id)}
            >
              Delete
            </button>

          </div>

        ))}

      </div>

    </div>
  );
}

export default Dashboard;