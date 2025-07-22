import React from "react";
import "../css/pages/notification.css";

const timelineData = [
  {
    date: "2024.06.01(토)",
    desc: "Description",
    tags: ["Seminar"],
  },
  {
    date: "2025.07.16(수)",
    desc: "여기꼬치네에서 개강파티 진행",
    tags: ["Network"],
  },
  {
    date: "2025.09.15(목)",
    desc: "Experts 활동 3차",
    tags: ["Experts"],
  },
];

const notices = [
  { tag: "Note", title: "2학기 모집 진행(25.06.21 ~ 25.06.30)" },
  { tag: "Note", title: "Title" },
  { tag: "Note", title: "Title" },
];

function parseDate(str) {
  // "YYYY.MM.DD(요일)" -> Date
  const match = str.match(/(\d{4})\.(\d{2})\.(\d{2})/);
  if (!match) return null;
  return new Date(match[1], match[2] - 1, match[3]);
}

function getDotType(itemDate, today) {
  if (!itemDate) return "default";
  if (itemDate < today) return "past";
  if (
    itemDate.getFullYear() === today.getFullYear() &&
    itemDate.getMonth() === today.getMonth() &&
    itemDate.getDate() === today.getDate()
  )
    return "today";
  return "future";
}

function Timeline() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return (
    <div className="timeline-grid">
      <div className="timeline-line-vertical" />
      {timelineData.map((item, idx) => {
        const itemDate = parseDate(item.date);
        const dotType = getDotType(itemDate, today);
        return (
          <div className="timeline-row" key={idx}>
            <div className={`timeline-dot dot-${dotType}`} />
            <div className="timeline-content">
              <div className="timeline-date">{item.date}</div>
              <div className="timeline-desc">{item.desc}</div>
              <div className="timeline-tags">
                {item.tags.map((tag) => (
                  <span className="timeline-tag" key={tag}>
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function NoticeList() {
  return (
    <>
      <div className="notice-list">
        {notices.map((notice, idx) => (
          <div className="notice-card" key={idx}>
            <span className="notice-tag">#{notice.tag}</span>
            <span className="notice-content">{notice.title}</span>
          </div>
        ))}
      </div>
    </>
  );
}

export default function NotificationBoard() {
  return (
    <>
      <div className="notice-container">
        <div className="title-container">
          <h2 className="notice-title">공지사항</h2>
        </div>
        <div className="notification-bg">
          <Timeline />
          <NoticeList />
        </div>
      </div>
    </>
  );
}
