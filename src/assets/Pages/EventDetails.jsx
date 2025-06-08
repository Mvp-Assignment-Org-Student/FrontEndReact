import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BookingEventModal from "./BookingEventModal";

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const navigate = useNavigate();
  const getEvent = async () => {
    const res = await fetch(
      `https://eventservicemvp-brf3fjdybxg8hpgc.swedencentral-01.azurewebsites.net/api/Events/${id}`
    );
    if (res.ok) {
      const response = await res.json();
      setEvent(response.result);
    }
  };

  const handleDelete = async () => {
    const token = localStorage.getItem("jwtToken");
    if (!token) {
      alert("Du måste vara inloggad för att radera event.");
      navigate("/signin");
      return;
    }
    if (!window.confirm("Är du säker på att du vill ta bort detta event?"))
      return;

    const res = await fetch(
      `https://eventservicemvp-brf3fjdybxg8hpgc.swedencentral-01.azurewebsites.net/api/Events/${id}`,
      {
        method: "DELETE",
      }
    );

    if (res.ok) {
      alert("Event deleted successfully");
      navigate("/events"); // Navigera till event-listan eller annan passande sida
    } else {
      alert("Failed to delete event");
    }
  };

  const handleBookClick = (pkg) => {
    const token = localStorage.getItem("jwtToken");
    if (!token) {
      navigate("/signin");
      return;
    }
    setSelectedPackage(pkg);
    setIsModalOpen(true);
  };

  useEffect(() => {
    getEvent();
  }, [id]);

  return (
    <section id="eventdetail-bg-card">
      <div className="eventdetail-card">
        <div className="image"></div>
        <div className="card-content">
          <div className="title">
            <h4>{event.title}</h4>
          </div>
          <div className="date">DATE 16:00 adassda</div>
          <div className="location">{event.location}</div>

          <div className="event-info">
            <p className="lower-title">About event</p>
          </div>
          <div className="description">{event.description}</div>
          <div className="event-id"> Event id: {event.id}</div>
        </div>
      </div>
      <div className="box1">
        <div className="event-package">
          {event.packages?.map((pkg) => (
            <div key={pkg.id} className="package-card">
              <div className="package-title">{pkg.title}</div>
              <div className="package-price">
                {pkg.price} {pkg.currency}
              </div>
              <button
                className="btn book-event-btn"
                onClick={() => handleBookClick(pkg)}
              >
                Book this package
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="terms">
        <h3>Terms</h3>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam qui
          voluptatem dolore molestiae nulla beatae nisi sit doloremque. Officiis
          maiores animi nesciunt nulla reprehenderit, quibusdam dolor odio earum
          enim unde quos amet consequuntur impedit quisquam illo porro autem,
          assumenda a necessitatibus mollitia repudiandae? Eos distinctio iusto,
          quisquam ad labore ullam voluptatem natus omnis. Ratione, placeat eos?
          Ducimus aut expedita earum architecto sapiente, facilis repudiandae
          distinctio tempora debitis velit soluta. Ab ex tempore sed a
          similique.
        </p>
        <button onClick={handleDelete} className="btn btn-danger">
          Delete
        </button>
      </div>

      <BookingEventModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        eventId={event.id}
        selectedPackage={selectedPackage}
      />
    </section>
  );
};

export default EventDetails;
