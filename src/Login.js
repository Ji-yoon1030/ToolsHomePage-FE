import React, { useState } from 'react';
import './Login.css';

function Login() {
  const [clicked, setClicked] = useState(false);

  const handleLogin = () => {
    setClicked(true);
    alert("로그인 버튼이 눌렸습니다!");
  };

  return (
    <div className="login-wrapper">
      <h1 className="login-title">로그인</h1>
      <div className="login-box">
        <input
          type="text"
          placeholder="학번을 입력하세요"
          className="login-input"
        />
        <input
          type="password"
          placeholder="비밀번호를 입력하세요"
          className="login-input"
        />
        <button className="login-button" onClick={handleLogin}>
          로그인
        </button>
      </div>
    </div>
  );
}

export default Login;
