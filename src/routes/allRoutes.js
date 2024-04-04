import React, { useEffect, useState } from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";

// All Important Routes *
import LandingPage from "../../src/Pages/landing_page/LandingPage";

import Login from "../component/auth/Login";
import Register from "../component/auth/Register";
import Otp from "../component/auth/Otp";
import ForgetPassword from "../component/auth/ForgetPassword";
import NewPassword from "../component/auth/NewPassword";
import RequireAuth from "../component/auth/RequiredAuth";
import SideBar from "../component/sidebar/SideBar";
import TermsAndCondition from "../Pages/landing_page/TermsAndCondition";
import Privacy from "../Pages/landing_page/Privacy";
import Modal from '../Common/Modals/Modal';
import Offline from '../Pages/NoInternetStatus/Offline'
const AllRoutes = () => {
  const [isOnline, setIsOnline] = useState(true);
  useEffect(() => {
    const handleOnlineStatus = () => {
      setIsOnline(true);
      window.location.reload();
    }

    const handleOfflineStatus = () => {
      setIsOnline(false);
    }
    window.addEventListener("online", handleOnlineStatus);
    window.addEventListener("offline", handleOfflineStatus);
    return () => {
      window.addEventListener("online", handleOnlineStatus);
      window.addEventListener("offline", handleOfflineStatus);

    }
  }, [isOnline])
  return (
    <>
      {isOnline ?
        <BrowserRouter>
          <Routes className="main min-h-screen w-full">
            <Route path="/">
              <Route index element={<LandingPage />} />
              <Route path="auth">
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path="verify/:username/:flag" element={<Otp />} />
                <Route path="forgot-password" element={<ForgetPassword />} />
                <Route path="new-password/:username" element={<NewPassword />} />
              </Route>
              <Route element={<RequireAuth />}>
                <Route path="/*" element={<SideBar />} />
              </Route>
              <Route
                path="*"
                element={
                  <h1 style={{ color: "red", margin: "50px" }}>
                    404 | PAGE NOT FOUND
                  </h1>
                }
              />
              <Route
                path="termsandconditions"
                element={<TermsAndCondition />}
              />
              <Route
                path="privacypolicy"
                element={<Privacy />}
              />
            </Route>
          </Routes>
        </BrowserRouter>
        :
        <Modal  isOpen={!isOnline}>
          <Offline handleClose={setIsOnline} />
        </Modal>
      }
    </>
  );
};

export default AllRoutes;
