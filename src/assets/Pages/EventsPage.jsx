import React, { useEffect, useState } from "react";
import EventItem from "../Components/EventItem";
import CreateEventModal from "./CreateEventModal";
import { useNavigate } from "react-router-dom";

function EventsPage() {
  const [events, setEvents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const getEvents = async () => {
    const response = await fetch(
      "https://eventservicemvp-brf3fjdybxg8hpgc.swedencentral-01.azurewebsites.net/api/Events"
    );

    if (response.ok) {
      const data = await response.json();
      setEvents(data.result);
    }
  };

  useEffect(() => {
    getEvents();
  }, []);

  // Callback för att uppdatera listan när ett event skapats
  const handleEventCreated = () => {
    getEvents(); // hämta om eventlistan
    setIsModalOpen(false); // stäng modalen
  };

  const handleCreateEvent = () => {
    const token = localStorage.getItem("jwtToken");
    if (!token) {
      navigate("/signin");
      return;
    }

    setIsModalOpen(true);
  };
  return (
    <section id="events">
      <div className="overview">
        <div className="event-btn-container">
          <button className="btn" onClick={() => handleCreateEvent()}>
            Create event
          </button>
        </div>
      </div>

      <div className="event-grid">
        {events.map((event) => (
          <EventItem key={event.id} item={event} />
        ))}
      </div>

      {isModalOpen && (
        <CreateEventModal
          onClose={() => setIsModalOpen(false)}
          onEventCreated={handleEventCreated}
        />
      )}
    </section>
  );
}

export default EventsPage;
