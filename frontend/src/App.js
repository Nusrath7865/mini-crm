import React from "react";
import Dashboard from "./pages/Dashboard";
import "./App.css";

function App() {
  return (
    <div className="app">

      <div className="navbar">
        <h2>Mini CRM</h2>

        <button className="logout-btn">
          Logout
        </button>
      </div>

      <Dashboard />

      <footer>
        Built by Nusrath Fathima
      </footer>

    </div>
  );
}

export default App;