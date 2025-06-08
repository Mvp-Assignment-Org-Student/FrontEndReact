import React, { useEffect, useState } from "react";
import BookingItem from "../Components/BookingItem";

function BookingsPage() {
  const [bookings, setBookings] = useState([]);

  const getBookings = async () => {
    try {
      const res = await fetch(
        `https://bookingservicemvp-f6fcaeanghcaf3at.swedencentral-01.azurewebsites.net/api/Bookings`
      );
      if (res.ok) {
        const response = await res.json();
        setBookings(response.result);
      }
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    getBookings();
  }, []);
  return (
    <section id="booking">
      <div className="booking-overview">
        <div className="booking-id">Booking Id</div>

        <div className="booking-owner">Booking Owner</div>

        <div className="booking-date">Booking Date</div>

        <div className="booking-event-title">Event</div>
      </div>
      <div className="booking-list">
        {bookings.map((booking) => (
          <BookingItem key={booking.id} item={booking} />
        ))}
      </div>
    </section>
  );
}

export default BookingsPage;
