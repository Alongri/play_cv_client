import axios from "axios";

export const API_URL="http://localhost:3000" 

export const doApiGet = async (_url) => {
  try {
    let data = await axios.get(_url, {
      headers: {
        'x-api-key': localStorage["start_react_token"],
        'content-type': "application/json"
      }
    });
    return data;
  }
  catch(err){
    console.log(err.response.data);
    throw err
  }
}

export const doApiMethod = async (_url,_method,_body) => {
    try {
      let data = await axios({
        method:_method,
        url:_url,
        data: JSON.stringify(_body),
        headers:{
          'x-api-key': localStorage["start_react_token"],
          'content-type': "application/json"
        }
      });
      return data;
    }
    catch(err){
      console.log(err ,err.response);
      throw err
    }
  }

  export const doApiFromData = async (_url, _method, _file) => {
    try {
      // Create a new FormData object
      const formData = new FormData();
  
      // Append the image file to the FormData object
      formData.append("image", _file);
  
      // Send the request
      let data = await axios({
        method: _method,
        url: _url,
        data: formData,  // Use FormData as the data payload
        headers: {
          'x-api-key': localStorage["start_react_token"],
          'Content-Type': "multipart/form-data", // Use multipart/form-data for file upload
        },
      });
  
      return data;
    } catch (err) {
      console.log(err, err.response);
      throw err;
    }
  };
  