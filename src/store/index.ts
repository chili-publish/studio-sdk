import { configureStore } from '@reduxjs/toolkit';
import document from './documentReducer';

export const store = configureStore({
    reducer: {
        document,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
