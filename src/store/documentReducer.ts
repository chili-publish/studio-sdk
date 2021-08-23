import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './index';

type Layout = {
    id: number;
    name: string;
};
type DocumentState = {
    layouts: Layout[];
    pages: [];
    child: string;
};

const initialState: DocumentState = {
    layouts: [],
    pages: [],
    child: 'here is the childjjgjgjgg chhchch',
};
export const documentSlice = createSlice({
    name: 'documents',
    initialState,
    reducers: {
        setLayouts: (state, action: PayloadAction<Layout[]>) => {
            state.layouts = action.payload;
        },
    },
});

// Actions
export const { setLayouts } = documentSlice.actions;

// Selectors
export const selectLayouts = (state: RootState) => state.document.child;

export default documentSlice.reducer;
