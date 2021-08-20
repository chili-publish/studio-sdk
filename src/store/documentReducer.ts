import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Layout {
    id: number;
    name: string;
}
export interface DocumentState {
    layouts: Layout[];
    pages: [];
}

const initialState: DocumentState = {
    layouts: [],
    pages: [],
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

export const { setLayouts } = documentSlice.actions;

export default documentSlice.reducer;
