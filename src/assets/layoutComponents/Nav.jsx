import React, { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      const token = localStorage.getItem("jwtToken");

      await fetch(
        "https://authservicemvp-fce3bbajf7bwegdq.swedencentral-01.azurewebsites.net/api/Auth/signout",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (err) {
      console.error("Logout error:", err);
    }

    localStorage.removeItem("jwtToken");
    navigate("/signin");
  };

  const closeMenu = () => setIsMenuOpen(false);

  const location = useLocation();

  const getTitle = () => {
    const path = location.pathname;

    if (path === "/") return "Dashboard";
    if (path.startsWith("/events")) return "Events";
    if (path.startsWith("/bookings")) return "Bookings";

    return ""; // fallback, kan vara tom eller "Page"
  };
  return (
    <nav>
      <div className="navcard">
        <div className="logo-container">
          <div className="logotype">
            <img src="/src/images/LogoType.svg" alt="" />
          </div>
          <div className="logo-text">Ventixe</div>
        </div>
        <div className="navlinks">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "navlink active" : "navlink"
            }
          >
            <i className="fa-regular fa-grid-2"></i>
            <p className="navlink-text">Dashboard</p>
          </NavLink>
          <NavLink
            to="/events"
            className={({ isActive }) =>
              isActive ? "navlink active" : "navlink"
            }
          >
            <i className="fa-regular fa-ticket"></i>
            <p className="navlink-text">Events</p>
          </NavLink>
          <NavLink
            to="/bookings"
            className={({ isActive }) =>
              isActive ? "navlink active" : "navlink"
            }
          >
            <i className="fa-light fa-check-to-slot"></i>
            <p className="navlink-text">Bookings</p>
          </NavLink>
        </div>
        <div className="btn-container">
          <button className="signout-btn btn" onClick={handleSignOut}>
            <i className="fa-regular fa-right-from-bracket"></i>
            <p className="signout-btn-text">Sign Out</p>
          </button>
        </div>
        <div className="mobile-title">{getTitle()}</div>{" "}
        <div className="mobile-menu-wrapper">
          <div
            className="mobile-menu"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <i className="fa-solid fa-bars"></i>
          </div>
          {isMenuOpen && (
            <div className="mobile-navlinks">
              <NavLink
                to="/"
                className="mobile-navlink"
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard
              </NavLink>
              <NavLink
                to="/events"
                className="mobile-navlink"
                onClick={() => setIsMenuOpen(false)}
              >
                Events
              </NavLink>
              <NavLink
                to="/bookings"
                className="mobile-navlink"
                onClick={() => setIsMenuOpen(false)}
              >
                Bookings
              </NavLink>
              <button className="mobile-signout-btn" onClick={handleSignOut}>
                <i className="fa-regular fa-right-from-bracket"></i>
                <span>Sign Out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Nav;
