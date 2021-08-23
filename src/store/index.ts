import { configureStore } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import document from './documentReducer'; // This circular import is safe check the docs https://redux-toolkit.js.org/tutorials/typescript#application-usage

export const store = configureStore({
    reducer: {
        document,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
