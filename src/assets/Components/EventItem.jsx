import React from "react";
import { Link } from "react-router-dom";

function EventItem({ item }) {
  return (
    <Link to={`/events/${item.id}`} className="eventlink">
      <div className="event-card">
        <div className="image"></div>
        <div className="card-info">
          <div className="date">2025-06-09 17:00</div>
          <div className="title"> {item.title}</div>
          <div className="location">{item.location}</div>
        </div>
      </div>
    </Link>
  );
}

export default EventItem;
