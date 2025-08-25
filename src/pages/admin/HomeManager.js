import React from "react";
import FormField from "./_components/FormField";
import ImageUploader from "./_components/ImageUploader";
import { get as getHome, saveDraft, publish, rollback } from "../../api/home";
import { showToast } from "./_components/Toast";

export default function HomeManager() {
  const [draft, setDraft] = React.useState({
    bannerImage: "",
    title: "",
    subtitle: "",
    ctaText: "",
    ctaLink: "",
  });
  const [versions, setVersions] = React.useState([]);
  const [busy, setBusy] = React.useState(false);
  const [previewMode, setPreviewMode] = React.useState("desktop");

  React.useEffect(() => {
    (async () => {
      try {
        const data = await getHome();
        setDraft(data?.draft || draft);
        setVersions(data?.versions || []);
      } catch (e) {}
    })();
    // eslint-disable-next-line
  }, []);

  const handleSave = async () => {
    setBusy(true);
    try {
      await saveDraft(draft);
      showToast("Draft saved", "success");
    } catch (e) {
      showToast("Failed to save", "error");
    } finally {
      setBusy(false);
    }
  };

  const handlePublish = async () => {
    setBusy(true);
    try {
      await publish();
      showToast("Published", "success");
    } catch (e) {
      showToast("Publish failed", "error");
    } finally {
      setBusy(false);
    }
  };

  const handleRollback = async (p) => {
    setBusy(true);
    try {
      await rollback(p.publishedAt);
      showToast("Rolled back", "success");
    } catch (e) {
      showToast("Rollback failed", "error");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="admin-grid admin-grid-2">
      <div className="admin-card">
        <FormField label="Banner Image">
          <ImageUploader
            value={draft.bannerImage}
            onChange={(url) => setDraft({ ...draft, bannerImage: url })}
          />
        </FormField>
        <FormField label="Title" helper="Max 60 chars">
          <input
            className="admin-input"
            maxLength={60}
            value={draft.title}
            onChange={(e) => setDraft({ ...draft, title: e.target.value })}
          />
        </FormField>
        <FormField label="Subtitle" helper="Max 120 chars">
          <input
            className="admin-input"
            maxLength={120}
            value={draft.subtitle}
            onChange={(e) => setDraft({ ...draft, subtitle: e.target.value })}
          />
        </FormField>
        <FormField label="CTA Text">
          <input
            className="admin-input"
            value={draft.ctaText}
            onChange={(e) => setDraft({ ...draft, ctaText: e.target.value })}
          />
        </FormField>
        <FormField label="CTA Link">
          <input
            className="admin-input"
            value={draft.ctaLink}
            onChange={(e) => setDraft({ ...draft, ctaLink: e.target.value })}
          />
        </FormField>

        <div style={{ display: "flex", gap: 8 }}>
          <button className="admin-btn" onClick={handleSave} disabled={busy}>
            Save Draft
          </button>
          <button
            className="admin-btn admin-btn-primary"
            onClick={handlePublish}
            disabled={busy}
          >
            Publish
          </button>
        </div>
      </div>

      <div className="admin-card">
        <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
          <button
            className={`admin-btn ${
              previewMode === "desktop" ? "admin-btn-primary" : ""
            }`}
            onClick={() => setPreviewMode("desktop")}
          >
            Desktop
          </button>
          <button
            className={`admin-btn ${
              previewMode === "mobile" ? "admin-btn-primary" : ""
            }`}
            onClick={() => setPreviewMode("mobile")}
          >
            Mobile
          </button>
        </div>
        <div style={{ border: "1px solid #eee", padding: 12, borderRadius: 8 }}>
          <div
            style={{
              maxWidth: previewMode === "mobile" ? 360 : 960,
              margin: "0 auto",
            }}
          >
            {draft.bannerImage && (
              <img
                src={draft.bannerImage}
                alt="Banner"
                style={{ width: "100%", borderRadius: 8, marginBottom: 8 }}
              />
            )}
            <h2 style={{ margin: 0 }}>{draft.title}</h2>
            <p>{draft.subtitle}</p>
            {draft.ctaText && (
              <a
                href={draft.ctaLink || "#"}
                className="admin-btn admin-btn-primary"
              >
                {draft.ctaText}
              </a>
            )}
          </div>
        </div>

        <div style={{ marginTop: 16 }}>
          <h3 className="admin-title" style={{ fontSize: 16 }}>
            Version history
          </h3>
          <ul>
            {versions.map((v) => (
              <li
                key={v.publishedAt}
                style={{ display: "flex", gap: 8, alignItems: "center" }}
              >
                <span>
                  {new Intl.DateTimeFormat("ko-KR", {
                    dateStyle: "medium",
                    timeStyle: "short",
                    timeZone: "Asia/Seoul",
                  }).format(new Date(v.publishedAt))}
                </span>
                <button
                  className="admin-btn"
                  onClick={() => handleRollback(v)}
                  disabled={busy}
                >
                  Rollback
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
