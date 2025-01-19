import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { API_URL, doApiGet } from "../services/apiService";
import { useNavigate } from "react-router-dom";

function AllVideo() {
  // const initialUsers = [
  //   {
  //     id: 1,
  //     tate: "William Justice",
  //     time: "Davis",
  //     level: "hvusa",
  //   },
  //   {
  //     id: 2,
  //     tate: "William Justice",
  //     time: "Davis",
  //     level: "hvusa",
  //   },
  // ];

  let [ar, setAr] = useState([]);
  const ThisID = useSelector((state) => state.myDetailsSlice.idMorInfoAdmin);
  const [thisUser, setThisUser] = useState([]);
   let nav = useNavigate();

  useEffect(() => {
    doApi();
  }, []);

  const doApi = async () => {
    let url = API_URL + "/users/single/" + ThisID;
    try {
      let data = await doApiGet(url);
      setThisUser(data.data);
      doApiAllVideo();
    } catch (error) {
      console.log(error);
    }
  };

  const doApiAllVideo = async () => {
    let url = API_URL + "/videos/allUserVideos/" + ThisID;
    try {
      let data = await doApiGet(url);
      console.log(data.data);
      setAr(data.data);
    } catch (error) {
      console.log(error);
    }
  };


  const toThisVideo = (id) => {
    nav(`/admin/thisvideo/${id}`);
  };


  return (
    <div className="container">
      <div style={{ textAlign: "center", justifyContent: "center" }}>
        <h1>My projects</h1>
        <h4>Name : {thisUser.FirstName}</h4>
      </div>

      <div>
        <table className="table table-striped shadow-lg">
          <thead>
            <tr>
              <th>List</th>
              <th>Creation Date</th>
              <th>Title</th>
              <th>More Info</th>
            </tr>
          </thead>
          <tbody>
            {ar.map((video, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{video.createdAt ? video.createdAt.substring(10, length - 1) : ""}</td>
                  <td>{video.title}</td>
                  <td>
                  <button className="btn btn-sm" onClick={() => toThisVideo(video._id)}>
                  <i className="bi bi-arrow-right-circle-fill"></i>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AllVideo;