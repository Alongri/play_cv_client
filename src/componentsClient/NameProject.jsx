import React from "react";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL, doApiMethod } from "../services/apiService";
import { useDispatch } from "react-redux";
import { addIdVideo } from "../featuers/myDetailsSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const NameProject = () => {
  const [title, setTitle] = useState("");
  const navigate = useNavigate();
  const titleIn = useRef();
  const dispatch = useDispatch();

  const updateTitle = () => {
    setTitle(titleIn.current.value);
  };

  const onProceed = () => {
    if (title !== "") {
      console.log(title);
      const data = {
        title: title,
      };
      doApiNewVideo(data);
    } else titleIn.current.style.border = "1px solid red";
  };

  const doApiNewVideo = async (_dataBody) => {
    // console.log(_dataBody);
    let url = API_URL + "/videos/video";
    try {
      let resp = await doApiMethod(url, "POST", _dataBody);
      console.log(resp.data);
      console.log(resp.data._id);
      if (resp.status == 201) {
        dispatch(addIdVideo({ idVideo: resp.data._id }));
        navigate("/questionPage");
      }
      // dispatch(addEmail({ email: _dataBody.email }));
      // dispatch(addIfShowNav({ ifShowNav: true }));
      return resp;
    } catch (err) {
      toast.error(err.message);
      console.log(err.message);
    }
  };

  const [str, setStr] = useState("");
  const [msg, setMsg] = useState("");

  const checkInput = () => {
    if (str.length < 2 || str.length > 20) {
      // setMsg("Title must be between 2 and 20 characters long");
      notify();
    } else {
      onProceed();
      // setMsg("");
    }
  };

  const notify = () => {
    toast.error("Title must be between 2 and 6 characters long");
  };

  return (
    <div className="container text-center py-5">
      <div className="bg-light p-3 rounded shadow-sm col-lg-8 mb-4 mx-auto">
        <h4 className="fw-semibold">Guidelines for Creating Your Story</h4>
        <ul
          className="text-start list-unstyled mt-3 col-sm-10 col-lg-8 mx-auto"
          style={{ maxWidth: "700px", lineHeight: "1.8" }}
        >
          <li>
            <strong>1.</strong> Every Story is unique and represents your
            vision. Choosing a meaningful name will make it easily identifiable.
          </li>
          <li>
            <strong>2.</strong> A well-named Story simplifies organization and
            future reference.
          </li>
          <li>
            <strong>3.</strong> Ensure the name reflects your Story's essence
            and purpose clearly.
          </li>
        </ul>
      </div>
      <div className="bg-white p-2 rounded shadow-sm col-lg-8 mx-auto">
        <h4 className="mt-2">Please Name Your New Story:</h4>
        <p className="text-muted mt-2 col-lg-8 col-sm-10 mx-auto">
          Enter a descriptive title that resonates with your Story's goals and
          objectives. This title will be prominently displayed in your profile
          and help in identifying the Story.
        </p>
        <label htmlFor="projectName" className="form-label mt-3 fw-semibold">
          Story Name
        </label>
        <div className="nameInput d-flex justify-content-center border quicksand">
          <input
            ref={titleIn}
            id="projectName"
            type="text"
            className="fs-5"
            placeholder="Enter your Story name"
            onChange={(e) => {
              updateTitle();
              setStr(e.target.value);

              console.log(str);
            }}
          />
          <button className="fw-bold fs-5 py-2" onClick={checkInput}>
            Proceed
          </button>
        </div>
      </div>

      <ToastContainer
        position="top-center" // or "bottom-center" if preferred
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      {/*           
            <div className="d-flex justify-content-center mt-4">

            </div> */}
    </div>
  );
};

export default NameProject;
