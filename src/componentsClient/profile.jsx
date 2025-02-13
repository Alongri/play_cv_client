import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_URL, doApiGet } from "../services/apiService";
import { useNavigate } from "react-router-dom";
import { addIdVideo } from "../featuers/myDetailsSlice";

function Profile() {
  const [projects, setProjects] = useState([]);
  const [userInfo, setUserInfo] = useState({});
  const ThisID = useSelector((state) => state.myDetailsSlice.idMorInfoAdmin);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (ThisID) {
      fetchUserDetails();
    }
  }, [ThisID]);

  const fetchUserDetails = async () => {
    try {
      // Fetch the user's information
      const userUrl = `${API_URL}/users/single/${ThisID}`;
      const userData = await doApiGet(userUrl);
      setUserInfo(userData.data);

      // Fetch the associated projects
      const videosUrl = `${API_URL}/videos/allUserVideosAdmin/${ThisID}`;
      const videosData = await doApiGet(videosUrl);
      setProjects(videosData.data);
    } catch (err) {
      console.error(err);
    }
  };

  const goToVideoDetailsProfile = (id) => {
    console.log("Navigating to video details with ID:", id);
    dispatch(addIdVideo({ idVideo: id }));
    navigate(`/editpage`);
  };

  return (
    <div className="container">
      <div className="text-center">
        <h1 className="mt-5 display-6 fw-bold">
          Welcome to your projects{" "}
          <span className="playCVGradient emphesis">{userInfo.FirstName}</span>
        </h1>
      </div>
      <div className="d-flex m-auto border mt-4 mb-3 search">
          <input
            style={{ border: "none", borderRadius: "12px 0 0 12px" }}
            type="text"
            className="d-flex justify-content-between align-items-center text-center px-3 py-2"
            placeholder="Search Role"
            id=""
          />
          <button
            style={{ border: "none", borderRadius: "0 12px 12px 0" }}
            value="Search"
            className="btn d-flex justify-content-between align-items-center px-4 py-2"
          >
            Search
          </button>
        </div>
      <div>
        <table className="table table-striped shadow-lg">
          <thead>
            <tr>
              <th>List</th>
              <th>Creation Date</th>
              <th>Title</th>
              <th>Recommended</th>
              <th>More Info</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  {project.createdAt
                    ? project.createdAt.substring(0, 10)
                    : "N/A"}
                </td>
                <td>{project.title}</td>
                <td>{project.recommend}</td>
                <td>
                  <button
                    className="btn btn-sm"
                    onClick={() => goToVideoDetailsProfile(project._id)}
                  >
                    <i className="bi bi-arrow-right-circle-fill"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Profile;
