import React from "react";
import { useNavigate } from "react-router-dom";
import { addIfShowNav } from "../featuers/myDetailsSlice";
import { useDispatch, useSelector } from "react-redux";
import logo from "../assets/Playcvlogo-removebg-preview.png";

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
    color: "white",
    borderRadius: "5px",
    padding: "20px 20px",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "transform 0.3s, background-color 0.3s",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
    onMouseHover: {
      background: "#6E2CF2",
      color: "white",
    },
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
          <img
            src={logo}
            style={{
              cursor: "pointer",
              position: "absolute",
              left: "10px",
              height: "80px",
            }}
            onClick={onHomeClick}
          />
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
            className="btn border-danger shadow d-flex justify-content-center align-items-center fs-4 text-white"
            style={{
              position: "absolute",
              right: "10px",
              top: "10px",
              transition: "transform 0.3s, background-color 0.3s",
            }}
            onClick={onlogout}
          >
            Logout
            <span
              style={{ boxShadow: "none", color: "red"}}
              className="fs-1 bold material-symbols-outlined"
            >
              logout
            </span>
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
