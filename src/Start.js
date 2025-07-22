import React from 'react';

function Start() {
  return (
    <div className="start-wrapper">
      <div className="start-content">
        <p className="slogan">Build the Future, with Tools</p>
        <h1 className="title">
          Welcome to <span className="highlight">Tools</span>
        </h1>

        <div className="button-group">
          <button className="login-button">로그인</button>
          <button className="signup-button">회원가입</button>
        </div>
      </div>

      <p className="developer">Developer : 최도현 박지윤 계민석</p>
    </div>
  );
}

export default Start;
