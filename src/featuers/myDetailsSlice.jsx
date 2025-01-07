import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "test1",
  email: "test1@gmail.com",
  idMorInfoAdmin: "0",
  ifShowNav: false,
  isAdmin: false,
  idVideo: "idVideo",
}

const myDetailsSlice = createSlice({
  name: "myDetails",
  initialState,
  reducers: {
    addName: (start, activation) => {
      start.name = activation.payload.name;
    },
    addEmail: (start, activation) => {
      start.email = activation.payload.email;
    },
    addIdMorInfoAdmin: (start, activation) => {
      start.idMorInfoAdmin = activation.payload.idMorInfoAdmin;
    },
    addIfShowNav: (start, activation) => {
      start.ifShowNav = activation.payload.ifShowNav;
    },
    addIsAdmin: (start, activation) => {
      start.isAdmin = activation.payload.isAdmin;
    },
    addIdVideo: (start, activation) => {
      start.idVideo = activation.payload.idVideo;
    },
  }
})

export const {
  addName,
  addEmail,
  addIdMorInfoAdmin,
  addIfShowNav,
  addIsAdmin,
  addIdVideo,
} = myDetailsSlice.actions
export default myDetailsSlice.reducer