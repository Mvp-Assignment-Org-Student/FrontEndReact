import React from "react";
import { useLocation, Link } from "react-router-dom";

function Header() {
  const location = useLocation();
  const pathSegments = location.pathname.split("/").filter(Boolean); // ["events", "123"]

  // Funktion för att generera namn till varje segment
  const getDisplayName = (segment, index) => {
    if (segment === "") return "Dashboard";
    if (segment === "events") return "Events";
    if (segment === "bookings") return "Bookings";
    if (index > 0 && pathSegments[index - 1] === "events")
      return "Event Details";
    return segment.charAt(0).toUpperCase() + segment.slice(1); // fallback
  };

  // Bygg brödsmulor med länkar
  const breadcrumbs = [
    <Link key="dashboard" to="/">
      Dashboard
    </Link>,
    ...pathSegments.map((segment, index) => {
      const path = "/" + pathSegments.slice(0, index + 1).join("/");
      const name = getDisplayName(segment, index);
      return (
        <span key={path}>
          {" > "}
          <Link to={path}>{name}</Link>
        </span>
      );
    }),
  ];

  const pageTitle = getDisplayName(
    pathSegments[pathSegments.length - 1] || "",
    pathSegments.length - 1
  );

  return (
    <header>
      <div className="header-card">
        <div className="title-container">
          <div className="breadcrum">{breadcrumbs}</div>
          <div className="title">{pageTitle}</div>
        </div>
        <div className="header-btn">
          <i className="fa-regular fa-gear"></i>
        </div>
        <div className="user-info-container">
          <div className="user-img"></div>
          <div className="user-name">FirstName LastName</div>
          <div className="user-role">Role</div>
        </div>
      </div>
    </header>
  );
}

export default Header;
