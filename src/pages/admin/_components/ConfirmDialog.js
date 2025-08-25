import React from "react";

export default function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  onConfirm,
  onCancel,
  requireText,
}) {
  const [text, setText] = React.useState("");
  if (!open) return null;
  const disabled = requireText ? text !== requireText : false;
  return (
    <div
      className="admin-dialog-backdrop"
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div className="admin-dialog">
        <h3 className="admin-dialog-title">{title}</h3>
        {description && <p className="admin-dialog-desc">{description}</p>}
        {requireText && (
          <input
            aria-label="Type to confirm"
            className="admin-input"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={`Type ${requireText}`}
          />
        )}
        <div className="admin-dialog-actions">
          <button className="admin-btn" onClick={onCancel} aria-label="Cancel">
            {cancelLabel}
          </button>
          <button
            className="admin-btn admin-btn-danger"
            onClick={onConfirm}
            disabled={disabled}
            aria-label="Confirm"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
