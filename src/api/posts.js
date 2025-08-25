import api from "./base";

export const list = (params) =>
  api.get("/posts", { params }).then((r) => r.data);
export const get = (id) => api.get(`/posts/${id}`).then((r) => r.data);
export const create = (payload) =>
  api.post("/posts", payload).then((r) => r.data);
export const update = (id, payload) =>
  api.patch(`/posts/${id}`, payload).then((r) => r.data);
export const softDelete = (id) =>
  api.delete(`/posts/${id}`).then((r) => r.data);
export const restore = (id) =>
  api.post(`/posts/${id}/restore`).then((r) => r.data);

export default { list, get, create, update, softDelete, restore };
