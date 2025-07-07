import React, { useState } from "react";
import "../css/pages/profile.css";
import { ReactComponent as Icon_tools } from "../assets/img/icon_tools.svg";

const crewData = [
  {
    name: "박지윤 (--기)",
    intro: "여기에 한줄 소개 넣으면 좋을 듯",
    more: "여기에 더 많은 정보를 넣을 수 있습니다. 예: 경력, 관심사 등.",
  },
  {
    name: "박지윤 (--기)",
    intro: "여기에 한줄 소개 넣으면 좋을 듯",
    more: "여기에 더 많은 정보를 넣을 수 있습니다. 예: 경력, 관심사 등.",
  },
  {
    name: "박지윤 (--기)",
    intro: "여기에 한줄 소개 넣으면 좋을 듯",
    more: "여기에 더 많은 정보를 넣을 수 있습니다. 예: 경력, 관심사 등.",
  },
];

function CrewCard({ name, intro, more }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`crew-card${open ? " open" : ""}`}>
      <div className="crew-card-header">
        <span className="crew-icon">
          <Icon_tools width="45px" />
        </span>
        <span className="crew-name">{name}</span>
      </div>
      <div className="crew-intro">{intro}</div>
      {open && <div className="crew-more-content">{more}</div>}
      <div className="crew-more-toggle" onClick={() => setOpen((v) => !v)}>
        ▸ about more
      </div>
    </div>
  );
}

export default function ProfilePage() {
  return (
    <div className="profile-bg">
      <h1 className="crews-title">CREWS</h1>
      <div className="crew-list">
        {crewData.map((crew, idx) => (
          <CrewCard key={idx} {...crew} />
        ))}
      </div>
    </div>
  );
}
