import './App.css';
 // eslint-disable-next-line
 //.
import React from "react";
// import React, { Component } from "react";
 // eslint-disable-next-line
import { BrowserRouter, Routes, Route} from 'react-router-dom';
// import { BrowserRouter, Routes, Route, Switch } from 'react-router-dom';
import LoginPage from "./pages/LoginPage/LoginPage";
import FindIdPage from "./pages/IdPassPage/FindIdPage";
import FindPassPage from './pages/IdPassPage/FindPassPage';
// import MyPage from './pages/MyPage/MyPage';
import MainPage from './pages/MainPage/MainPage'
import VideoRoomComponent from './components/VideoRoomComponent'

function App() {
//   const isLogin = false;
  
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/findId" element={<FindIdPage />}></Route>
          <Route path="/findPass" element={<FindPassPage />}></Route>
          <Route path="/cam" element ={<VideoRoomComponent/>}></Route>
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
