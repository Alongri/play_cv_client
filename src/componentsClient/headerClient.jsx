import React from "react";
import { useNavigate } from "react-router-dom";
import { addIfShowNav } from "../featuers/myDetailsSlice";
import { useDispatch, useSelector } from "react-redux";

function HeaderClient() {
  let nav = useNavigate();
  const dispatch = useDispatch();
  const IfShowNav = useSelector((state) => state.myDetailsSlice.ifShowNav);
  const IsAdmin = useSelector((state) => state.myDetailsSlice.isAdmin);

  const onWelcomeClick = () => {
    nav("/");
  };
  const onHomeClick = () => {
    nav("/homeClient");
  };
  const onHelpClick = () => {
    nav("/help");
  };
  const onlogout = () => {
    dispatch(addIfShowNav({ ifShowNav: false }));
    nav("/logout");
  };
  const onAdminClick = () => {
    nav("/Admin");
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
    <div className="p-2 container" style={{ width: "30em" }}>
      <div className="d-flex justify-content-between">
        {!IfShowNav && (
          <button
            style={buttonStyle}
            onMouseOver={handleHover}
            onMouseOut={handleLeave}
            onClick={onWelcomeClick}
          >
            Welcome
          </button>
        )}
        {IfShowNav && (
          <button
            style={buttonStyle}
            onMouseOver={handleHover}
            onMouseOut={handleLeave}
            onClick={onHomeClick}
          >
            Home
          </button>
        )}
        <button
          style={buttonStyle}
          onMouseOver={handleHover}
          onMouseOut={handleLeave}
          onClick={onHelpClick}
        >
          Q&A
        </button>
        {IfShowNav && (
          <button
            style={buttonStyle}
            onMouseOver={handleHover}
            onMouseOut={handleLeave}
            onClick={onlogout}
          >
            Logout
          </button>
        )}
        {IfShowNav && IsAdmin && (
          <button
            style={buttonStyle}
            onMouseOver={handleHover}
            onMouseOut={handleLeave}
            onClick={onAdminClick}
          >
            Admin
          </button>
        )}
      </div>
    </div>
  );
}

export default HeaderClient;
