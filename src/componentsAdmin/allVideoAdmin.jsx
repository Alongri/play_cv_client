import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_URL, doApiGet } from "../services/apiService";
import { useNavigate } from "react-router-dom";
import { addIdVideo } from "../featuers/myDetailsSlice";

function AllVideoAdmin() {
  const [ar, setAr] = useState([]);
  const ThisID = useSelector((state) => state.myDetailsSlice.idMorInfoAdmin);
  const [thisUser, setThisUser] = useState([]);
  const nav = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    doApi();
  }, []);

  const doApi = async () => {
    const url = API_URL + "/users/single/" + ThisID;
    try {
      const data = await doApiGet(url);
      setThisUser(data.data);
      doApiAllVideo();
    } catch (error) {
      console.log(error);
    }
  };

  const doApiAllVideo = async () => {
    const url = API_URL + "/videos/allUserVideosAdmin/" + ThisID;
    try {
      const data = await doApiGet(url);
      console.log(data.data);
      setAr(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const toThisVideo = (_id) => {
    dispatch(addIdVideo({ idVideo: _id }));
    nav(`/admin/thisvideo`);
  };

  const goToAssessment = (videoId) => {
    nav(`/admin/assessment/${videoId}`); // ✅ שולח את video._id
  };

  return (
    <div className="container">
      <div className="d-flex justify-content-center align-items-center py-5 gap-3">
        <h1
          className="fw-bold m-0 quicksand"
          style={{ fontSize: "2.5rem", letterSpacing: "1px" }}
        >
          ✨ Projects Of
        </h1>
        <h4
          className="m-0 px-4 py-2 d-flex align-items-center"
          style={{
            fontSize: "1.5rem",
            fontWeight: "500",
            background: "rgba(255, 255, 255, 0.2)",
            borderRadius: "8px",
            backdropFilter: "blur(5px)",
          }}
        >
          <i className="bi bi-person-fill me-2"></i> {thisUser.FirstName}
        </h4>
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
            {ar.map((video, index) => (
              <tr key={video._id}>
                <td>{index + 1}</td>
                <td>
                  {video.createdAt
                    ? new Date(video.createdAt).toLocaleString()
                    : ""}
                </td>
                <td>{video.title}</td>
                <td>{video.recommend || "-"}</td>
                <td className="d-flex gap-2">
                  <button
                    className="btn btn-outline-primary btn-sm"
                    onClick={() => toThisVideo(video._id)}
                    title="View Video Details"
                  >
                    <i className="bi bi-eye-fill"></i>
                  </button>

                  <button
                    className="btn btn-outline-success btn-sm"
                    onClick={() => goToAssessment(video._id)} // ✅ מתוקן כאן
                    title="View Personality Assessment"
                  >
                    <i className="bi bi-bar-chart-line-fill"></i>
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

export default AllVideoAdmin;
