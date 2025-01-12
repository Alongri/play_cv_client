import React from "react";
import { useState, useEffect } from "react";

const EditPage = () => {
  // States
  const images = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const [currentImages, setCurrentImages] = useState([1, 2, 3, 4]);
  const [numOfImages, setNumOfImages] = useState(4);
  const [start, setStart] = useState(0);

  // Event handlers
  const handleForward = () => {
    let newStart = start + 1;
    if (newStart >= images.length) {
      newStart = 0;
      setStart(0);
    } else {
      setStart(newStart);
    }
    updateImages(newStart);
  };
  const handleBackward = () => {
    let newStart = start - 1;
    if (newStart >= 0) {
      setStart(newStart);
    } else {
      newStart = images.length - 1;
      setStart(images.length - 1);
    }
    updateImages(newStart);
  };
 
  const handleResize = () => {
    // Update numOfImages according to window dimensions here.
  }

  // Update current images when start index changes
  const updateImages = (newStart) => {
    const newCurrentImages = [];
    for (let i = 0; i < numOfImages; i++) {
      if (i + newStart >= images.length) {
        newCurrentImages.push(images[i + newStart - images.length]);
      } else {
        newCurrentImages.push(images[i + newStart]);
      }
    }
    setCurrentImages(newCurrentImages);
    console.log(newCurrentImages);
  };
  
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <div className="d-flex justify-content-center flex-wrap w-100 col-10">
      <h1 className="w-100 text-center">Edit Page</h1>
      <div
        style={{ height: "42vh" }}
        className="col-sm-12 col-md-10 col-lg-9 col-xl-8 col-xxl-6 col-12 bg-primary"
      >
        1
      </div>
      <div
        style={{ height: "42vh" }}
        className="d-flex justify-content-between w-100 bg-dark"
      >
        <button
          className="btn text-white float-start p-lg-4"
          onClick={handleBackward}
        >
          <i style={{ fontSize: "60px" }} className="bi bi-arrow-left"></i>
        </button>
        <div className="text-white d-flex justify-content-around align-items-center w-100">
          {currentImages.map((image, index) => (
            <div
              key={index}
              style={{
                height: "100%",
                width: "100%",
                border: "2px solid blue",
                fontSize: "80px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {image}
            </div>
          ))}
        </div>
        <button className="btn text-white p-lg-4" onClick={handleForward}>
          <i style={{ fontSize: "60px" }} className="bi bi-arrow-right"></i>
        </button>
      </div>
    </div>
  );
};

export default EditPage;
