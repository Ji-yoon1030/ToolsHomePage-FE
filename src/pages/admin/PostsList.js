import React from "react";
import { Link } from "react-router-dom";
import DataTable from "./_components/DataTable";
import { list as listPosts, softDelete, restore } from "../../api/posts";
import { showToast } from "./_components/Toast";

export default function PostsList() {
  const [rows, setRows] = React.useState([]);
  const [filters, setFilters] = React.useState({ status: "", q: "" });

  const columns = [
    {
      key: "coverUrl",
      label: "Thumb",
      render: (v) =>
        v ? (
          <img
            src={v}
            alt="thumb"
            style={{
              width: 48,
              height: 30,
              objectFit: "cover",
              borderRadius: 6,
            }}
          />
        ) : (
          "-"
        ),
    },
    {
      key: "title",
      label: "Title",
      render: (v, r) => <Link to={`/admin/posts/${r.id}/edit`}>{v}</Link>,
    },
    { key: "author", label: "Author" },
    { key: "status", label: "Status" },
    { key: "tags", label: "Tags", render: (v) => (v || []).join(", ") },
    {
      key: "updatedAt",
      label: "Updated",
      render: (v) =>
        v
          ? new Intl.DateTimeFormat("ko-KR", {
              dateStyle: "medium",
              timeStyle: "short",
              timeZone: "Asia/Seoul",
            }).format(new Date(v))
          : "-",
    },
    {
      key: "actions",
      label: "Actions",
      render: (v, r) =>
        r.status === "hidden" ? (
          <button className="admin-btn" onClick={() => onRestore(r.id)}>
            Restore
          </button>
        ) : (
          <button
            className="admin-btn admin-btn-danger"
            onClick={() => onHide(r.id)}
          >
            Hide
          </button>
        ),
    },
  ];

  const fetchRows = React.useCallback(async () => {
    try {
      const data = await listPosts({ ...filters, page: 1, limit: 100 });
      setRows(data.items || data || []);
    } catch (e) {
      setRows(
        Array.from({ length: 8 }).map((_, i) => ({
          id: i + 1,
          title: `Post ${i + 1}`,
          author: "Admin",
          status: i % 4 === 0 ? "hidden" : "published",
          tags: ["club"],
          updatedAt: Date.now() - i * 3600e3,
        }))
      );
    }
  }, [filters]);

  React.useEffect(() => {
    fetchRows();
  }, [fetchRows]);

  const onHide = async (id) => {
    try {
      await softDelete(id);
      showToast("Hidden", "success");
      fetchRows();
    } catch {
      showToast("Hide failed", "error");
    }
  };
  const onRestore = async (id) => {
    try {
      await restore(id);
      showToast("Restored", "success");
      fetchRows();
    } catch {
      showToast("Restore failed", "error");
    }
  };

  return (
    <div className="admin-card">
      <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
        <input
          className="admin-input"
          placeholder="Search posts"
          value={filters.q}
          onChange={(e) => setFilters({ ...filters, q: e.target.value })}
        />
        <select
          className="admin-input"
          value={filters.status}
          onChange={(e) => setFilters({ ...filters, status: e.target.value })}
        >
          <option value="">All</option>
          <option value="draft">Draft</option>
          <option value="scheduled">Scheduled</option>
          <option value="published">Published</option>
          <option value="hidden">Hidden</option>
        </select>
        <Link to="/admin/posts/new" className="admin-btn admin-btn-primary">
          New Post
        </Link>
      </div>
      <DataTable columns={columns} rows={rows} />
    </div>
  );
}
