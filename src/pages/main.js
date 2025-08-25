// src/pages/main.js
import React from "react";
import { Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import logoTools from "../assets/img/logo-tools.png";
import logoActivity from "../assets/img/logo-activity.png";
import activity2 from "../assets/img/activity2.png";
import activity3 from "../assets/img/activity3.png";

import "../css/pages/main.css";

const MainPage = () => {
  return (
    <div className="main-bg">
      <div className="main-container">
        {/* 중앙 큰 로고 */}
        <img src={logoTools} alt="툴스로고" className="logo-main" />
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

        {/* 활동 사진 Carousel (수동 넘김) */}
        <div className="activity-carousel">
          <Carousel interval={null}>
            <Carousel.Item>
              <img
                className="d-block w-100 activity-photo"
                src={logoActivity}
                alt="활동사진 1"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100 activity-photo"
                src={activity2}
                alt="활동사진 2"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100 activity-photo"
                src={activity3}
                alt="활동사진 3"
              />
            </Carousel.Item>
          </Carousel>
        </div>

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
