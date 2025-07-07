import React from "react";
import "../css/pages/signup.css";

export function SignUp() {
  return (
    <div className="Create Account">
      <header className="account-header">
        <h1 className="account-title">회원가입</h1>
        <p className="account-subtitle">
          회원가입을 위해 아래의 정보를 입력해주세요.
        </p>
      </header>
      <div className="account-container">
        <form id="account-input-form" className="account-form">
          <div className="email-container">
            <input
              className="email-input"
              type="email"
              name="email"
              placeholder="학교 이메일을 입력하세요"
            />
            <button className="email-button">인증하기</button>
          </div>
          <input type="text" name="name" placeholder="이름을 입력하세요" />
          <input
            className="number-input"
            type="text"
            name="number"
            placeholder="학번을 입력하세요"
          />
          <input
            type="password"
            name="password"
            placeholder="비밀번호를 설정하세요(8문자 이상 + 숫자 + 특수문자 포함)"
          />
          <input
            type="password"
            name="checked-password"
            placeholder="비밀번호를 확인하세요"
          />
          {/* <form className="btn-form"> */}
          <button className="account-submit">회원가입 완료</button>
          {/* </form> */}
        </form>
      </div>
    </div>
  );
}

export default SignUp;
