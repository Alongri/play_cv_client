import React from 'react';
import { useNavigate } from 'react-router-dom';

function HeaderAdmin() {
  let nav = useNavigate();

  const onHomeClick = () => {
    nav("/homeClient");
  };

  const onDashboardAdminClick = () => {
    nav("/admin");
  };

  const buttonStyle = {
    background: "linear-gradient(90deg, #BC7DFC, #0F98E7, rgb(205, 24, 221))",
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
    e.target.style.transform = "scale(1.05)";
    e.target.style.background =
      "linear-gradient(90deg, rgb(52, 97, 245), rgb(172, 131, 224), rgb(9, 243, 60))";
  };

  const handleLeave = (e) => {
    e.target.style.transform = "scale(1)";
    e.target.style.background =
      "linear-gradient(90deg, #BC7DFC, #0F98E7, rgb(205, 24, 221))";
  };

  return (
    <div className="p-2 container" style={{ width: "30em" }}>
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
  );
}

export default HeaderAdmin;
