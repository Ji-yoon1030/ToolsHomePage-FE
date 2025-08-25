import React from "react";

export default function FormField({ label, htmlFor, error, children, helper }) {
  return (
    <div className="admin-field">
      {label && (
        <label className="admin-label" htmlFor={htmlFor}>
          {label}
        </label>
      )}
      {children}
      {helper && <div className="admin-helper">{helper}</div>}
      {error && (
        <div className="admin-error" role="alert">
          {error}
        </div>
      )}
    </div>
  );
}
