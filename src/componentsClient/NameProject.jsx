import React from "react";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

const NameProject = () => {
    const [title, setTitle] = useState("")
    const navigate = useNavigate();
    const titleIn = useRef();
    const updateTitle = () => {
        setTitle(titleIn.current.value);
    }
    return (
        <div className="container text-center">
            <h1 className="my-5">Name Your New Project</h1>
            <p className="mb-5 h4 col-8 m-auto">
                Please choose a name for your new project. This name will be used as the title for your project and will appear in your user's profile.
            </p>
            <input ref={titleIn} className="form-control mb-5 w-50 mx-auto" type="text"
                onChange={() => {updateTitle()}}></input>
            <div className="d-flex justify-content-between w-50 m-auto">
                <button className="btn fw-bold btn-primary px-4"
                    onClick={() => {useNavigate("/homeClient");}}>
                    Back to Home
                </button>
                <button className="btn fw-bold btn-primary px-4"
                    onClick={() => {
                        if (title !== ""){
                            console.log(title)
                            navigate("/questionPage");
                        } 
                        else titleIn.current.style.border = "1px solid red";
                    }}>
                    Proceed
                </button>
            </div>
        </div>
    );
};

export default NameProject;
