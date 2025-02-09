import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addIfShowNav } from "../featuers/myDetailsSlice";
import logo from "../assets/Playcvlogo-removebg-preview.png";

const Welcome = () => {
  let nav = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(addIfShowNav({ ifShowNav: false }));
  }, []);

  const toSignIn = () => {
    nav("/login");
  };

  const toSignUp = () => {
    nav("/SignUp");
  };

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-around flex-wrap mx-3">
        <div
          className="text-center p-3 col-6"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            className="mx-3"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              style={{ width: "200px" }}
              src={logo}
              alt="logo"
            />
          </div>

          <button
            onClick={toSignIn}
            className="btn btn-outline-primary m-3 w-50"
          >
            Sign In
          </button>
          <button
            onClick={toSignUp}
            className="btn btn-outline-primary m-3 w-50"
          >
            Sign Up
          </button>
        </div>
        <div className="col-6 d-flex justify-content-center align-items-center">
          <img style={{height: "200px"}} src={logo} />
        </div>
        <div className="px-4 d-flex justify-content-center align-items-center col-12">
          <div
            className="bg-white p-4 text-center about-container"
            style={{
              maxWidth: "80%",
              background: "transparent",
              boxShadow: "none",
              border: "none",
              overflow: "hidden",
              position: "relative",
              transition: "transform 0.5s ease",
            }}
          >
            {/* Decorative Shapes */}
            <div
              className="circle-decoration"
              style={{
                position: "absolute",
                top: "-50px",
                right: "-50px",
                width: "120px",
                height: "120px",
                background: "rgba(0, 123, 255, 0.4)",
                zIndex: "0",
              }}
            ></div>
            <div
              className="circle-decoration"
              style={{
                position: "absolute",
                bottom: "-50px",
                left: "-50px",
                width: "150px",
                height: "150px",
                background: "rgba(153, 134, 238, 0.4)",
                zIndex: "0",
              }}
            ></div>

            {/* Content */}
            <div className="mb-5" style={{ position: "relative", zIndex: "1" }}>
              <h3 className="py-2 playCVGradient">About Us</h3>
              <br />
              <br />

              <p
                style={{
                  fontSize: "1.1rem",
                  lineHeight: "1.8",
                  color: "#555",
                  padding: "0 20px",
                }}
              >
                Discover a new way to showcase your talents with our dynamic
                video CV platform, powered by state-of-the-art artificial
                intelligence. Whether you're a professional climbing the career
                ladder or taking your first steps in the job market, our
                platform makes it easy to highlight your personality, skills,
                and achievements. We’re here to revolutionize the job
                application process and help you stand out in an engaging,
                innovative way.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
