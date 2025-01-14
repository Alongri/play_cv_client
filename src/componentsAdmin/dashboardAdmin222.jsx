import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { API_URL, doApiGet } from "../services/apiService";

function DashboardAdmin222() {

  let [ar, setAr] = useState([]);
  const ThisID = useSelector((state) => state.myDetailsSlice.idMorInfoAdmin);
  const [thisUser, setThisUser] = useState([]);

  useEffect(() => {
    doApi();
  }, []);

  const doApi = async () => {
    let url = API_URL + "/videos/allUserVideos/" + ThisID;
    try {
      let data = await doApiGet(url);
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
              <th>title</th>
              <th>time</th>
            </tr>
          </thead>
          <tbody>
            {ar.map((user, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{user.date_created ? user.date_created.substring(10, length - 1) : ""}</td>
                  <td>{user.fullName}</td>
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
