import { createSlice } from '@reduxjs/toolkit';
import React from 'react';
import {
    IToast
} from './type';

export const toastSlice = createSlice({
    name: 'toast',
    initialState: {
        severity: 'success',
        summary: '',
        detail: '' as React.ReactNode,
        life: 3000,
    } as IToast,
    reducers: {
        SET_TOAST: (state, action) => {
            state.severity = action.payload.severity;
            state.summary = action.payload.summary;
            state.detail = action.payload.detail;
            state.life = action.payload.life;
        },
        CLEAR_TOAST: (state) => {
            state.severity = 'success';
            state.summary = '';
            state.detail = '' as React.ReactNode;
            state.life = 3000;
        }

    }

});

export const { SET_TOAST, CLEAR_TOAST } = toastSlice.actions;


export default toastSlice.reducer;

