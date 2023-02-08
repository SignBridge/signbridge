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
import AITranslate from './pages/AITranslate/AITranslate';
import WaitTemporary from './pages/WaitTemporary/WaitTemporary'
import Profile from './pages/Profile'

function App() {
//   const isLogin = false;
  
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/findId" element={<FindIdPage />}></Route>
          <Route path="/findPass" element={<FindPassPage />}></Route>
          <Route path="/cam" exact element ={<VideoRoomComponent/>}></Route>
          <Route path="/temporary" exact element={<WaitTemporary/>}></Route>
          <Route path="/aiTranslate" element ={<AITranslate/>}></Route>
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
