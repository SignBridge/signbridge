import React from 'react';
// 1. npm install redux react-redux @reduxjs/toolkit 설치
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user';
// npm install redux-persist 설치 및 아래 라이브러리 import
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import { combineReducers } from 'redux';

import { userSlice } from './user';

const reducers = combineReducers({
    user: userSlice.reducer,
});

const persistConfig = {
    key: 'root',
    storage, // 로컬스토리지 사용
    whitelist: ['user']
};

const persistedReducer = persistReducer(persistConfig, reducers);

// store에서 모든 state 상태값을 저장
// 2. configureStore에서 모든 state를 관리
const store = configureStore({
    // reducer에 상태관리할 state를 저장
    //5. user 리듀서를 스토어에 저장
    // reducer: {
    //     user: userReducer,
    //     reducer: persistedReducer
    // },
    reducer: persistedReducer
});

export default store;