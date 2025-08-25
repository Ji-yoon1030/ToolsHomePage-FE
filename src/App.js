import React from "react";
import { Route, BrowserRouter, Routes, useLocation } from "react-router-dom";


import MainPage from "./pages/main";
import Navbar from "./component/Navbar";
import SignUp from "./pages/signup";
import Login from "./pages/login";
import ProfilePage from "./pages/profile";
import NotificationBoard from "./pages/notification";
import 'bootstrap/dist/css/bootstrap.min.css';

import AdminLayout from "./pages/admin/AdminLayout";
import GuardedRoute from "./pages/admin/_components/GuardedRoute";
import Dashboard from "./pages/admin/Dashboard";
import HomeManager from "./pages/admin/HomeManager";
import MembersList from "./pages/admin/MembersList";
import Approvals from "./pages/admin/Approvals";
import PostsList from "./pages/admin/PostsList";
import PostEditor from "./pages/admin/PostEditor";

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
        <Route path="/login" element={<Login />} />

        {/* 아래는 예시용, 실제 페이지 컴포넌트가 있으면 교체 */}

        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/schedule" element={<NotificationBoard />} />

        <Route path="/admin" element={<GuardedRoute />}>
          <Route element={<AdminLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="home" element={<HomeManager />} />
            <Route path="members" element={<MembersList />} />
            <Route path="members/approvals" element={<Approvals />} />
            <Route path="posts" element={<PostsList />} />
            <Route path="posts/new" element={<PostEditor mode="new" />} />
            <Route path="posts/:id/edit" element={<PostEditor mode="edit" />} />
          </Route>
        </Route>
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