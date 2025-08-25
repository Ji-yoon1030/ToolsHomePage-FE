import React, { useEffect } from "react";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { me } from "../../../api/auth";

export default function GuardedRoute() {
  const location = useLocation();
  const navigate = useNavigate();
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  useEffect(() => {
    let mounted = true;
    if (token) {
      me().catch(() => {
        if (mounted) {
          localStorage.removeItem("token");
          navigate("/login", { replace: true, state: { from: location } });
        }
      });
    }
    return () => {
      mounted = false;
    };
  }, [token, location, navigate]);

  if (!token) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  return <Outlet />;
}
