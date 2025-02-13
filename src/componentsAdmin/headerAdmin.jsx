import React from "react";
import { useNavigate } from "react-router-dom";

function HeaderAdmin() {
  let nav = useNavigate();

  const onHomeClick = () => {
    nav("/homeClient");
  };

  const onDashboardAdminClick = () => {
    nav("/admin");
  };

  return (
    <div
      style={{
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
        backgroundColor: "white",
        height: "60px",
      }}
    >
      <div
        className="d-flex justify-content-around pt-1"
      >
        <button className="playCVButton1" onClick={onDashboardAdminClick}>
          Home Admin
        </button>
        <button className="playCVButton1" onClick={onHomeClick}>
          Home Client
        </button>
      </div>
    </div>
  );
}

export default HeaderAdmin;
