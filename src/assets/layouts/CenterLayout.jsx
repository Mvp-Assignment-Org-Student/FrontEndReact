import React from "react";
import { Outlet } from "react-router-dom";

function CenterLayout() {
  return (
    <div className="center-wrapper">
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default CenterLayout;
