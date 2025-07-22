import React, { useState } from "react";
import "../css/pages/signup.css";
import {
  signup,
  verifyEmailCode,
  sendEmailVerificationCode,
} from "../api/auth";

export function SignUp() {
  const [form, setForm] = useState({
    email: "",
    name: "",
    studentId: "",
    password: "",
    checkedPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [showVerification, setShowVerification] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [verificationChecked, setVerificationChecked] = useState(false);
  const [verifying, setVerifying] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleVerificationClick = async () => {
    if (!form.email) {
      alert("이메일을 입력해주세요.");
      return;
    }

    try {
      const result = await sendEmailVerificationCode(form.email);
      if (result.status === 200) {
        setShowVerification(true);
        alert(result.message || "인증번호가 전송되었습니다.");
      } else {
        alert(result.message || "인증 메일 전송에 실패했습니다.");
      }
    } catch (e) {
      alert("이메일 전송 중 오류가 발생했습니다.");
    }
  };

  const handleVerificationConfirm = async () => {
    setVerifying(true);
    try {
      const result = await verifyEmailCode({
        email: form.email,
        code: verificationCode,
      });
      if (result.status === 200) {
        setVerificationChecked(true);
        alert(result.message || "인증이 완료되었습니다");
      } else {
        alert(result.message || "인증에 실패했습니다");
      }
    } catch (e) {
      alert("인증번호 확인 중 오류가 발생했습니다");
    } finally {
      setVerifying(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!verificationChecked) {
      alert("이메일 인증을 완료해주세요.");
      return;
    }
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
      setShowVerification(false);
      setVerificationCode("");
      setVerificationChecked(false);
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
            <button
              className="email-button"
              type="button"
              onClick={handleVerificationClick}
              disabled={showVerification}
            >
              인증하기
            </button>
          </div>
          {showVerification && (
            <div className="verification-container">
              <input
                className="verification-input"
                type="text"
                name="verificationCode"
                placeholder="인증번호를 입력하세요"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                required
                disabled={verificationChecked}
              />
              <button
                className="verification-button"
                type="button"
                onClick={handleVerificationConfirm}
                disabled={verificationChecked || !verificationCode || verifying}
              >
                {verifying ? "확인 중..." : "확인"}
              </button>
            </div>
          )}
          <input
            type="text"
            name="name"
            className="name"
            placeholder="이름을 입력하세요"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="studentId"
            className="studentId"
            placeholder="학번을 입력하세요"
            value={form.studentId}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            className="password"
            placeholder="비밀번호를 설정하세요(8문자 이상 + 숫자 + 특수문자 포함)"
            value={form.password}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="checkedPassword"
            className="checkedPassword"
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
