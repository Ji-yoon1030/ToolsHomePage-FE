import api from "./base";

export const get = () => api.get("/home").then((r) => r.data);
export const saveDraft = (payload) =>
  api.put("/home/draft", payload).then((r) => r.data);
export const publish = () => api.post("/home/publish").then((r) => r.data);
export const rollback = (publishedAt) =>
  api.post("/home/rollback", { publishedAt }).then((r) => r.data);

export default { get, saveDraft, publish, rollback };
