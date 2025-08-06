import React, { useState } from "react";
import "../css/pages/login.css";
import { login } from "../api/auth";

function Login() {
  const [studentId, setStudentId] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!studentId || !password) {
      alert("학번과 비밀번호를 모두 입력하세요.");
      return;
    }

    setLoading(true);
    try {
      const result = await login({ studentId, password });
      alert("로그인 성공!");
      //   console.log("서버 응답:", result);
      // TODO: 로그인 성공 후 처리
    } catch (error) {
      // ⬇️ 변수명 일치 + 안전한 메시지 처리
      const msg =
        error instanceof Error
          ? error.message
          : typeof error === "string"
          ? error
          : "알 수 없는 오류가 발생했습니다.";
      alert("로그인 실패: " + msg);
      console.error(error);
    } finally {
      setLoading(false);
    }
    // try {
    //   const result = await login({ studentId, password });
    //   alert("로그인 성공!");
    //   console.log("서버 응답:", result);

    // } catch (error) {
    //   alert("로그인 실패: " + err.message);
    // } finally {
    //   setLoading(false);
    // }
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
