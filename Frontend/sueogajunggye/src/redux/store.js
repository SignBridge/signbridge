import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import { combineReducers } from 'redux';

import { userSlice } from './user';
import { sessionSlice } from './session';

const reducers = combineReducers({
    user: userSlice.reducer,
    session: sessionSlice.reducer,
});

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['user', 'session']
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
    reducer: persistedReducer
});

export default store;