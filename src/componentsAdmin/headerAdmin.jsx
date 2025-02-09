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

    <div className="py-2 "
      style={{
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
        // borderRadius: "8px",
        backgroundColor: "white", // Ensure visibility
      }}>
      <div className="p-2 container"
        style={{
          width: "30em",
          // borderRadius: "8px",
          backgroundColor: "white", // Ensure visibility
        }}>
        <div className="d-flex justify-content-between">
          <button
            className="playCVButton"
            onClick={onDashboardAdminClick}
          >
            Home Admin
          </button>
          <button
            className="playCVButton"
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
