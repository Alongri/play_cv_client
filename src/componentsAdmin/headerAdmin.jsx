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

  const buttonStyle = {
    background: "#6E2CF2",
    border: "none",
    borderRadius: "5px",
    color: "white",
    padding: "10px 20px",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "transform 0.3s, background-color 0.3s",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
  };

  const handleHover = (e) => {
    e.target.style.transform = "translateY(-2px)";
    e.target.style.boxShadow = "0 6px 12px rgba(0, 0, 0, 0.3)";
  };

  const handleLeave = (e) => {
    e.target.style.transform = "translateY(0)";
    e.target.style.boxShadow = "0 2px 6px rgba(0, 0, 0, 0.1)";
  };

  return (
    <div className="shadow">
      <div className="p-2 container">
        <div className="d-flex justify-content-between">
          <button
            style={buttonStyle}
            onMouseOver={handleHover}
            onMouseOut={handleLeave}
            onClick={onDashboardAdminClick}
          >
            Home Admin
          </button>
          <button
            style={buttonStyle}
            onMouseOver={handleHover}
            onMouseOut={handleLeave}
            onClick={onHomeClick}
          >
            Home Client
          </button>
        </div>
      </div>
    </div>
  );
}

export default HeaderAdmin;
