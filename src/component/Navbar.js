import React from "react";
import "../css/pages/main.css";
import { ReactComponent as Logo } from "../assets/img/logo.svg";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Logo
          width="100px"
          height="100px"
          onClick={() => {
            navigate("/");
          }}
        />
      </div>
      <ul className="navbar-menu">
        <li
          className="navbar-item"
          onClick={() => {
            navigate("/");
          }}
        >
          홈
        </li>
        <li
          className="navbar-item"
          onClick={() => {
            navigate("/profile");
          }}
        >
          선배소개
        </li>
        <li
          className="navbar-item"
          onClick={() => {
            navigate("/schedule");
          }}
        >
          일정
        </li>
        <li
          className="navbar-item"
          onClick={() => {
            navigate("/login");
          }}
        >
          로그인
        </li>
        <li
          className="navbar-item"
          onClick={() => {
            navigate("/signup");
          }}
        >
          회원가입
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
