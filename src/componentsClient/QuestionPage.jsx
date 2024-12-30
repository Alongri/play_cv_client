import React from "react";
import { useState, useRef} from "react";

const QuestionPage = () => {

  const [ansText, setAnsText] = useState("")
  const [ansImage, setAnsImage] = useState("")
  const ansTextRef = useRef()
  const ansImageRef = useRef()
  
  const updateStates = () => {
    setAnsText(ansTextRef.current.value)
    setAnsImage(ansImageRef.current.value)
  }

  return (
    <div className="container text-center">
      <h1 className="my-5">Question Number 666 {">:-)"}</h1>
      <div>
        <input ref={ansTextRef} className="form-control mb-5 w-50 mx-auto" type="text"
          onChange={() => {updateStates()}}></input>
        <input ref={ansImageRef} className="form-control mb-5 w-25 mx-auto" type="file"
          onChange={() => {updateStates()}}></input>
      </div>
      <div className="d-flex justify-content-between w-50 m-auto">
        <button className="btn fw-bold btn-primary px-4">Prev</button>
        <button className="btn fw-bold btn-primary px-4"
          onClick={() => {
            console.log(ansText) 
            console.log(ansImage)
          }}>Next</button>
      </div>
    </div>
  )
}

export default QuestionPage