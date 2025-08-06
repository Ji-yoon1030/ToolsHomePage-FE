/*
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
*/
// Login.js
import React, { useState } from 'react';
import './Login.css';
import { login } from '../api/auth';

function Login() {
  const [studentId] = useState('');
  const [password] = useState('');
  const [loading] = useState(false);

  const handleLogin = async () => {
    if (!studentId || !password) {
      alert("학번과 비밀번호를 모두 입력하세요.");
      return;
    }

    setLoading(true);
    try {
      const result = await login({ studentId, password });
      alert("로그인 성공!");
      console.log("서버 응답:", result);
      // 이 자리에 로그인 성공 후 작업
    } catch (error) {
      alert("로그인 실패: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      <h1 className="login-title">로그인</h1>
      <div className="login-box">
        <input
          type="text"
          placeholder="학번을 입력하세요"
          className="login-input"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
        />
        <input
          type="password"
          placeholder="비밀번호를 입력하세요"
          className="login-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="login-button"
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? "로그인 중..." : "로그인"}
        </button>
      </div>
    </div>
  );
}

export default Login;
