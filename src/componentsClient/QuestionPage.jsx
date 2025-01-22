import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { API_URL, doApiMethod } from "../services/apiService";

const QuestionPage = () => {
  const questions = [
    "When did you lead a team?",
    "Describe a challenging project you worked on.",
    "What’s a proud moment in your career?",
    "Tell me about an event you participated in.",
    "Describe a difficult situation you managed.",
    "Have you volunteered?",
    "What’s the most creative project you’ve done?",
    "When did you give a great presentation?",
    "What’s a photo of a challenge you overcame?",
    "Tell me about a team success.",
    "When did you step out of your comfort zone?",
    "Describe a professional achievement.",
  ];

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

  const handleFileChange = (event) => {
    const file = event?.target?.files?.[0];
    if (file) {
      const imagePath = URL.createObjectURL(file);
      setAnsImage(imagePath);
      setErrorImage(false); // Clear error if image is selected
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
        if (qIndex >= 11) {
          navigate("/editPage");
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
    <div className="container text-center">
      <h2 className="m-2 ">Question {qIndex + 1}:</h2>
      <h3 className="m-2">{questions[qIndex]}</h3>
      <div>
        <h2 className="m-2 ">Your answer:</h2>
        <input
          ref={ansTextRef}
          className={`form-control mb-2 w-50 mx-auto ${errorText ? "border border-danger" : ""}`}
          type="text"
          value={ansText}
          onChange={handleTextChange}
        />
        {errorText && (
          <p className="text-danger">Please provide an answer before proceeding.</p>
        )}
      </div>
      <div>
        <h2 className="m-2">Add a relevant image:</h2>
        <div
          onClick={triggerFileInput}
          className={`upload-box ${errorImage ? "border border-danger" : ""}`}
          style={{
            width: "600px",
            height: "400px",
            border: "2px dashed #ccc",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "auto",
            cursor: "pointer",
            backgroundImage: ansImage ? `url(${ansImage})` : "none",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {!ansImage && <span style={{ fontSize: "24px", color: "#999" }}>+</span>}
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
        <button className="btn fw-bold btn-primary px-4" onClick={handlePrev}>
          Prev
        </button>
        <button
          className="btn fw-bold btn-primary px-4"
          onClick={handleNext}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default QuestionPage;
