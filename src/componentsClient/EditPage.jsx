import React from "react";
import { useState, useEffect, useRef} from "react";
import EditDialog from "./EditDialog";

const EditPage = () => {
  // States
  const imagesData = [
    "./assets/Apple.webp", 
    "./assets/Avocado.webp", 
    "./assets/Coconut.jpg", 
    "./assets/Grapes.webp", 
    "./assets/Kiwi.webp", 
    "./assets/Lemon.jpg", 
    "./assets/Mango.webp", 
    "./assets/Melon.jpg", 
    "./assets/Orange.jpg", 
    "./assets/Peach.jpg",  
    "./assets/Pineapple.webp",  
    "./assets/Watermelon.jpg", 
  ];
  const [currentImages, setCurrentImages] = useState([
    "./assets/Apple.webp", 
    "./assets/Avocado.webp", 
    "./assets/Coconut.jpg", 
    "./assets/Grapes.webp"
  ]);
  const [numOfImages, setNumOfImages] = useState(4);
  const [start, setStart] = useState(0);
  const [selectedImg, setSelectedImg] = useState(imagesData[0]);
  const [isEditing, setIsEditing] = useState(false);
  const selectedView = useRef();

  // Event handlers
  const handleForward = () => {
    let newStart = start + 1;
    if (newStart >= imagesData.length) {
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
      newStart = imagesData.length - 1;
      setStart(imagesData.length - 1);
    }
    updateImages(newStart);
  };
  const handleEditButtonClick = () => {
    const editing = !isEditing;
    setIsEditing(!isEditing);
    if (editing) {
      console.log(editing);
    } else {
      console.log(editing);
    }
  }
  const handleResize = () => {
    // Update numOfImages according to window dimensions here.
  }

  // Update current imagesData array when start index changes
  const updateImages = (newStart) => {
    const newCurrentImages = [];
    for (let i = 0; i < numOfImages; i++) {
      if (i + newStart >= imagesData.length) {
        newCurrentImages.push(imagesData[i + newStart - imagesData.length]);
      } else {
        newCurrentImages.push(imagesData[i + newStart]);
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
    <div className="editContainer w-100">
      <h1 className="w-100 text-center">Edit Page</h1>
      <div
        className="col-sm-12 col-md-10 col-lg-9 col-xl-8 col-xxl-6 col-12 bg-primary rounded-4 d-flex justify-content-center align-items-center position-relative"
      >
        <div style={{ textAlign: "center" }} ref={selectedView}>
          <img className="selectedImg mb-4" src={selectedImg}></img>
          <h2>{selectedImg}</h2>
        </div>
        <button onClick={handleEditButtonClick} style={{ fontSize: "60px" }} className="btn position-absolute top-0 end-0"><i className="bi bi-pencil-square"></i></button>
      </div>
      <div
        className="carousel d-flex justify-content-between w-100">
        <button
          className="btn float-start p-lg-4"
          onClick={handleBackward}
        >
          <i className="bi bi-arrow-left"></i>
        </button>
        <div className="text-white d-flex justify-content-around align-items-center w-100 gap-1">
          {currentImages.map((image, index) => (
            <div
              className="carouselItem"
              key={index}
              style={{
                height: "100%",
                width: "25%",
                cursor: "pointer"
              }}
              onClick={() => {
                setSelectedImg(image);
              }}
            >
              <img className="carouselImg" src={image}></img>
            </div>
          ))}
        </div>
        <button className="btn p-lg-4" onClick={handleForward}>
          <i className="bi bi-arrow-right"></i>
        </button>
      </div>
      {isEditing && <EditDialog isEditing = {isEditing} setIsEditing = {setIsEditing} selectedImg = {selectedImg}/>}
    </div>
  );
};

export default EditPage;
