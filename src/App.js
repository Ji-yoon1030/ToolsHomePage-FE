import React from "react";
import { Route, BrowserRouter, Routes, useLocation } from "react-router-dom";

import MainPage from "./pages/main";
import Navbar from "./component/Navbar";
import SignUp from "./pages/signup";
import ProfilePage from "./pages/profile";
import NotificationBoard from "./pages/notification";

const navbarPaths = ["/", "/profile", "/schedule"];

function AppRoutes() {
  const location = useLocation();
  const showNavbar = navbarPaths.includes(location.pathname);
  return (
    <>
      {showNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/signup" element={<SignUp />} />
        {/* <Route path="/login" element={<SignUp />} /> */}

        {/* 아래는 예시용, 실제 페이지 컴포넌트가 있으면 교체 */}

        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/schedule" element={<NotificationBoard />} />
      </Routes>
    </>
  );
}

const App = () => {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
};

export default App;
