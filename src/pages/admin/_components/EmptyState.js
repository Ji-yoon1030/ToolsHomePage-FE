import React from "react";

export default function EmptyState({ title = "No data", description, action }) {
  return (
    <div className="admin-empty">
      <div className="admin-empty-title">{title}</div>
      {description && <div className="admin-empty-desc">{description}</div>}
      {action}
    </div>
  );
}
