import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_URL, doApiGet } from "../services/apiService";

function VideoDetailsProfile() {
  const { id } = useParams(); 
  const [loading, setLoading] = useState(true); 
  const [childObjects, setChildObjects] = useState([]); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const childObjectsUrl = `${API_URL}/videos/childobjects/${id}`;
        console.log("Fetching child objects from URL:", childObjectsUrl); 

        let childData = await doApiGet(childObjectsUrl);
        console.log("Child data received:", childData); 

        setChildObjects(childData.data); 

        setLoading(false); 
      } catch (error) {
        console.log("Error fetching child objects:", error); 
        setLoading(false); 
      }
    };

    fetchData(); 

  }, [id]); 

  return (
    <div className="container">
      <div style={{ textAlign: "center", justifyContent: "center" }}>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <h2>Project information</h2>
            <table className="table table-striped shadow-lg">
              <thead>
                <tr>
                  <th>List</th>
                  <th>Question</th>
                  <th>Answer</th>
                  <th>Image Link</th>
                </tr>
              </thead>
              <tbody>
                {childObjects.length === 0 ? (
                  <tr><td colSpan="4">No child objects available.</td></tr>
                ) : (
                  childObjects.map((child, index) => (
                    <tr key={child._id}>
                      <td>{index + 1}</td>
                      <td>{child.question || "N/A"}</td>
                      <td>{child.answer || "N/A"}</td>
                      <td>
                        {child.imageLink ? (
                          <a href={child.imageLink} target="_blank" rel="noopener noreferrer">
                            View Image
                          </a>
                        ) : (
                          "No Image"
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </>
        )}
      </div>
    </div>
  );
}

export default VideoDetailsProfile;
