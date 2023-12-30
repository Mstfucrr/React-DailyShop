import { ILogin, IRegister } from "./types";
import { makeRequest } from "../base/base";


const login = async (input: ILogin) =>
    await makeRequest<any>("Auths/Login", "POST", input);

const register = async (input: IRegister) =>
    await makeRequest<any>("Auths/Register", "POST", input);

const forgotPassword = async (email: string) =>
    await makeRequest<any>(`Auths/ForgotPassword?email=${email}`, "POST");

const resetPassword = async (input: any, token: string) =>
    await makeRequest<any>("Auths/ResetPassword", "POST", input, token);

const getAccount = async (token: string) =>
    await makeRequest<any>("Profiles/GetUser", "GET", null, token);

const updateAccount = async (input: any, token: string) =>
    await makeRequest<any>("Profiles/Update", "PUT", input, token, true);

const updateAddress = async (input: any, token: string) =>
    await makeRequest<any>("Profiles/UpdateAddress", "PUT", input, token);

const deleteAddress = async (addressId: number, token: string) =>
    await makeRequest<any>(`Profiles/DeleteAddress?addressId=${addressId}`, "DELETE", null, token);
    
const logout = async (token: string) =>
    await makeRequest<any>("Auths/Logout", "POST", null, token);

const deleteAccount = async (token: string) =>
    await makeRequest<any>("Profiles/Delete", "DELETE", null, token);


export const authService = {
    login,
    register,
    forgotPassword,
    resetPassword,
    logout,
    updateAccount,
    deleteAccount,
    updateAddress,
    deleteAddress,
    getAccount
}