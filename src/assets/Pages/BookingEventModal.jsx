import React, { useEffect, useState } from "react";

const BookingEventModal = ({ isOpen, onClose, eventId, selectedPackage }) => {
  const [event, setEvent] = useState({});
  const [formData, setFormData] = useState({
    eventId: eventId,
    packageId: "",
    firstName: "",
    lastName: "",
    email: "",
    streetName: "",
    zipCode: "",
    city: "",
    ticketQuantity: 1,
  });

  const getEvent = async () => {
    try {
      const res = await fetch(
        `https://eventservicemvp-brf3fjdybxg8hpgc.swedencentral-01.azurewebsites.net/api/Events/${eventId}`
      );
      if (res.ok) {
        const response = await res.json();
        setEvent(response.result);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const postBooking = async () => {
    try {
      const res = await fetch(
        `https://bookingservicemvp-f6fcaeanghcaf3at.swedencentral-01.azurewebsites.net/api/Bookings`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!res.ok) {
        console.error("Booking failed");
        console.log(res);
        console.log(formData);
      } else {
        console.log("Booking succeed");
        onClose(); // stänger modalen efter bokning
      }
    } catch (err) {
      console.error("Error submitting:", err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await postBooking();
  };

  useEffect(() => {
    if (isOpen) {
      getEvent();
    }
  }, [isOpen]);

  useEffect(() => {
    if (selectedPackage?.id) {
      setFormData((prev) => ({
        ...prev,
        packageId: parseInt(selectedPackage.id, 10),
      }));
    }
  }, [selectedPackage]);

  useEffect(() => {
    if (eventId) {
      setFormData((prev) => ({ ...prev, eventId }));
    }
  }, [eventId]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <form noValidate onSubmit={handleSubmit} className="booking-form">
          <h2>Book Event: {event.title}</h2>

          <div className="form-group">
            <label>First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Street Name</label>
            <input
              type="text"
              name="streetName"
              value={formData.streetName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Zip Code</label>
            <input
              type="text"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>City</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <h3>Selected Package: {selectedPackage?.title}</h3>
            <p>
              Price: {selectedPackage?.price} {selectedPackage?.currency}
            </p>
          </div>

          <div className="modal-buttons">
            <button
              type="button"
              onClick={onClose}
              className="btn btn-secondary"
            >
              Cancel
            </button>
            <button type="submit" className="btn booking-btn">
              Book Now
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingEventModal;
