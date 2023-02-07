import React from 'react';
import ReactDOM from 'react-dom';
// import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import store from './redux/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';


// import VideoRoomComponent from './components/VideoRoomComponent';
// import registerServiceWorker from './registerServiceWorker';

export let persistor = persistStore(store);

ReactDOM.render(
    <React.StrictMode>
    {/* Provider : store가 리액트 앱 전체를 감싸주는 용도 */}
    <Provider store={store}>
      {/* loading : store를 불러오는 과정 중에 보여줄 컴포넌트 */}
      {/* persistor : 로컬스토리지에 저장할 스토어 */}
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
  , document.getElementById('root')
);
// registerServiceWorker();


// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     {/* Provider : store가 리액트 앱 전체를 감싸주는 용도 */}
//     <Provider store={store}>
//       {/* loading : store를 불러오는 과정 중에 보여줄 컴포넌트 */}
//       {/* persistor : 로컬스토리지에 저장할 스토어 */}
//       <PersistGate loading={null} persistor={persistor}>
//         <App />
//       </PersistGate>
//     </Provider>
//   </React.StrictMode>
// );
