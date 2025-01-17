import React from "react";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL, doApiMethod } from "../services/apiService";
import { useDispatch } from "react-redux";
import { addIdVideo } from "../featuers/myDetailsSlice";

const NameProject = () => {
    const [title, setTitle] = useState("")
    const navigate = useNavigate();
    const titleIn = useRef();
    const dispatch = useDispatch();

    const updateTitle = () => {
        setTitle(titleIn.current.value);
    }

    const toHome = () => {
        navigate("/homeClient");
    };

    const onProceed = () => {
        if (title !== "") {
            console.log(title);
            const data = {
                title: title
            }
            doApiNewVideo(data)

        }
        else titleIn.current.style.border = "1px solid red";
    };

    const doApiNewVideo = async (_dataBody) => {
        // console.log(_dataBody);
        let url = API_URL + "/videos/video";
        try {
            let resp = await doApiMethod(url, "POST", _dataBody);
            console.log(resp.data);
            console.log(resp.data._id);
            if (resp.status == 201) {
                dispatch(addIdVideo({ idVideo: resp.data._id}));
                navigate("/questionPage");
            }
            // dispatch(addEmail({ email: _dataBody.email }));
            // dispatch(addIfShowNav({ ifShowNav: true }));
            return resp;
        } catch (err) {
            alert(err.message);
            console.log(err.message);
        }
    };

    return (
        <div className="container text-center py-5">
        <h1 className="display-4 fw-bold mb-4">Start a New Project</h1>
        <div className="bg-light p-4 rounded shadow-sm mb-4">
            <h3 className="fw-semibold">Guidelines for Creating Your Project</h3>
            <ul className="text-start list-unstyled mt-3 mx-auto" style={{ maxWidth: "700px", lineHeight: "1.8" }}>
                <li><strong>1.</strong> Every project is unique and represents your vision. Choosing a meaningful name will make it easily identifiable.</li>
                <li><strong>2.</strong> A well-named project simplifies organization and future reference.</li>
                <li><strong>3.</strong> Ensure the name reflects your project's essence and purpose clearly.</li>
            </ul>
        </div>
        <div className="bg-white p-4 rounded shadow-sm">
            <h2 className="mt-4">Please Name Your New Project:</h2>
            <p className="text-muted mt-2" style={{ maxWidth: "700px", margin: "0 auto" }}>
                Enter a descriptive title that resonates with your project's goals and objectives. 
                This title will be prominently displayed in your profile and help in identifying the project.
            </p>
            <label htmlFor="projectName" className="form-label mt-3 fw-semibold">Project Name</label>
            <input 
                ref={titleIn} 
                id="projectName" 
                className="form-control my-3 w-50 mx-auto shadow-sm" 
                type="text" 
                placeholder="Enter your project name"
                onChange={() => { updateTitle(); }} 
            />
        </div>
        <div className="d-flex justify-content-center mt-4">
            <button 
                className="btn fw-bold btn-primary mx-3 px-4 py-2" 
                onClick={toHome}>
                Back to Home
            </button>
            <button 
                className="btn fw-bold btn-primary mx-3 px-4 py-2" 
                onClick={onProceed}>
                Proceed
            </button>
        </div>
    </div>
    );
};

export default NameProject;
