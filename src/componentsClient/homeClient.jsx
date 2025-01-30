import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { API_URL, doApiGet } from "../services/apiService";
import {
  addIfShowNav,
  addIsAdmin,
  addName,
  addIdMorInfoAdmin,
} from "../featuers/myDetailsSlice";

const HomeClient = () => {
  const myName = useSelector((state) => state.myDetailsSlice.name);
  const IsAdmin = useSelector((state) => state.myDetailsSlice.isAdmin);
  const navigate = useNavigate();
  const [myInfo, setmyInfo] = useState({});
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(addIfShowNav({ ifShowNav: true }));
    console.log(myName);
    doApiCheckToken()
    doApi();
  }, []);


  const doApiCheckToken = async () => {
    let url = API_URL + "/users/checkToken";
    try {
      let data = await doApiGet(url);
      if (!data) {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      navigate("/");
    }
  };

  const doApi = async () => {
    let url = API_URL + "/users/myInfo";
    try {
      let data = await doApiGet(url);
      setmyInfo(data.data);
      dispatch(addName({ name: data.data.FirstName }));
      dispatch(addIsAdmin({ isAdmin: data.data.role === "admin" }));
      dispatch(addIdMorInfoAdmin({ idMorInfoAdmin: data.data._id }));
      setLoading(false); 
    } catch (error) {
      console.log(error);
      setLoading(false); 
    }
  };

  const spinnerStyle = {
    width: '50px',
    height: '50px',
    border: '5px solid transparent',
    borderTop: '5px solid transparent',
    borderLeft: '5px solid transparent',
    borderRight: '5px solid transparent',
    borderImage: 'conic-gradient(from 0deg, blue, violet) 1',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
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
    <div className="container-fluid d-flex flex-column bg-light" style={{ minHeight: "100vh", padding: "20px" }}>
      <style>{keyframesSpin}</style>
      
      {loading ? (
        <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
          <div style={spinnerStyle}></div>
        </div>
      ) : (
        <>
          <div className="container text-center my-4 py-4 bg-white shadow rounded">
            <h1 className="emphesis mb-2 display-4 fw-bold">
              Welcome <span className="playCVGradient">{myInfo.FirstName}</span>
            </h1>
            <button className="btn btn-success fs-4 fw-bold mt-5 px-5 py-2" onClick={() => navigate("/nameProject")}>
              Create a project
            </button>
          </div>
  
          <div className="container text-center my-4 py-4 bg-white shadow rounded">
            <h3 className="fw-bold">Your Dashboard</h3>
            <p className="text-muted fs-5">
              Discover tools and resources to help you manage your projects efficiently.
            </p>
            <button className="btn btn-outline-primary fw-bold mt-3 px-4 py-2" onClick={() => navigate("/profile")}>
              View Profile
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default HomeClient;
