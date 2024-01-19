import { makeRequest } from "../base/base";

export const getAbout = async () =>
  await makeRequest<any>(`/Abouts/GetAbout`, "GET");
