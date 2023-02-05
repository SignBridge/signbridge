import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';

import store from './redux/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';

import './index.css';
import App from './App';

import Profile from './pages/Profile';

export let persistor = persistStore(store);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* Provider : store가 리액트 앱 전체를 감싸주는 용도 */}
    <Provider store={store}>
      {/* loading : store를 불러오는 과정 중에 보여줄 컴포넌트 */}
      {/* persistor : 로컬스토리지에 저장할 스토어 */}
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
      {/* <Profile></Profile> */}
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
