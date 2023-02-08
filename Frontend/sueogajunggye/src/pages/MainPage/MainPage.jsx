import React from "react";
import Title from "./Title";
import VideoBtn from "./VideoBtn";
import mainBgImg from '../../assets/images/mainBgImg.jpg'

function MainPage(props) {
    return (
        <div className="main-box">
            <Title></Title>
            <div className="main-bg-img">
                <VideoBtn></VideoBtn>
            </div>
        </div>
    )
}

export default MainPage;