import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import toast from './Toast'
import auth from './auth'
import thunk, { ThunkDispatch } from 'redux-thunk';

export const persistConfig = {
    key: 'root',
    storage,
}

const reducers = combineReducers({
    toast,
    auth,
});

const persistedReducer = persistReducer(persistConfig, reducers);

const middlewares = [thunk]

export const store = configureStore({
    reducer: persistedReducer,
    middleware : middlewares,
});

export type RootState = ReturnType<typeof reducers>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkDispatch<RootState, unknown, any>;
export const useAppDispatch = () => useDispatch<AppDispatch>();

