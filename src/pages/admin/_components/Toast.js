import React, { useEffect, useState } from "react";

let listeners = [];
export function showToast(message, type = "info") {
  listeners.forEach((fn) => fn({ id: Date.now(), message, type }));
}

export default function ToastContainer() {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    const listener = (t) => {
      setToasts((prev) => [...prev, t]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((x) => x.id !== t.id));
      }, 3000);
    };
    listeners.push(listener);
    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  }, []);

  return (
    <div className="admin-toast-container" role="status" aria-live="polite">
      {toasts.map((t) => (
        <div key={t.id} className={`admin-toast admin-toast-${t.type}`}>
          {t.message}
        </div>
      ))}
    </div>
  );
}
