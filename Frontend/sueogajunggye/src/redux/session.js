import { createSlice } from '@reduxjs/toolkit';

const initialStateValue = {

    openViduSession: "",
    identifySession : "",
    exitOther:0
}

export const sessionSlice = createSlice({
    name: "session",
    initialState: {value : initialStateValue},
    reducers: {
        requestTrans: (state, action) => {
            state.value = action.payload
        }
    },
});

export const { requestTrans } = sessionSlice.actions;

export default sessionSlice.reducer;