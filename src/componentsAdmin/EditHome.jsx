import React from "react";
import { useState, useRef } from "react";

const EditHome = ({
  showEdit,
  setShowEdit,
  image,
  setImage,
  text,
  setText,
}) => {
  const [newImage, setNewImage] = useState(image)
  const fileInputRef = useRef();
  const textInputRef = useRef();
  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const handleApply = () => {
    if (fileInputRef.current.src) {
      setImage(newImage);
    }
    if (textInputRef.current.value) {
      setText(textInputRef.current.value);
    }
  };
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      fileInputRef.current.src = URL.createObjectURL(event.target.files[0]);
      setNewImage(fileInputRef.current.src);
    }
  };
  return (
    <div className="editHome">
      <div className="editHomeBtns">
        <span
          className="material-symbols-outlined fs-1 fw-bold text-success"
          onClick={() => {
            handleApply();
            setShowEdit(false);
          }}
        >
          check_circle
        </span>
        <span
          className="material-symbols-outlined fs-1 fw-bold text-danger"
          onClick={() => setShowEdit(false)}
        >
          cancel
        </span>
      </div>
      <h1 className="mt-4 mb-5">Edit Home</h1>
      <div className="">
        <h3>New Image</h3>
        <div
          onClick={triggerFileInput}
          className={`upload-box `}
          style={{
            width: "500px",
            height: "300px",
            border: "3px dashed #aaa" /* Softer border */,
            borderRadius: "12px" /* Rounded corners */,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column" /* Stack content */,
            margin: "auto",
            cursor: "pointer",
            backgroundColor: "#f9f9f9" /* Light background */,
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)" /* Subtle shadow */,
            transition: "all 0.3s ease-in-out",
            backgroundImage: newImage ? `url(${newImage})` : "none",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {!newImage && (
            // <span style={{ fontSize: "24px", color: "#999" }}></span>
            <span
              className="material-symbols-outlined"
              style={{ fontSize: "48px", color: "#000" }}
            >
              add_photo_alternate
            </span>
          )}
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          src={newImage}
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
        <h3 className="mt-5">New Text</h3>
        <textarea 
            ref={textInputRef} 
            className="text-center w-50 fs-4"
            defaultValue={text}
        >
         </textarea>
      </div>
    </div>
  );
};

export default EditHome;
