import React from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import "../../css/pages/admin.css";
import ToastContainer from "./_components/Toast";

const SidebarLink = ({ to, label, ariaLabel }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `admin-sidebar-link${isActive ? " admin-sidebar-link-active" : ""}`
    }
    aria-label={ariaLabel || label}
  >
    <span className="admin-sidebar-icon" aria-hidden>
      •
    </span>
    <span>{label}</span>
  </NavLink>
);

export default function AdminLayout() {
  const location = useLocation();
  const titleMap = {
    "/admin/dashboard": "Dashboard",
    "/admin/home": "Home Manager",
    "/admin/members": "Members",
    "/admin/members/approvals": "Approvals",
    "/admin/posts": "Posts",
  };
  const title = titleMap[location.pathname] || "Admin";

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar" aria-label="Admin Sidebar">
        <div className="admin-sidebar-header">
          <img src="/logo192.png" alt="Club logo" className="admin-logo" />
          <div className="admin-brand">Club Admin</div>
        </div>
        <nav className="admin-sidebar-nav">
          <SidebarLink to="/admin/dashboard" label="Dashboard" />
          <SidebarLink to="/admin/home" label="Home" />
          <SidebarLink to="/admin/members" label="Members" />
          <SidebarLink to="/admin/members/approvals" label="Approvals" />
          <SidebarLink to="/admin/posts" label="Posts" />
          <SidebarLink to="/admin/posts/new" label="New Post" />
        </nav>
      </aside>

      <div className="admin-main">
        <header className="admin-topbar">
          <h1 className="admin-title" aria-live="polite">
            {title}
          </h1>
          <div className="admin-topbar-spacer" />
        </header>
        <main className="admin-content">
          <Outlet />
        </main>
      </div>
      <ToastContainer />
    </div>
  );
}
