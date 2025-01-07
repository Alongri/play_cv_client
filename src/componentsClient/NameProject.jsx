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
        <div className="container text-center">
            <h1 className="my-3">Start a new project</h1>
            <h3 className="my-2">Some rules and guidelines...</h3>
            <h3 className="my-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos, nulla.</h3>
            <h3 className="my-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos, nulla.</h3>
            <h3 className="my-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos, nulla.</h3>

            <h2 className="mt-4">Please name your new project:</h2>
            <h6 className="my-2 h4 col-8 m-auto">
                Please choose a name for your new project. This name will be used as the title for your project and will appear in your user's profile.
            </h6>
            <input ref={titleIn} className="form-control my-3 w-50 mx-auto" type="text"
                onChange={() => { updateTitle() }}></input>
            <div className="d-flex justify-content-between w-50 m-auto">
                <button className="btn fw-bold btn-primary px-4"
                    onClick={toHome}>
                    Back to Home
                </button>
                <button className="btn fw-bold btn-primary px-4"
                    onClick={onProceed}>
                    Proceed
                </button>
            </div>
        </div>
    );
};

export default NameProject;
