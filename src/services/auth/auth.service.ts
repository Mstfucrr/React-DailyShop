import axios from "axios";
import {
    ILogin , IRegister
} from "./types";

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
    // const { data } = await axios.post('https://api.dailyshop.com/api/Auth/sign-up', { input });
    // return data;

    
    // for testing
    const data = {
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
    return [null, data]
    
}

const googleLogin = async (input: ILogin) => {
    // const { data } = await axios.post('https://api.dailyshop.com/api/Auth/sign-in', { input });
    // return data;
    // for testing
}

export const authService = {
    login,
    register
}