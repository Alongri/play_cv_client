import React from "react";
import { useState, useEffect, useRef } from "react";
import { json, useNavigate } from "react-router-dom";
import { API_URL, doApiMethod } from "../services/apiService";
import { useSelector } from "react-redux";

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
  // const [question, setQuestion] = useState(questions[qIndex]);
  const [ansText, setAnsText] = useState("");
  const [idChild, setIdChild] = useState("");
  const [child, setChild] = useState({});
  const [ansImage, setAnsImage] = useState("");
  const ansTextRef = useRef();
  const ansImageRef = useRef();
  const navigate = useNavigate();
  const IdVideo = useSelector((state) => state.myDetailsSlice.idVideo);


  useEffect(() => {
    console.log(IdVideo);
  }, [IdVideo]);

  const handleTextChange = () => {
    setAnsText(ansTextRef.current.value);
  };
  const handleImageChange = () => {
    setAnsImage(ansImageRef.current.value);
  };



  const handleNext = async () => {
    // doApiImage(data);
    const data = {
      id_video: IdVideo,
      question: questions[qIndex],
      answer: ansText,
      imageLink: ansImage,
      index: qIndex,
    };
    console.log(idChild);
    let newChild = {};
    if (idChild == "") {
      console.log("aa");
      newChild = await doApiNewChild(data);
      console.log(newChild);
    } else {
      console.log("aaww");
      const newData = {
        _id: idChild,
        id_video: IdVideo,
        question: questions[qIndex],
        answer: ansText,
        imageLink: ansImage,
        index: qIndex,
      }
      console.log(newData);
      newChild = await doApiUpdateChild(newData);
      console.log(newChild);

    }
    console.log(newChild);
    if (newChild) {
      ansTextRef.current.value = "";
      setAnsText("");
      ansImageRef.current.value = "";
      setAnsImage("");
      let data = await doApiNextIndex();
      if (data._id) {
        setIdChild(data._id);
        ansTextRef.current.value = data.answer;
        setAnsText(data.answer);
        ansImageRef.current.value = data.imageLink;
        setAnsImage(data.imageLink);
      } else {
        // ansTextRef.current.value = "";
        // setAnsText("");
        // ansImageRef.current.value = "";
        // setAnsImage("");
        setIdChild("");
      }
      setQIndex(qIndex + 1);
      if (qIndex >= 11) {
        navigate("/editPage");
      }
    }
  };

  const doApiNextIndex = async () => {
    const dataBody = {
      id_video: IdVideo,
      index: qIndex + 1,
    }
    console.log(dataBody);
    let url = API_URL + "/videos/nextIndex";
    try {
      let resp = await doApiMethod(url, "PATCH", dataBody);
      console.log(resp.data);
      if (resp.status == 200) {
        return resp.data;
      }
      // dispatch(addEmail({ email: _dataBody.email }));
      console.log(resp);
      return {};
    } catch (err) {
      alert(err.message);
      console.log(err.message);
      return err;
    }
  }


  const doApiNewChild = async (_dataBody) => {
    let url = API_URL + "/videos/child";
    try {
      let resp = await doApiMethod(url, "POST", _dataBody);
      console.log(resp.data);
      if (resp.status == 201) {
        return true;
      }
      // dispatch(addEmail({ email: _dataBody.email }));
      console.log(resp);

      return resp;
    } catch (err) {
      alert(err.message);
      console.log(err.message);
      return false;
    }
  };


  const doApiUpdateChild = async (_dataBody) => {
    // console.log(_dataBody);
    let url = API_URL + "/videos/updatedchild";
    try {
      let resp = await doApiMethod(url, "PATCH", _dataBody);
      console.log(resp.data);
      if (resp.status == 200) {
        return true;
      }
      // dispatch(addEmail({ email: _dataBody.email }));
      console.log(resp);

      return resp;
    } catch (err) {
      alert(err.message);
      console.log(err.message);
      return false;
    }
  };


  const handlePrev = async () => {
    if (qIndex != 0) {
      const data = {
        id_video: IdVideo,
        index: qIndex - 1
      };
      setQIndex(qIndex - 1);
      const _child = await doApiGetChild(data)
      console.log(_child);
      console.log(child);
      // if (_child) {
      //   ansTextRef.current.value = child.answer;
      //   setAnsText(child.answer);
      //   ansImageRef.current.value = child.imageLink;
      //   setAnsImage(child.imageLink);
      //   console.log(child);

      //   setIdChild(child._id);
      // }
    }
  };

  const doApiGetChild = async (_dataBody) => {
    console.log(_dataBody);
    let url = API_URL + "/videos/child";
    try {
      let resp = await doApiMethod(url, "PATCH", _dataBody);
      console.log(resp.data);
      if (resp.status == 200) {
        setChild(resp.data);
        ansTextRef.current.value = resp.data.answer;
        setAnsText(resp.data.answer);
        // ansImageRef.current.value = resp.data.imageLink;
        setAnsImage(resp.data.imageLink);
        console.log(resp.data);
        console.log(resp.data._id);
        setIdChild(resp.data._id);
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
  )
}

export default QuestionPage
