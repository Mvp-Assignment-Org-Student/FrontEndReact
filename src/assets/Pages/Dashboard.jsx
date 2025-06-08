import React from "react";
import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <section id="dashboard">
      <Link className="dashboard-card">
        <div className="dashboard-card-title">Events</div>
        <div className="dashboard-card-icon">
          <i className="fa-regular fa-arrow-right"></i>
        </div>
      </Link>
      <Link className="dashboard-card">
        <div className="dashboard-card-title">Bookings</div>
        <div className="dashboard-card-icon">
          <i className="fa-regular fa-arrow-right"></i>
        </div>
      </Link>
    </section>
  );
}

export default Dashboard;
