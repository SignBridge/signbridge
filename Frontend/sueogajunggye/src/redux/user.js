// 3. createSlice : createReducer + createAction
// name: 리듀서 이름
// initialState: 데이터 초기값
// reducers: 상태가 변하면 실행되는 로직 부분
import { createSlice } from '@reduxjs/toolkit';

const initialStateValue = {
    userId: "",
    userPass: "",
    userName: "",
    userEmail: "",
    userIsActive: false
}

export const userSlice = createSlice({
    name: "user",
    initialState: { value: initialStateValue},
    reducers: {
        login: (state, action) => {
            state.value = action.payload
        },
        logout: (state) => {
            state.value = initialStateValue
        }
    },
});

// 4. login 함수 정의
export const { login, logout } = userSlice.actions;

export default userSlice.reducer;