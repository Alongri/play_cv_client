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
    background: "linear-gradient(90deg, #BC7DFC, #0F98E7,rgb(205, 24, 221))", 
    border: "none",
    borderRadius: "25px",
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
    e.target.style.background = "linear-gradient(90deg,rgb(52, 97, 245),rgb(172, 131, 224),rgb(9, 243, 60))"; 
  };

  const handleLeave = (e) => {
    e.target.style.transform = "scale(1)";
    e.target.style.background = "linear-gradient(90deg,rgb(188, 125, 252),rgb(15, 152, 231),rgb(205, 24, 221))"; 
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
          Help
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
