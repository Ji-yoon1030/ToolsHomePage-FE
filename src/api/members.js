import api from "./base";

export const list = (params) =>
  api.get("/members", { params }).then((r) => r.data);
export const get = (id) => api.get(`/members/${id}`).then((r) => r.data);
export const create = (payload) =>
  api.post("/members", payload).then((r) => r.data);
export const update = (id, payload) =>
  api.patch(`/members/${id}`, payload).then((r) => r.data);
export const remove = (id) => api.delete(`/members/${id}`).then((r) => r.data);
export const approvals = () =>
  api.get("/members/approvals").then((r) => r.data);
export const approve = (id) =>
  api.post(`/members/${id}/approve`).then((r) => r.data);
export const reject = (id, payload) =>
  api.post(`/members/${id}/reject`, payload).then((r) => r.data);

export default {
  list,
  get,
  create,
  update,
  remove,
  approvals,
  approve,
  reject,
};
