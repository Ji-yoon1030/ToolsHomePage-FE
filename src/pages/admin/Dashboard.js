import React from "react";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [kpi, setKpi] = React.useState({ approvals: 0, posts: 0, active: 0 });
  const [recent, setRecent] = React.useState([]);

  React.useEffect(() => {
    // Mock KPIs and recent activity initially
    setKpi({ approvals: 3, posts: 12, active: 42 });
    setRecent([
      { id: 1, text: "Approved member Kim", at: new Date() },
      { id: 2, text: "Published post 'Welcome'", at: new Date() },
      { id: 3, text: "Edited home subtitle", at: new Date() },
    ]);
  }, []);

  return (
    <div className="admin-grid admin-grid-3">
      <div className="admin-card">
        <div>Pending approvals</div>
        <div className="admin-title">{kpi.approvals}</div>
      </div>
      <div className="admin-card">
        <div>Published posts</div>
        <div className="admin-title">{kpi.posts}</div>
      </div>
      <div className="admin-card">
        <div>Active members</div>
        <div className="admin-title">{kpi.active}</div>
      </div>

      <div className="admin-card" style={{ gridColumn: "1/-1" }}>
        <div className="admin-grid admin-grid-2">
          <div>
            <h3 className="admin-title" style={{ fontSize: 16 }}>
              Recent activity
            </h3>
            <ul>
              {recent.map((r) => (
                <li key={r.id}>{r.text}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="admin-title" style={{ fontSize: 16 }}>
              Quick actions
            </h3>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <Link
                to="/admin/members/approvals"
                className="admin-btn admin-btn-primary"
              >
                Go to Approvals
              </Link>
              <Link to="/admin/posts/new" className="admin-btn">
                New Post
              </Link>
              <Link to="/admin/home" className="admin-btn">
                Edit Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
