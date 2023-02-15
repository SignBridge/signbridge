import React from "react";
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import LoginPage from "./pages/LoginPage/LoginPage";
import FindIdPage from "./pages/IdPassPage/FindIdPage";
import FindPassPage from './pages/IdPassPage/FindPassPage';
import MainPage from './pages/MainPage/MainPage'
import VideoRoomComponent from './components/VideoRoomComponent'
import AITranslate from './pages/AITranslate/AITranslate';
import Profile from './pages/TransPage/Profile';

function App() {
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
          <Route path="/aiTranslate" element ={<AITranslate/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
