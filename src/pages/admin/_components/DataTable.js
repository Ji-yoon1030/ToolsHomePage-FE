import React from "react";
import EmptyState from "./EmptyState";
import Pagination from "./Pagination";

export default function DataTable({
  columns,
  rows,
  initialSort,
  filterTextPlaceholder = "Search...",
  pageSize = 10,
  onRowClick,
}) {
  const [sort, setSort] = React.useState(
    initialSort || { key: null, dir: "asc" }
  );
  const [q, setQ] = React.useState("");
  const [page, setPage] = React.useState(1);

  const filtered = React.useMemo(() => {
    if (!q) return rows || [];
    const lower = q.toLowerCase();
    return (rows || []).filter((r) =>
      Object.values(r).some((v) =>
        String(v ?? "")
          .toLowerCase()
          .includes(lower)
      )
    );
  }, [rows, q]);

  const sorted = React.useMemo(() => {
    if (!sort.key) return filtered;
    const sortedCopy = [...filtered];
    sortedCopy.sort((a, b) => {
      const av = a[sort.key];
      const bv = b[sort.key];
      if (av === bv) return 0;
      if (av == null) return 1;
      if (bv == null) return -1;
      if (av > bv) return sort.dir === "asc" ? 1 : -1;
      return sort.dir === "asc" ? -1 : 1;
    });
    return sortedCopy;
  }, [filtered, sort]);

  const start = (page - 1) * pageSize;
  const paged = sorted.slice(start, start + pageSize);

  const setSortKey = (key) => {
    setPage(1);
    setSort((prev) => ({
      key,
      dir: prev.key === key && prev.dir === "asc" ? "desc" : "asc",
    }));
  };

  if ((rows || []).length === 0) {
    return (
      <EmptyState title="No results" description="Try adjusting filters" />
    );
  }

  return (
    <div className="admin-table-wrap">
      <div className="admin-table-toolbar">
        <input
          className="admin-input"
          placeholder={filterTextPlaceholder}
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            setPage(1);
          }}
          aria-label="Filter rows"
        />
      </div>
      <table className="admin-table">
        <thead>
          <tr>
            {columns.map((c) => (
              <th
                key={c.key}
                onClick={() => setSortKey(c.key)}
                aria-sort={sort.key === c.key ? sort.dir : "none"}
              >
                {c.label}
                {sort.key === c.key ? (sort.dir === "asc" ? " ▲" : " ▼") : ""}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paged.map((row, idx) => (
            <tr
              key={row.id || idx}
              onClick={() => onRowClick && onRowClick(row)}
              tabIndex={0}
            >
              {columns.map((c) => (
                <td key={c.key}>
                  {c.render ? c.render(row[c.key], row) : row[c.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        page={page}
        total={sorted.length}
        pageSize={pageSize}
        onPageChange={setPage}
      />
    </div>
  );
}
