import React from "react";
import Title from "./Title";
import VideoBtn from "./VideoBtn";
import mainBgImg from '../../assets/images/mainBgImg.jpg'

function MainPage(props) {
    return (
        <div>
            <Title></Title>
            <div className="main-bg-img">
                {/* <img className="main-bg-img" src={mainBgImg} /> */}
                <VideoBtn></VideoBtn>
            </div>
        </div>
    )
}

export default MainPage;