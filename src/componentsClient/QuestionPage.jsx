import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { API_URL, doApiFromData, doApiMethod } from "../services/apiService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const QuestionPage = () => {
  const questions = [
    "Tell me about a success you're particularly proud of. What made it successful?",
    "Describe a time when you received criticism. How did you respond, and what did you learn?",
    "How do you handle pressure or tight deadlines? Give an example.",
    "Describe the kind of team or environment where you thrive. Why does it suit you?",
    "If you could change one thing about how you worked on a past project, what would it be and why?",
    "What is the most important value you bring to a team or workplace?",
  ];
  

  const totalQuestions = questions.length;
  const [qIndex, setQIndex] = useState(0);
  const [ansText, setAnsText] = useState("");
  const [ansImage, setAnsImage] = useState("");
  const [idChild, setIdChild] = useState("");
  const [errorText, setErrorText] = useState(false);
  const [errorImage, setErrorImage] = useState(false);
  const [formError, setFormError] = useState(false);

  const ansTextRef = useRef();
  const fileInputRef = useRef();
  const navigate = useNavigate();
  const IdVideo = useSelector((state) => state.myDetailsSlice.idVideo);

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const handleTextChange = () => {
    setAnsText(ansTextRef.current.value);
    setErrorText(false); // Clear error if user starts typing
  };

  const handleFileChange = async (event) => {
    console.log(event);
    console.log(event.target.files);
    const file = event?.target?.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("image", file);
    try {
      const response = await axios.post(
        `${API_URL}/videos/uploadimage`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
      setAnsImage(response.data.url); // שמור את ה-URL של התמונה שהתקבל מהשרת
      setErrorImage(false); // נקה שגיאות
    } catch (err) {
      console.error("Error uploading image:", err);
      toast.error(err.response?.data?.message || "Failed to upload image");
    }
  };

  const handleNext = async () => {
    if (ansText === "" || ansImage === "") {
      setFormError(true);
      if (ansText === "") setErrorText(true);
      if (ansImage === "") setErrorImage(true);
    } else {
      const data = {
        id_video: IdVideo,
        question: questions[qIndex],
        answer: ansText,
        imageLink: ansImage,
        index: qIndex,
      };

      let newChild = {};
      if (idChild === "") {
        const uploadedImageUrl = ansImage;
        if (uploadedImageUrl) {
          data.imageLink = uploadedImageUrl;
          newChild = await doApiNewChild(data);
        }
      } else {
        const newData = {
          _id: idChild,
          id_video: IdVideo,
          question: questions[qIndex],
          answer: ansText,
          imageLink: ansImage,
          index: qIndex,
        };
        // const uploadedImageUrl = await doApiGetImgLink(ansImage);
        const uploadedImageUrl = ansImage;
        if (uploadedImageUrl) {
          newData.imageLink = uploadedImageUrl;
          newChild = await doApiUpdateChild(newData);
        }
      }

      if (newChild) {
        setAnsText("");
        setAnsImage("");
        setErrorText(false);
        setErrorImage(false);
        setFormError(false);

        if (ansTextRef.current) ansTextRef.current.value = "";
        if (fileInputRef.current) fileInputRef.current.value = "";

        let data = await doApiNextIndex(qIndex + 1);
        if (data._id) {
          setIdChild(data._id);
          setAnsText(data.answer);
          setAnsImage(data.imageLink);
        } else {
          setIdChild("");
          setAnsText("");
          setAnsImage("");
        }

        setQIndex(qIndex + 1);
        if (qIndex >= 5) {
          navigate("/edit");
        }
      }
    }
  };

  const doApiNextIndex = async (_qIndex) => {
    const dataBody = {
      id_video: IdVideo,
      index: _qIndex,
    };
    let url = API_URL + "/videos/nextIndex";
    try {
      let resp = await doApiMethod(url, "PATCH", dataBody);
      if (resp.status === 200) {
        return resp.data;
      }
      return {};
    } catch (err) {
      toast.error(err.message);
      console.log(err.message);
      return err;
    }
  };

  const doApiNewChild = async (_dataBody) => {
    let url = API_URL + "/videos/child";
    try {
      let resp = await doApiMethod(url, "POST", _dataBody);
      if (resp.status === 201) {
        return [resp.data, true];
      }
      return resp;
    } catch (err) {
      toast.error(err.message);
      console.log(err.message);
      return false;
    }
  };

  const doApiUpdateChild = async (_dataBody) => {
    let url = API_URL + "/videos/updatedchild";
    try {
      let resp = await doApiMethod(url, "PATCH", _dataBody);
      if (resp.status === 200) {
        return [resp.data, true];
      }
      return resp;
    } catch (err) {
      toast.error(err.message);
      console.log(err.message);
      return false;
    }
  };

  const handlePrev = async () => {
    if (qIndex > 0) {
      const prevChild = await doApiNextIndex(qIndex - 1);
      if (prevChild._id) {
        setIdChild(prevChild._id);
        setAnsText(prevChild.answer);
        setAnsImage(prevChild.imageLink);
      } else {
        setIdChild("");
        setAnsText("");
        setAnsImage("");
      }
      setQIndex(qIndex - 1);
    }
  };

  return (
    <div
      className="container text-center"
      style={{
        maxWidth: "700px",
        padding: "10px",
        borderRadius: "10px",
      }}
    >
      <h3 className="m-2 m-3">{questions[qIndex]}</h3>
      <h2 className="m-2 ">Your answer:</h2>
      <input
        ref={ansTextRef}
        className={`form-control mb-2 w-70 mx-auto ${
          errorText ? "border border-danger" : ""
        }`}
        type="text"
        value={ansText}
        onChange={handleTextChange}
      />
      {errorText && (
        <p className="text-danger">
          Please provide an answer before proceeding.
        </p>
      )}
      <div>
        <h2 className="m-2">Add a relevant image:</h2>
        <div
          onClick={triggerFileInput}
          className={`upload-box ${errorImage ? "border border-danger" : ""}`}
          style={{
            width: "600px",
            height: "400px",
            border: "3px dashed #aaa" /* Softer border */,
            borderRadius: "12px" /* Rounded corners */,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column" /* Stack content */,
            margin: "auto",
            cursor: "pointer",
            backgroundColor: "#f9f9f9" /* Light background */,
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)" /* Subtle shadow */,
            transition: "all 0.3s ease-in-out",
            backgroundImage: ansImage ? `url(${ansImage})` : "none",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {!ansImage && (
            // <span style={{ fontSize: "24px", color: "#999" }}></span>
            <span
              className="material-symbols-outlined"
              style={{ fontSize: "48px", color: "#000" }}
            >
              add_photo_alternate
            </span>
          )}
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
        {errorImage && (
          <p className="text-danger">Please add an image before proceeding.</p>
        )}
      </div>

      <div className="d-flex justify-content-center w-50 m-auto gap-5 my-3">
        <button className="special-button shadow-none" onClick={handlePrev}>
          Prev
        </button>
        <button className="special-button shadow-none" onClick={handleNext}>
          Next
        </button>
      </div>

      {/* Progress Bar */}
      <div className="mt-4">
        <p style={{ fontWeight: "bold", fontSize: "1.1rem", color: "#333" }}>
          Question {qIndex + 1} of {totalQuestions}
        </p>
        <div
          className="progress"
          style={{
            height: "20px",
            borderRadius: "15px",
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
          }}
        >
          <div
            className="progress-bar progress-bar-striped progress-bar-animated"
            role="progressbar"
            style={{
              width: `${((qIndex + 1) / totalQuestions) * 100}%`,
              background: `linear-gradient(45deg, #8e44ad, #9b59b6)`,
              borderRadius: "15px",
            }}
          >
            <span style={{ color: "#fff", fontWeight: "bold" }}>
              {Math.round(((qIndex + 1) / totalQuestions) * 100)}%
            </span>
          </div>
        </div>
      </div>

      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
      />
    </div>
  );
};

export default QuestionPage;
