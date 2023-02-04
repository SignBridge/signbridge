import React from 'react';
// 1. npm install redux react-redux @reduxjs/toolkit 설치
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user';

// store에서 모든 state 상태값을 저장
// 2. configureStore에서 모든 state를 관리
export default configureStore({
    // reducer에 상태관리할 state를 저장
    reducer:{
        //5. user 리듀서를 스토어에 저장
        user: userReducer
    }
})