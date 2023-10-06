import { IUser } from "@/services/auth/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IinitialState } from "./types";


const initialState: IinitialState = {
    auth: {} as IUser,
    isAdminAuthorized: false,
    isAuthorized: false
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        SET_AUTH: (state, action: PayloadAction<IUser>) => {
            state.auth = action.payload;
            state.isAuthorized = true;
        },
        SET_LOGOUT: (state) => {
            state.auth = {} as IUser;
            state.isAuthorized = false;
            state.isAdminAuthorized = false;
        },
        SET_ADMIN_AUTH: (state) => {
            state.isAdminAuthorized = true;
        }
    },
})

export const {
    SET_AUTH,
    SET_LOGOUT,
    SET_ADMIN_AUTH,
}  = authSlice.actions;


export default authSlice.reducer;

export const authSelector = (state: { auth: IinitialState }) => state.auth;
