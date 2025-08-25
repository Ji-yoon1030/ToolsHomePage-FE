import React from "react";

export default function Pagination({
  page,
  total,
  pageSize = 10,
  onPageChange,
}) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const canPrev = page > 1;
  const canNext = page < totalPages;
  return (
    <div className="admin-pagination" role="navigation" aria-label="Pagination">
      <button
        className="admin-btn"
        onClick={() => onPageChange(1)}
        disabled={!canPrev}
        aria-label="First page"
      >
        «
      </button>
      <button
        className="admin-btn"
        onClick={() => onPageChange(page - 1)}
        disabled={!canPrev}
        aria-label="Previous page"
      >
        ‹
      </button>
      <span className="admin-pagination-label" aria-live="polite">
        Page {page} / {totalPages}
      </span>
      <button
        className="admin-btn"
        onClick={() => onPageChange(page + 1)}
        disabled={!canNext}
        aria-label="Next page"
      >
        ›
      </button>
      <button
        className="admin-btn"
        onClick={() => onPageChange(totalPages)}
        disabled={!canNext}
        aria-label="Last page"
      >
        »
      </button>
    </div>
  );
}
