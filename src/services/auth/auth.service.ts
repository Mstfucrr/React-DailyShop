import { ILogin, IRegister } from "./types";
import { makeRequest } from "../base/base";


const login = async (input: ILogin) =>
    await makeRequest<any>("Auths/Login", "POST", input);

const register = async (input: IRegister) =>
    await makeRequest<any>("Auths/Register", "POST", input);


const updateAccount = async (input: any, token: string) =>
    await makeRequest<any>("Profiles/Update", "PUT", input, token);

const updateAddress = async (input: any, token: string) =>
    await makeRequest<any>("Profiles/UpdateAddress", "PUT", input, token);

const logout = async (token: string) =>
    await makeRequest<any>("Auths/Logout", "POST", null, token);

const deleteAccount = async (token: string) =>
    await makeRequest<any>("Profiles/Delete", "DELETE", null, token);


export const authService = {
    login,
    register,
    logout,
    updateAccount,
    deleteAccount,
    updateAddress
}