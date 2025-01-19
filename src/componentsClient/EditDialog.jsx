import React from "react";
import { MdHeight } from "react-icons/md";

const EditDialog = ({ isEditing, setIsEditing, selectedImg }) => {
  return (
    <div className="editDialog container text-center position-absolute border shadow-lg position-fixed bg-body d-flex flex-wrap justify-content-center rounded-5 position-relative align-items-center">
      <h1 className="w-100 text-center">Edit Dialog</h1>
      <h1 className="col-12 pb-5">Question X</h1>
      <h2 className="col-12">Your Answer:</h2>
      <input className="form-control w-50" type="text"></input>
      <h2 className="col-12 pt-5">A Relevent Image:</h2>
      <label className="dialogFileIn" htmlFor="fileIn">
        <img src={selectedImg}></img>
        <i className="bi bi-pencil-square"></i>
      </label>
      <input id="fileIn" type="file"></input>
      <div className="position-absolute end-0 top-0 d-flex gap-3 px-3">
        <button
          onClick={() => {
            setIsEditing(!isEditing);
          }}
          style={{ fontSize: "60px" }}
          className="btn"
        >
          <i className="text-success bi bi-check-circle"></i>
        </button>
        <button
          onClick={() => {
            setIsEditing(!isEditing);
          }}
          style={{ fontSize: "60px" }}
          className="btn"
        >
          <i className="text-danger bi bi-x-circle"></i>
        </button>
      </div>
    </div>
  );
};

export default EditDialog;
