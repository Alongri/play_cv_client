import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LayoutAdmin from "./componentsAdmin/layoutAdmin";
import LayoutClient from "./componentsClient/layoutClient";
import LogInClient from "./componentsClient/logInClient";
import SignUpClient from "./componentsClient/signUpClient";
import Page404 from "./componentsClient/Page404";
import Welcome from "./componentsClient/welcome";
import HomeClient from "./componentsClient/homeClient";
import DashboardAdmin from "./componentsAdmin/dashboardAdmin";
import ForgotPass from "./componentsClient/forgotPass";
import Varification from "./componentsClient/varification";
import Submit from "./componentsClient/submit";
import Help from "./componentsClient/help";
import VarificationforgotPass from "./componentsClient/varificationforgotPass";
import LogoutClient from "./componentsClient/logoutClient";
import QuestionPage from "./componentsClient/QuestionPage";
import NameProject from "./componentsClient/NameProject";
import EditPage from "./componentsClient/EditPage";
import ThisVideo from "./componentsAdmin/thisVideo";
import AllVideoAdmin from "./componentsAdmin/allVideoAdmin";
import Profile from "./componentsClient/profile";
import VideoDetailsProfile from "./componentsClient/videoDetailsProfile.jsx";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin" element={<LayoutAdmin />}>
          <Route index element={<DashboardAdmin />} />
          <Route path="/admin/AllVideoAdmin" element={<AllVideoAdmin />} />
          <Route path="/admin/thisvideo" element={<ThisVideo />} />
        </Route>

        <Route path="/" element={<LayoutClient />}>
          <Route index element={<Welcome />} />
          <Route path="/login" element={<LogInClient />} />
          <Route path="/logout" element={<LogoutClient />} />
          <Route path="/signup" element={<SignUpClient />} />
          <Route path="/varification" element={<Varification />} />
          <Route path="/homeClient" element={<HomeClient />} />
          <Route path="/nameProject" element={<NameProject />} />
          <Route path="/questionPage" element={<QuestionPage />} />
          <Route path="/editPage" element={<EditPage />} />
          <Route path="/submit" element={<Submit />} />
          <Route path="/forgotPassClient" element={<ForgotPass />} />
          <Route path="/help" element={<Help />} />
          <Route path="/*" element={<Page404 />} />
          <Route
            path="/VarificationforgotPass"
            element={<VarificationforgotPass />}
          />
          <Route path="/profile" element={<Profile />} />
          <Route path="/video/:id" element={<VideoDetailsProfile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
