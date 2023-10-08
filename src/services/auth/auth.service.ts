import { userEx } from "@/components/account/example.user";
import {
    ILogin, IRegister
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


    // for error testing
    // const res = {
    //     "status": 400,
    //     "message": "Hesap bilgileri getirilemedi",
    //     "data": null,
    // }

    return res

}


const login = async (input: ILogin) => {
    // const { res } = await fetch("https://api.dailyshop.com/api/Auth/sign-in", {
    //     method: "POST",
    //     headers: {
    //         "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(input),
    // }).then((res) => ({ res: res.json() }))


    // for testing
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMTE"

    const res = {
        status: 200,
        message: "Login successfully",
        Authorization: `${token}`,
        data: userEx,
    }


    // for error testing
    // const res = {
    //     "status": 400,
    //     "message": "Login failed",
    //     "data": null
    // }

    return res
}

const register = async (input: IRegister) => {
    // const { res } = await fetch("https://api.dailyshop.com/api/Auth/sign-up", {
    //     method: "POST",
    //     headers: {
    //         "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(input),
    // }).then((res) => ({ res: res.json() }))


    // for testing
    const res = {
        "status": 200,
        "message": "Register successfully",
        "data": userEx
    }

    // for error testing
    // const res = {
    //     "status": 400,
    //     "message": "Register failed",
    //     "data": null
    // }

    return res

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
    register
}