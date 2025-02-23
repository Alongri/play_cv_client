import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { API_URL, doApiGet } from "../services/apiService";
import {
  addIfShowNav,
  addIsAdmin,
  addName,
  addIdMorInfoAdmin,
} from "../featuers/myDetailsSlice";
import homeImg from "../assets/video-player.png";
import EditHome from "../componentsAdmin/EditHome";

const HomeClient = () => {
  const myName = useSelector((state) => state.myDetailsSlice.name);
  const IsAdmin = useSelector((state) => state.myDetailsSlice.isAdmin);
  const navigate = useNavigate();
  const [myInfo, setmyInfo] = useState({});
  let [showEdit, setShowEdit] = useState(false);
  const dispatch = useDispatch();
  const [adminText, setAdminText] = useState(
    "DEAR ADMIN. YOU CAN EDIT THIS SECTION!"
  );
  const [adminImage, setAdminImage] = useState(homeImg);

  useEffect(() => {
    dispatch(addIfShowNav({ ifShowNav: true }));
    // doApiCheckToken();
    doApi();
  }, []);
  // const doApiCheckToken = async () => {
  //   let url = API_URL + "/users/checkToken";
  //   try {
  //     let data = await doApiGet(url);
  //     if (!data) {
  //       navigate("/");
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     navigate("/");
  //   }
  // };

  const doApi = async () => {
    let url = API_URL + "/users/myInfo";
    try {
      let data = await doApiGet(url);
      setmyInfo(data.data);
      dispatch(addName({ name: data.data.FirstName }));
      dispatch(addIsAdmin({ isAdmin: data.data.role === "admin" }));
      dispatch(addIdMorInfoAdmin({ idMorInfoAdmin: data.data._id }));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="container-fluid d-flex pt-5">
      <div className="container text-center w-40 d-flex flex-column justify-content-center align-items-center">
        <div className="card tech-container mb-4">
          <h1 className="emphesis mb-2 display-4 fw-bold">
            Welcome <span className="playCVGradient">{myInfo.FirstName}</span>
          </h1>
          <button
            className="special-button fs-4 fw-bold mt-5 px-5 py-2"
            onClick={() => navigate("/nameProject")}
          >
            Create your story
          </button>
        </div>
        <div className="card tech-container">
          <h3 className="fw-bold">Your Dashboard</h3>
          <p className="text-muted fs-5">
            Discover tools and resources to help you manage your projects
            efficiently. This space is designed to provide quick access to the
            most important features for your success.
          </p>
          <button
            className="playCVButton2 mt-2"
            onClick={() => navigate("/profile")}
          >
            View Profile
          </button>
        </div>
      </div>

      {/* Informative Section */}
      <div
        className="container d-flex justify-content-center flex-column position-relative flex-wrap
      align-items-center w-60"
      >
        {IsAdmin && (
          <span
            className="material-symbols-outlined"
            style={{
              fontSize: "48px",
              color: "#000",
            }}
            onClick={() => setShowEdit(true)}
          >
            add_photo_alternate
          </span>
        )}
        <img src={adminImage}></img>
        <h4>{adminText}</h4>
      </div>
      {showEdit && (
        <EditHome
          showEdit={showEdit}
          setShowEdit={setShowEdit}
          image={adminImage}
          setImage={setAdminImage}
          text={adminText}
          setText={setAdminText}
        />
      )}
    </div>
  );
};

export default HomeClient;
