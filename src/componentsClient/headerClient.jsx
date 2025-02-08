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

  return (
    <div
      className="nav-container p-2 container"
      style={{
        width: "100%",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
        borderRadius: "8px",
        backgroundColor: "white", // Ensure visibility
      }}
    >
      <div
        className="d-flex justify-content-between align-items-center"
        style={{ height: "70px" }}
      >
        {!IfShowNav && (
          <button className="playCVButton" onClick={onWelcomeClick}>
            Welcome
          </button>
        )}
        {IfShowNav && (
          <img
            className="logo"
            src={logo}
            style={{
              cursor: "pointer",
              height: "65px",
            }}
            onClick={onHomeClick}
          />
        )}
        <button className="playCVButton" onClick={onHelpClick}>
          Q&A
        </button>
        {IfShowNav && (
          <button className="logout" onClick={onlogout}>
            <span
              style={{ boxShadow: "none" }}
              className="fs-1 bold material-symbols-outlined"
            >
              logout
            </span>
            <p>Logout</p>
          </button>
        )}
        {IfShowNav && IsAdmin && (
          <button className="playCVButton" onClick={onAdminClick}>
            Admin
          </button>
        )}
      </div>
    </div>
  );
}

export default HeaderClient;
