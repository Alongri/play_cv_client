import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addEmail, addIfShowNav } from "../featuers/myDetailsSlice";
import { API_URL, doApiMethod } from "../services/apiService";
import { saveTokenLocal } from "../services/localService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const loginClient = () => {
  const [msg, setMsg] = useState(""); // if  remove msg
  const notify = (error) => {
    // pop tosatve error
    toast.error(error);
  };

  const [loading, setLoading] = useState(false);
  let nav = useNavigate();
  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();

  const onSubForm = (data) => {
    doApi(data);
  };

  const doApi = async (_dataBody) => {
    setLoading(true);
    let url = API_URL + "/users/login";
    try {
      let resp = await doApiMethod(url, "POST", _dataBody);
      console.log(resp.data);

      if (resp.data.token) {
        setTimeout(() => {
          saveTokenLocal(resp.data.token);
          dispatch(addEmail({ email: _dataBody.email }));
          dispatch(addIfShowNav({ ifShowNav: true }));
          nav("/homeClient");
          setLoading(false);
        }, 1700);
      }
    } catch (err) {
      console.log(err.response.data.err);
      notify(err.response.data.err);
      setMsg(err.response.data.err);
      setLoading(false);
    }
  };

  const toforgatPass = () => {
    nav("/submit");
  };

  const toSignUp = () => {
    nav("/SignUp");
  };

  const spinnerStyle = {
    width: "50px",
    height: "50px",
    border: "5px solid transparent",
    borderTop: "5px solid transparent",
    borderLeft: "5px solid transparent",
    borderRight: "5px solid transparent",
    borderImage: "conic-gradient(from 0deg, blue, violet) 1",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
    backgroundColor: "transparent", 
    boxSizing: "border-box",
  };

  const keyframesSpin = `
    @keyframes spin {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  `;

  return (
    <div
      className="container mt-5 p-4 d-flex flex-column align-items-center"
    >
      <style>{keyframesSpin}</style>
      {loading ? (
        <div style={spinnerStyle}></div>
      ) : (
        <div className="row justify-content-center w-100" style={{
          maxWidth: "500px",
          backgroundColor: "white",
          borderRadius: "10px",
        }}>
          <h3 className="m-2">Sign in</h3>

          <form
            onSubmit={handleSubmit(onSubForm)}
            className="text-center w-100"
          >
            <div className="m-2 text-start">
              <input
                {...register("email", {
                  required: true,
                  pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                })}
                type="email"
                className="form-control"
                placeholder="Enter email"
              />
              {errors.email && (
                <small className="text-danger">* Email invalid</small>
              )}
            </div>

            <div className="m-2 text-start">
              <input
                {...register("password", { required: true, minLength: 3 })}
                type="password"
                className="form-control"
                placeholder="Password"
              />
              {errors.password && (
                <small className="text-danger">
                  * Enter valid password, min 3 chars
                </small>
              )}
              <p onClick={toforgatPass} className="mt-1 text-danger text-end">
                Forgot password?
              </p>
            </div>
            <div>{msg}</div>
            <div className="m-2">
              <button type="submit" className="btn btn-primary btn-lg w-100">
                Sign In
              </button>
            </div>
          </form>
          <div className="m-2">
            <p onClick={toSignUp} className="text-info">
              Create account
            </p>
          </div>
        </div>
      )}
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
    </div>
  );
};

export default loginClient;
