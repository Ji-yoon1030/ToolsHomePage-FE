// Main.js
import React from "react";
import "../css/pages/main.css";

const MainPage = () => {
  return (
    <div className="main-bg">
      <div className="main-container">
        {/* 로고 (상단 좌측)
      {<img src="/logo-tools.png" alt="로고" className="logo-small" />}

      <nav className="navbar">
        <div className="nav-item">홈</div>
        <div className="nav-item">선배 소개</div>
        <div className="nav-item">일정</div>
        <div className="nav-item">로그인</div>
        <div className="nav-item">회원가입</div>
      </nav> */}

        {/* 중앙 큰 로고 */}
        {<img src="/logo-tools.png" alt="툴스로고" className="logo-main" />}
        <div className="subtitle">Total Object Oriented Language Study</div>

        <div className="activity-box">
          <h2 className="activity-title">이런 활동을 합니다</h2>

          <div className="activity-list">
            <div className="activity-item">
              <span className="check-icon">✔</span>
              <span className="activity-label">Tools Seminar</span>
              <span className="activity-desc">
                다양한 분야의 현직자분들을 모셔서 세미나 진행
              </span>
            </div>
            <div className="activity-item">
              <span className="check-icon">✔</span>
              <span className="activity-label">Tools Growing</span>
              <span className="activity-desc">
                Experts 활동 전, 소규모 스터디 활동
              </span>
            </div>
            <div className="activity-item">
              <span className="check-icon">✔</span>
              <span className="activity-label">Tools Experts</span>
              <span className="activity-desc">
                팀을 꾸려 한 학기 동안 진행하는 프로젝트 활동
              </span>
            </div>
            <div className="activity-item">
              <span className="check-icon">✔</span>
              <span className="activity-label">Tools Mileage</span>
              <span className="activity-desc">
                한 해 동안 열심히 활동한 부원들 수상
              </span>
            </div>
          </div>
        </div>

        {/* 활동 사진 */}
        {<img src="/activity.png" alt="활동사진" className="activity-photo" />}

        {/* 화살표 */}
        <div className="arrow left-arrow">◀</div>
        <div className="arrow right-arrow">▶</div>

        {/* 하단 인포 */}
        <div className="footer">
          About More
          <br />
          서울과학기술대학교 미래관 109호(수)
          <br />
          instagram | @seoultech_tools
        </div>
      </div>
    </div>
  );
};

export default MainPage;
