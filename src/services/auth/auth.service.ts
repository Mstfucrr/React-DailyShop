import {
    ILogin, IRegister, IUser
} from "./types";
import { makeRequest } from "../base/base";


const login = async (input: ILogin) =>
    await makeRequest<any>("Auths/Login", "POST", input);

const register = async (input: IRegister) =>
    await makeRequest<any>("Auths/Register", "POST", input);


const updateAccount = async (input: IUser, token: string) =>
    await makeRequest<any>("Auths/UpdateAccount", "PUT", input, token);


const logout = async (token: string) =>
    await makeRequest<any>("Auths/Logout", "POST", null, token);


export const authService = {
    login,
    register,
    logout,
    updateAccount
}