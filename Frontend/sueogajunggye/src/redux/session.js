// 3. createSlice : createReducer + createAction
// name: 리듀서 이름
// initialState: 데이터 초기값
// reducers: 상태가 변하면 실행되는 로직 부분
import { createSlice } from '@reduxjs/toolkit';

const initialStateValue = {
    openViduSession: "aaa"
    // 요청 시간
    // requestTime: ""
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


// 4. requestTrans 함수 정의
export const { requestTrans } = sessionSlice.actions;

export default sessionSlice.reducer;