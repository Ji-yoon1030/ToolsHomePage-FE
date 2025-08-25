import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import FormField from "./_components/FormField";
import ImageUploader from "./_components/ImageUploader";
import { get as getPost, create, update } from "../../api/posts";
import { showToast } from "./_components/Toast";

export default function PostEditor({ mode = "new" }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const [post, setPost] = React.useState({
    title: "",
    coverUrl: "",
    tags: [],
    status: "draft",
    scheduledAt: "",
    content: "",
  });
  const [busy, setBusy] = React.useState(false);
  const [history, setHistory] = React.useState([]);

  React.useEffect(() => {
    (async () => {
      if (mode === "edit" && id) {
        try {
          const data = await getPost(id);
          setPost({ ...post, ...data });
        } catch {}
      }
    })();
    // eslint-disable-next-line
  }, [mode, id]);

  React.useEffect(() => {
    const i = setInterval(() => {
      setHistory((h) => [post, ...h].slice(0, 5));
      if (mode === "edit" && id) {
        update(id, { ...post }).catch(() => {});
      }
    }, 10000);
    return () => clearInterval(i);
  }, [post, mode, id]);

  const onSave = async () => {
    setBusy(true);
    try {
      if (mode === "new") {
        const created = await create(post);
        showToast("Draft created", "success");
        navigate(`/admin/posts/${created.id}/edit`);
      } else {
        await update(id, post);
        showToast("Saved", "success");
      }
    } catch (e) {
      showToast("Save failed", "error");
    } finally {
      setBusy(false);
    }
  };

  const tagsString = post.tags.join(", ");

  return (
    <div className="admin-grid admin-grid-2">
      <div className="admin-card">
        <FormField label="Title">
          <input
            className="admin-input"
            value={post.title}
            onChange={(e) => setPost({ ...post, title: e.target.value })}
          />
        </FormField>
        <FormField label="Cover">
          <ImageUploader
            value={post.coverUrl}
            onChange={(url) => setPost({ ...post, coverUrl: url })}
          />
        </FormField>
        <FormField label="Tags">
          <input
            className="admin-input"
            value={tagsString}
            onChange={(e) =>
              setPost({
                ...post,
                tags: e.target.value
                  .split(",")
                  .map((t) => t.trim())
                  .filter(Boolean),
              })
            }
            placeholder="tag1, tag2"
          />
        </FormField>
        <div style={{ display: "flex", gap: 8 }}>
          <select
            className="admin-input"
            value={post.status}
            onChange={(e) => setPost({ ...post, status: e.target.value })}
          >
            <option value="draft">Draft</option>
            <option value="scheduled">Scheduled</option>
            <option value="published">Published</option>
            <option value="hidden">Hidden</option>
          </select>
          {post.status === "scheduled" && (
            <input
              className="admin-input"
              type="datetime-local"
              value={post.scheduledAt}
              onChange={(e) =>
                setPost({ ...post, scheduledAt: e.target.value })
              }
            />
          )}
        </div>
        <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
          <button
            className="admin-btn admin-btn-primary"
            onClick={onSave}
            disabled={busy}
          >
            {mode === "new" ? "Create" : "Save"}
          </button>
        </div>
      </div>
      <div className="admin-card">
        <FormField label="Body">
          <textarea
            className="admin-input"
            rows={16}
            value={post.content}
            onChange={(e) => setPost({ ...post, content: e.target.value })}
          />
        </FormField>
        <div>
          <h3 className="admin-title" style={{ fontSize: 16 }}>
            Versions
          </h3>
          <ul>
            {history.map((h, i) => (
              <li key={i}>
                {new Intl.DateTimeFormat("ko-KR", {
                  timeStyle: "medium",
                  timeZone: "Asia/Seoul",
                }).format(new Date())}{" "}
                - {h.title}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
