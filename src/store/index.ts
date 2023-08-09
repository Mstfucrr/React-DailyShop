import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { toastSlice } from './Toast';

export const store = configureStore({
    reducer: {
        toast: toastSlice.reducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

