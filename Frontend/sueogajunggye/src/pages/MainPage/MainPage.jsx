import MainHeader from "./MainHeader";
import VideoBtn from "./VideoBtn";
import React from 'react';

function MainPage(props) {
  return (
    <div className="main-box">
      <MainHeader></MainHeader>
      <VideoBtn></VideoBtn>
    </div>
  )
}

export default MainPage;