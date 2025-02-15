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
    <div className="d-flex min-vh-100" style={{ overflow: "hidden" }}>
      {/* Left Section */}
      <div
        className="d-flex flex-column justify-content-center align-items-center p-5 col-md-6"
        style={{ backgroundColor: "#fff" }}
      >
        <img
          src={logo}
          alt="PlayCV Logo"
          style={{ width: "220px", marginBottom: "2rem" }}
        />

        <button
          onClick={toSignIn}
          className="btn btn-primary mb-3 w-50"
          style={{
            fontSize: "1.2rem",
            padding: "10px 20px",
            borderRadius: "30px",
            fontWeight: "bold",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          Sign In
        </button>
        <button
          onClick={toSignUp}
          className="btn btn-outline-primary w-50 mb-4"
          style={{
            fontSize: "1.2rem",
            padding: "10px 20px",
            borderRadius: "30px",
            fontWeight: "bold",
            borderWidth: "2px",
          }}
        >
          Sign Up
        </button>

        <p style={{ margin: "20px 0", fontWeight: "bold" }}>Or sign in with:</p>

        {/* Social Login Buttons */}
        <div className="d-flex align-items-center gap-2">
          <button
            className="btn btn-outline-secondary"
            style={{
              borderRadius: "50%",
              padding: "10px",
              width: "40px",
              height: "40px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <i
              className="fab fa-facebook-f"
              style={{ color: "#1877f2", fontSize: "1.2rem" }}
            ></i>
          </button>

          <button
            className="btn btn-outline-secondary"
            style={{
              borderRadius: "50%",
              padding: "10px",
              width: "40px",
              height: "40px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <i
              className="fab fa-google"
              style={{ color: "#db4437", fontSize: "1.2rem" }}
            ></i>
          </button>

          <button
            className="btn btn-outline-secondary"
            style={{
              borderRadius: "50%",
              padding: "10px",
              width: "40px",
              height: "40px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <i
              className="fab fa-apple"
              style={{ color: "#000", fontSize: "1.2rem" }}
            ></i>
          </button>
        </div>
      </div>

      {/* Right Section */}
      <div
        className="d-flex justify-content-center align-items-center col-md-6"
        style={{
          background: "linear-gradient(135deg, #6a11cb, #2575fc)",
          color: "#fff",
        }}
      >
        <div
          className="p-4 text-center rounded shadow-lg"
          style={{
            backgroundColor: "#fff",
            color: "#333",
            borderRadius: "15px",
            boxShadow: "0 8px 24px rgba(0, 0, 0, 0.15)",
            maxWidth: "90%",
          }}
        >
          <h3 className="mb-4" style={{ fontWeight: "bold" }}>
            About Us
          </h3>
          <p style={{ fontSize: "1rem", lineHeight: "1.8" }}>
            Discover a new way to showcase your talents with our dynamic video
            CV platform, powered by state-of-the-art artificial intelligence.
            Whether you're a professional climbing the career ladder or taking
            your first steps in the job market, our platform makes it easy to
            highlight your personality, skills, and achievements. We’re here to
            revolutionize the job application process and help you stand out in
            an engaging, innovative way.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
