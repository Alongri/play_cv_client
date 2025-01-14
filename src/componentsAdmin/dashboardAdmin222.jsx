import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { API_URL, doApiGet } from "../services/apiService";

function DashboardAdmin222() {
  const initialUsers = [
    {
      id: 1,
      tate: "William Justice",
      time: "Davis",
      level: "hvusa",
    },
    {
      id: 2,
      tate: "William Justice",
      time: "Davis",
      level: "hvusa",
    },
  ];

  let [ar, setAr] = useState(initialUsers);
  const ThisID = useSelector((state) => state.myDetailsSlice.idMorInfoAdmin);
  const [thisUser, setThisUser] = useState([]);

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


  return (
    <div className="container">
      <div style={{ textAlign: "center", justifyContent: "center" }}>
        <h1>user details</h1>
        <h4>Name :{thisUser.FirstName}</h4>
      </div>

      <div>
        <table className="table table-striped shadow-lg">
          <thead>
            <tr>
              <th>List</th>
              <th>date</th>
              <th>Title</th>
              <th>time</th>
            </tr>
          </thead>
          <tbody>
            {ar.map((user, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{user.date_created ? user.date_created.substring(10, length - 1) : ""}</td>
                  <td>{user.level}</td>
                  <td>{user.time}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DashboardAdmin222;
