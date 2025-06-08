import React from "react";
import Nav from "../layoutComponents/Nav";
import Header from "../layoutComponents/Header";
import Footer from "../layoutComponents/Footer";
import { Outlet } from "react-router-dom";

function PortalLayout() {
  return (
    <div className="portal-wrapper">
      <Nav />
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default PortalLayout;
