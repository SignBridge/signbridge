// import './App.css';
import React, { Component } from "react";
import { BrowserRouter, Routes, Route, Switch } from 'react-router-dom';
import LoginPage from "./pages/LoginPage/LoginPage";
import FindIdPage from "./pages/IdPassPage/FindIdPage";
import FindPassPage from './pages/IdPassPage/FindPassPage';
import MyPage from './pages/MyPage/MyPage';
import MainPage from './pages/MainPage/MainPage'

function App() {
  const isLogin = false;
  
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/findId" element={<FindIdPage />}></Route>
          <Route path="/findPass" element={<FindPassPage />}></Route>
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
