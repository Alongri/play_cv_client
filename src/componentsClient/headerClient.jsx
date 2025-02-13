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
    IfShowNav ?
      <div
        className=" p-1 "
        style={{
          width: "100%",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
          // borderRadius: "8px",
          backgroundColor: "white", // Ensure visibility
        }}
      >
        <div
          className="d-flex justify-content-between align-items-center"
          style={{ height: "60px" }}
        >
          {IfShowNav && (
            <img
              className="logo"
              src={logo}
              style={{
                cursor: "pointer",
                height: "60px",
              }}
              onClick={onHomeClick}
            />
          )}
          {IfShowNav && (
            <button className="playCVButton1" onClick={onHelpClick}>
              Q&A
            </button>
          )}
          {IfShowNav && IsAdmin && (
            <button className="playCVButton1" onClick={onAdminClick}>
              Admin
            </button>
          )}
          {IfShowNav && (
            <button className="logout" onClick={onlogout}>
              {/* <span
                style={{ boxShadow: "none" }}
                className="fs-1 bold material-symbols-outlined"
              >
                logout
              </span> */}
              <p>Logout</p>
            </button>
          )}
        </div>
      </div> : ""
  );
}

export default HeaderClient;
