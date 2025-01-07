import React from "react";
import { useState, useEffect, useRef } from "react";
import { json, useNavigate } from "react-router-dom";
import { API_URL, doApiMethod } from "../services/apiService";

const QuestionPage = () => {
  const questions = [
    "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
    "ccccccccccccccccccccccccccccccccccccccccccccc",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
  ];

  const [qIndex, setQIndex] = useState(0);
  // const [question, setQuestion] = useState(questions[qIndex]);
  const [ansText, setAnsText] = useState("");
  const [child, setChild] = useState({});
  const [ansImage, setAnsImage] = useState("");
  const ansTextRef = useRef();
  const ansImageRef = useRef();
  const navigate = useNavigate();

  const handleTextChange = () => {
    setAnsText(ansTextRef.current.value);
  };
  const handleImageChange = () => {
    setAnsImage(ansImageRef.current.value);
  };

  useEffect(() => { }, []);

  const handleNext = async () => {
    // doApiImage(data);
    const data = {
      id_video: "",
      question: questions[qIndex],
      answer: ansText,
      image: ansImage,
    };
    console.log(data);
    const newChild = await doApiNewChild(data);
    console.log(newChild);
    if (newChild) {
      setQIndex(qIndex + 1);
      ansTextRef.current.value = "";
      setAnsText("");
      ansImageRef.current.value = "";
      setAnsImage("");
      if (qIndex >= 11) {
        navigate("/editPage");
      }
    }
  };

  const doApiNewChild = async (_dataBody) => {
    // console.log(_dataBody);
    let url = API_URL + "/videos/child";
    try {
      let resp = await doApiMethod(url, "POST", _dataBody);
      console.log(resp.data);
      if (resp.status == 201) {
        return true;
      }
      // dispatch(addEmail({ email: _dataBody.email }));
      // dispatch(addIfShowNav({ ifShowNav: true }));
      return resp;
    } catch (err) {
      alert(err.message);
      console.log(err.message);
      return false;
    }
  };


  const handlePrev = async () => {
    if (qIndex != 0) {
      setQIndex(qIndex - 1);
      const data = {
        id_video: "",
        index: qIndex
      };

      const _child = await doApiGetChild(data)
      console.log(_child);
      if (_child) {
        ansTextRef.current.value = child.answer;
        setAnsText(child.answer);
        ansImageRef.current.value = child.image;
        setAnsImage(child.image);

      }
    }
  };

  const doApiGetChild = async (_dataBody) => {
    // console.log(_dataBody);
    let url = API_URL + "/videos/child";
    try {
      let resp = await doApiMethod(url, "GET", _dataBody);
      console.log(resp.data);
      if (resp.status == 200) {
        setChild(resp.data);
        return true;
      }
      // dispatch(addEmail({ email: _dataBody.email }));
      // dispatch(addIfShowNav({ ifShowNav: true }));
      return resp;
    } catch (err) {
      alert(err.message);
      console.log(err.message);
      return false;
    }
  };


  return (
    <div className="container text-center">
      <h2 className="m-2 ">Question {qIndex + 1}:</h2>
      <h3 className="m-2">{questions[qIndex]}</h3>
      <div>
        <h2 className="m-2 ">your answer:</h2>
        <input
          ref={ansTextRef}
          className="form-control mb-2 w-50 mx-auto"
          type="text"
          onChange={() => {
            handleTextChange();
          }}
        ></input>
      </div>
      <div>
        <h2 className="m-2 ">Add a relevent image:</h2>
        <input
          ref={ansImageRef}
          className="form-control mb-2 w-25 mx-auto"
          type="file"
          onChange={() => {
            handleImageChange();
          }}
        ></input>
      </div>
      <div className="d-flex justify-content-center w-50 m-auto gap-5">
        <button
          className="btn fw-bold btn-primary px-4"
          onClick={handlePrev}
        >
          Prev
        </button>
        <button className="btn fw-bold btn-primary px-4" onClick={handleNext}>
          Next
        </button>
      </div>
    </div>
  );
};

export default QuestionPage;
