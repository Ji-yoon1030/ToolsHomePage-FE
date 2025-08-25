import React from "react";
import { approvals, approve, reject } from "../../api/members";
import { showToast } from "./_components/Toast";

export default function Approvals() {
  const [rows, setRows] = React.useState([]);
  const [busy, setBusy] = React.useState(false);

  const fetchRows = React.useCallback(async () => {
    try {
      const data = await approvals();
      setRows(data.items || data || []);
    } catch (e) {
      // mock
      setRows(
        Array.from({ length: 5 }).map((_, i) => ({
          id: i + 1,
          name: `Applicant ${i + 1}`,
          email: `user${i + 1}@example.com`,
        }))
      );
    }
  }, []);

  React.useEffect(() => {
    fetchRows();
  }, [fetchRows]);

  const doApprove = async (id) => {
    setBusy(true);
    try {
      await approve(id);
      showToast("Approved", "success");
      fetchRows();
    } catch (e) {
      showToast("Approve failed", "error");
    } finally {
      setBusy(false);
    }
  };
  const doReject = async (id) => {
    const reason = prompt("Reject reason?") || "";
    setBusy(true);
    try {
      await reject(id, { reason });
      showToast("Rejected", "success");
      fetchRows();
    } catch (e) {
      showToast("Reject failed", "error");
    } finally {
      setBusy(false);
    }
  };

  const bulkApprove = async () => {
    setBusy(true);
    try {
      for (const r of rows) {
        // naive sequential
        // eslint-disable-next-line no-await-in-loop
        await approve(r.id);
      }
      showToast("Bulk approved", "success");
      fetchRows();
    } catch (e) {
      showToast("Bulk approve failed", "error");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="admin-card">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 8,
        }}
      >
        <div className="admin-title" style={{ fontSize: 16 }}>
          Pending approvals
        </div>
        <button
          className="admin-btn admin-btn-primary"
          onClick={bulkApprove}
          disabled={busy}
        >
          Bulk approve
        </button>
      </div>
      <table className="admin-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.id}>
              <td>{r.name}</td>
              <td>{r.email}</td>
              <td>
                <button
                  className="admin-btn"
                  onClick={() => doApprove(r.id)}
                  disabled={busy}
                  aria-label="Approve"
                >
                  Approve
                </button>
                <button
                  className="admin-btn admin-btn-danger"
                  onClick={() => doReject(r.id)}
                  disabled={busy}
                  aria-label="Reject"
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
