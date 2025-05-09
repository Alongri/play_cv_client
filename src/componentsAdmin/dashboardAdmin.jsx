import React, { useEffect, useState } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { API_URL, doApiGet } from "../services/apiService";
import { reverse } from "lodash";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addIdMorInfoAdmin } from "../featuers/myDetailsSlice";

const DashboardAdmin = () => {
  let nav = useNavigate();
  let [ar, setAr] = useState([]);
  let [ar2, setAr2] = useState([]);
  let [searchText, setSearchText] = useState("");
  let [showEdit, setShowEdit] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    // doApiCheckTokenAdmin();
    doApi();
  }, []);

  // const doApiCheckTokenAdmin = async () => {
  //   let url = API_URL + "/users/checkTokenAdmin";
  //   try {
  //     let data = await doApiGet(url);
  //     if (!data) {
  //       nav("/");
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     nav("/");
  //   }
  // };

  const doApi = async () => {
    let url = API_URL + "/users";
    try {
      let resData = await doApiGet(url);
      let data = resData.data;
      reverse(data);
      console.log(data);
      setAr(data);
      setAr2(data);
    } catch (error) {
      console.log(error);
    }
  };

  const onSearchClick = () => {
    let tempAr = ar2.filter((user) =>
      user.FirstName.toLowerCase().includes(searchText.trim().toLowerCase())
    );

    if (tempAr.length > 0) {
      setAr(tempAr);
      console.log("User found");
    } else {
      console.log("User with this name not found");
      if (searchText.trim() === "") {
        setAr(ar2); // Reset to full list if search box is empty
      } else {
        setAr([]); // Show no results if user is not found
      }
    }
  };

  const handleChange = (event) => {
    setSearchText(event.target.value);
  };

  const toAdmin2 = (id) => {
    console.log("_id");
    console.log(id);
    dispatch(addIdMorInfoAdmin({ idMorInfoAdmin: id }));
    nav("/admin/AllVideoAdmin");
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4 ">
        <div className="d-flex m-auto border search">
          <input
            style={{ border: "none", borderRadius: "12px 0 0 12px" }}
            type="text"
            value={searchText}
            onChange={handleChange}
            className="d-flex justify-content-between align-items-center text-center px-3 py-2"
            placeholder="Search Role"
            id=""
          />
          <button
            style={{ border: "none", borderRadius: "0 12px 12px 0" }}
            onClick={onSearchClick}
            value="Search"
            className="btn d-flex justify-content-between align-items-center px-4 py-2"
          >
            Search
          </button>
        </div>
      </div>

      <table className="table table-striped shadow-lg">
        <thead>
          <tr>
            <th>List</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>E-mail</th>
            <th>Role</th>
            <th>More Info</th>
          </tr>
        </thead>
        <tbody>
          {ar.map((user, index) => {
            return (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>{user.FirstName}</td>
                <td>{user.LastName}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <button
                    className="btn btn-sm"
                    onClick={() => toAdmin2(user._id)}
                  >
                    <i className="bi bi-arrow-right-circle-fill"></i>
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default DashboardAdmin;
