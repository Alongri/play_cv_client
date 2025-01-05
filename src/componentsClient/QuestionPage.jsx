import React from "react";
import { useState, useEffect, useRef} from "react";
import { useNavigate } from "react-router-dom";

const QuestionPage = () => {

  const questions = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"]
  const [qIndex, setQIndex] = useState(0);
  const [question, setQuestion] = useState(questions[qIndex])
  const [ansText, setAnsText] = useState("")
  const [ansImage, setAnsImage] = useState("")
  const ansTextRef = useRef()
  const ansImageRef = useRef()

  const navigate = useNavigate();
  
  const updateInputStates = () => {
    setAnsText(ansTextRef.current.value)
    setAnsImage(ansImageRef.current.value)
  }

  useEffect(() => {
    setQuestion(questions[qIndex])
    ansTextRef.current.value = "";
    setAnsText("")
    ansImageRef.current.value = "";
    setAnsImage("")
  }, [qIndex])

  return (
    <div className="container text-center">
      <h1 className="my-5">Question {question}</h1>
      <div>
        <input ref={ansTextRef} className="form-control mb-5 w-50 mx-auto" type="text"
          onChange={() => {updateInputStates()}}></input>
        <input ref={ansImageRef} className="form-control mb-5 w-25 mx-auto" type="file"
          onChange={() => {updateInputStates()}}></input>
      </div>
      <div className="d-flex justify-content-center w-50 m-auto gap-5">
        <button className="btn fw-bold btn-primary px-4"
        onClick = {() => {
          setQIndex(qIndex - 1);
          console.log(ansText)
          console.log(ansImage)
          if (qIndex <= 0) {
            navigate("/nameProject");
          }
        }}
        >Prev</button>
        <button className="btn fw-bold btn-primary px-4"
        onClick={() => {
            setQIndex(qIndex + 1);
            console.log(ansText)
            console.log(ansImage)
            if (qIndex >= 11) {
              navigate("/editPage");
            }
        }}>Next</button>
      </div>
    </div>
  )
}

export default QuestionPage