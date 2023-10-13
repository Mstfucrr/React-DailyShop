import { userEx } from "@/components/account/example.user";
import axios, { AxiosError } from "axios";
import {
    ILogin, IRegister, IUser
} from "./types";



export const GetAccount = async () => {
    // const { res } = await fetch("https://api.dailyshop.com/api/Account", {
    //     method: "GET",
    //     headers: {
    //         "Content-Type": "application/json",
    //         Authorization: `Bearer ${localStorage.getItem("token")}`,
    //     },
    // }).then((res) => ({ res: res.json() }))


    // for testing
    const res = {
        status: 200,
        message: "Hesap bilgileri getirildi",
        data: userEx,
    }
    return res

}



const login = async (input: ILogin) => {
    const { data } = await axios.post("http://localhost:5025/api/Auths/Login", input, {
        headers: {
            "Content-Type": "application/json",
        },
    });
    console.log("Response Data:", data);
    return data;
}

const register = async (input: IRegister) => {
    const { data } = await axios.post("http://localhost:5025/api/Auths/Register", input, {
        headers: {
            "Content-Type": "application/json",
        },
    });
    console.log("Response Data:", data);
    return data;
}

const updateAccount = async (input: IUser, token: string) => {
    const { data } = await axios.put("http://localhost:5025/api/Auths/UpdateAccount", input, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
    console.log("Response Data:", data);
    return data
}



const logout = () => {
    // const { res } = await fetch


    // for testing
    const res = {
        "status": 200,
        "message": "Logout successfully",
        "data": null
    }

    return res

}





export const authService = {
    login,
    register,
    updateAccount
}