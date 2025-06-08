import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function BookingItem({ item }) {
  const [eventTitle, setEventTitle] = useState();
  //Chatgpt
  const date = new Date(item.bookingDate);
  const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")} ${date
    .getHours()
    .toString()
    .padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`;

  useEffect(() => {
    async function fetchEvent() {
      try {
        const response = await fetch(
          `https://eventservicemvp-brf3fjdybxg8hpgc.swedencentral-01.azurewebsites.net/api/Events/${item.eventId}`
        );
        if (response.ok) {
          const data = await response.json();
          setEventTitle(data.result.title);
        } else {
          setEventTitle("Event ej hittat");
        }
      } catch (error) {
        console.error("Fel vid hämtning av event:", error);
        setEventTitle("Fel vid hämtning");
      }
    }

    fetchEvent();
  }, [item.eventId]);

  return (
    <div className="booking-list-item">
      <div className="booking-id">{item.id}</div>

      <div className="booking-owner">
        <div>{item.bookingOwnerId}</div>

        <div>
          {item.firstName} {item.lastName}
        </div>
      </div>

      <div className="booking-date">
        <div className="booking-date-item">{formattedDate}</div>
      </div>

      <div className="event-info">
        <div className="event-title">{eventTitle}</div>
      </div>
    </div>
  );
}

export default BookingItem;
