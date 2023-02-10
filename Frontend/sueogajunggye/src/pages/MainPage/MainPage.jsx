import React from "react";
import MainHeader from "./MainHeader";
import VideoBtn from "./VideoBtn";

function MainPage(props) {
    return (
        <div className="main-box">
            <MainHeader></MainHeader>
            <VideoBtn></VideoBtn>
        </div>
    )
}

export default MainPage;