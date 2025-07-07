import React, { useState } from "react";
import "../css/pages/signup.css";
import { signup } from "../api/auth";

export function SignUp() {
  const [form, setForm] = useState({
    email: "",
    name: "",
    studentId: "",
    password: "",
    checkedPassword: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.checkedPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }
    setLoading(true);
    try {
      await signup({
        studentId: form.studentId,
        name: form.name,
        email: form.email,
        password: form.password,
      });
      alert("회원가입 성공!");
      setForm({
        email: "",
        name: "",
        studentId: "",
        password: "",
        checkedPassword: "",
      });
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="Create Account">
      <header className="account-header">
        <h1 className="account-title">회원가입</h1>
        <p className="account-subtitle">
          회원가입을 위해 아래의 정보를 입력해주세요.
        </p>
      </header>
      <div className="account-container">
        <form
          id="account-input-form"
          className="account-form"
          onSubmit={handleSubmit}
        >
          <div className="email-container">
            <input
              className="email-input"
              type="email"
              name="email"
              placeholder="학교 이메일을 입력하세요"
              value={form.email}
              onChange={handleChange}
              required
            />
            <button className="email-button" type="button" disabled>
              인증하기
            </button>
          </div>
          <input
            type="text"
            name="name"
            placeholder="이름을 입력하세요"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            className="number-input"
            type="text"
            name="studentId"
            placeholder="학번을 입력하세요"
            value={form.studentId}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="비밀번호를 설정하세요(8문자 이상 + 숫자 + 특수문자 포함)"
            value={form.password}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="checkedPassword"
            placeholder="비밀번호를 확인하세요"
            value={form.checkedPassword}
            onChange={handleChange}
            required
          />
          <button className="account-submit" type="submit" disabled={loading}>
            {loading ? "회원가입 중..." : "회원가입 완료"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
