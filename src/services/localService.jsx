export const STOKEN = "start_react_token";

export const saveTokenLocal = (_token) => {
    localStorage.setItem(STOKEN, _token);
  }
  
  export const checkTokenLocal = () => {
    if(localStorage[STOKEN]){
      return localStorage[STOKEN];
    }
    else{
      return false;
    }
  }
  
  export const deleteToken = () => {
    localStorage.removeItem(STOKEN)
  }