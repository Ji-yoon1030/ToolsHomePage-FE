import React from "react";
import DataTable from "./_components/DataTable";
import Pagination from "./_components/Pagination";
import ConfirmDialog from "./_components/ConfirmDialog";
import { list as listMembers, remove as removeMember } from "../../api/members";
import { showToast } from "./_components/Toast";

export default function MembersList() {
  const [rows, setRows] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [total, setTotal] = React.useState(0);
  const [filters, setFilters] = React.useState({
    status: "",
    generation: "",
    part: "",
    q: "",
  });
  const [confirm, setConfirm] = React.useState({ open: false, id: null });

  const columns = [
    {
      key: "avatarUrl",
      label: "Avatar",
      render: (v) =>
        v ? (
          <img
            src={v}
            alt="avatar"
            style={{ width: 28, height: 28, borderRadius: 999 }}
          />
        ) : (
          "-"
        ),
    },
    { key: "name", label: "Name" },
    { key: "nickname", label: "Nickname" },
    { key: "generation", label: "Gen" },
    { key: "part", label: "Part" },
    { key: "role", label: "Role" },
    { key: "status", label: "Status" },
    {
      key: "joinedAt",
      label: "Joined",
      render: (v) =>
        v
          ? new Intl.DateTimeFormat("ko-KR", {
              dateStyle: "medium",
              timeZone: "Asia/Seoul",
            }).format(new Date(v))
          : "-",
    },
  ];

  const fetchData = React.useCallback(async () => {
    const params = { ...filters, page, limit: 10 };
    try {
      const data = await listMembers(params);
      setRows(data.items || data || []);
      setTotal(
        data.total || (data.items ? data.items.length : (data || []).length)
      );
    } catch (e) {
      // fallback mock
      const mock = Array.from({ length: 12 }).map((_, i) => ({
        id: i + 1,
        name: `User ${i + 1}`,
        nickname: `nick${i + 1}`,
        generation: 1 + (i % 4),
        part: ["Web", "AI", "Design"][i % 3],
        role: ["Admin", "Operator", "Member"][i % 3],
        status: ["active", "pending", "suspended"][i % 3],
        joinedAt: Date.now() - i * 86400e3,
      }));
      setRows(mock.slice((page - 1) * 10, (page - 1) * 10 + 10));
      setTotal(mock.length);
    }
  }, [filters, page]);

  React.useEffect(() => {
    fetchData();
  }, [fetchData]);

  const onDelete = async (id) => {
    try {
      await removeMember(id);
      showToast("Member deleted", "success");
      fetchData();
    } catch (e) {
      showToast("Delete failed", "error");
    } finally {
      setConfirm({ open: false, id: null });
    }
  };

  return (
    <div className="admin-card">
      <div className="admin-grid" style={{ gap: 8, marginBottom: 8 }}>
        <input
          className="admin-input"
          placeholder="Search by name or nickname"
          value={filters.q}
          onChange={(e) => {
            setFilters({ ...filters, q: e.target.value });
            setPage(1);
          }}
        />
        <div style={{ display: "flex", gap: 8 }}>
          <select
            className="admin-input"
            value={filters.status}
            onChange={(e) => {
              setFilters({ ...filters, status: e.target.value });
              setPage(1);
            }}
          >
            <option value="">All status</option>
            <option value="active">Active</option>
            <option value="pending">Pending</option>
            <option value="suspended">Suspended</option>
            <option value="left">Left</option>
          </select>
          <select
            className="admin-input"
            value={filters.generation}
            onChange={(e) => {
              setFilters({ ...filters, generation: e.target.value });
              setPage(1);
            }}
          >
            <option value="">All gen</option>
            {[...Array(10)].map((_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
          <select
            className="admin-input"
            value={filters.part}
            onChange={(e) => {
              setFilters({ ...filters, part: e.target.value });
              setPage(1);
            }}
          >
            <option value="">All parts</option>
            <option value="Web">Web</option>
            <option value="AI">AI</option>
            <option value="Design">Design</option>
          </select>
        </div>
      </div>

      <DataTable
        columns={[
          ...columns,
          {
            key: "actions",
            label: "Actions",
            render: (v, row) => (
              <div style={{ display: "flex", gap: 6 }}>
                <button className="admin-btn" aria-label="Edit member">
                  Edit
                </button>
                <button className="admin-btn" aria-label="Deactivate member">
                  Deactivate
                </button>
                <button
                  className="admin-btn admin-btn-danger"
                  aria-label="Delete member"
                  onClick={(e) => {
                    e.stopPropagation();
                    setConfirm({ open: true, id: row.id });
                  }}
                >
                  Delete
                </button>
              </div>
            ),
          },
        ]}
        rows={rows}
      />

      <Pagination page={page} total={total} onPageChange={setPage} />

      <ConfirmDialog
        open={confirm.open}
        title="Delete member"
        description="This action cannot be undone."
        requireText="DELETE"
        onCancel={() => setConfirm({ open: false, id: null })}
        onConfirm={() => onDelete(confirm.id)}
      />
    </div>
  );
}
