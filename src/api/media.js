import api from "./base";

export const upload = (formData) =>
  api
    .post("/media", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then((r) => r.data);

export default { upload };
