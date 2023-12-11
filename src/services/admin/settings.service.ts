import { makeRequest } from "../base/base";
import { ISiteSettings } from "./types";

export const fetchSettings = async (token: string) =>
    await makeRequest<any>(`Admin/WebSiteSettings`, "GET", null, token);

export const saveSettings = async (val: ISiteSettings, token: string) =>
    await makeRequest<any>(`Admin/WebSiteSettings`, "PUT", val, token , true);
