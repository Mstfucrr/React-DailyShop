import { userEx } from "@/components/account/example.user";
import axios from "axios";
import {
    ILogin , IRegister
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
        "status": 200,
        "message": "Hesap bilgileri getirildi",
        'Content-Type': 'application/json',
        "data": userEx,
    }


    // for error testing
    // const res = {
    //     "status": 400,
    //     "message": "Hesap bilgileri getirilemedi",
    //     'Content-Type': 'application/json',
    //     "data": null,
    // }

    return res

}


const login = async (input: ILogin) => {
    // const { data } = await axios.post('https://api.dailyshop.com/api/Auth/sign-in', { input });
    // return data;
    // for testing
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMTE"
    console.log("input", input)
    const data = {
        "status": 200,
        "message": "Login successfully",
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        "data": {
            "id": 1,
            "email": input.email,
            "firstName": "John",
            "lastName": "Doe",
            "role": "admin",
            "token": token
        }
    }
    return [null, data]

    // for error testing
    // const data = {
    //     "status": 400,
    //     "message": "Login failed",
    //     'Content-Type': 'application/json',
    //     "data": null
    // }
    // return [data, null]
}

const register = async (input: IRegister) => {
    // const { res } = await axios.post('https://api.dailyshop.com/api/Auth/sign-up', { input });
    // return data;

    
    // for testing
    const res = {
        "status": 200,
        "message": "Register successfully",
        'Content-Type': 'application/json',
        "data": {
            "id": 1,
            "email": input.email,
            "firstName": "John",
            "lastName": "Doe",
            "role": "admin",
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMTE"
        }

    }
    return [null, res]
    
}

const logout = () => {
    // const { res } = await axios.post('https://api.dailyshop.com/api/Auth/sign-up', { input });
    // return data;


    // for testing
    const res = {
        "status": 200,
        "message": "Logout successfully",
        'Content-Type': 'application/json',
        "data": null
    }
    return [null, res]

}



export const authService = {
    login,
    register
}