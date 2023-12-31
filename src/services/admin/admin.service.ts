// settings.service.ts
import { makeRequest } from "../base/base";
import { ISiteSettings } from "./types";

export const fetchSettings = (token: string) =>
    makeRequest<any>(`Admin/WebSiteSettings`, "GET", null, token);
export const saveSettings = (val: ISiteSettings, token: string) =>
    makeRequest<any>(`Admin/WebSiteSettings`, "PUT", val, token, true);

// admin.service.ts
import * as SettingsService from './settings.service'
import * as CategoryService from './category.service'
import * as ProductService from './products.service'
import * as UserService from './user.service'

export const categoryService = { ...CategoryService };

export const settingsService = { ...SettingsService };
export const productService = { ...ProductService };

export const userService = { ...UserService };
