import React from "react";
import { upload } from "../../../api/media";
import { showToast } from "./Toast";

export default function ImageUploader({
  value,
  onChange,
  label = "Upload Image",
}) {
  const [preview, setPreview] = React.useState(value || "");
  const [busy, setBusy] = React.useState(false);

  const handleFile = async (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    setBusy(true);
    try {
      const form = new FormData();
      form.append("file", file);
      const res = await upload(form);
      setPreview(res.url);
      onChange && onChange(res.url);
      showToast("Image uploaded", "success");
    } catch (e) {
      showToast("Upload failed", "error");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="admin-uploader">
      {preview && (
        <img
          src={preview}
          alt="Uploaded preview"
          className="admin-uploader-preview"
        />
      )}
      <label className="admin-btn">
        {busy ? "Uploading..." : label}
        <input
          type="file"
          accept="image/*"
          onChange={handleFile}
          style={{ display: "none" }}
          aria-label="Upload image"
        />
      </label>
    </div>
  );
}
