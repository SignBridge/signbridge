import React from "react";
import './Main.css';
// Hovering 라이브러리 필요
// npm install react-hover-video-player
import HoverVideoPlayer from 'react-hover-video-player';
import { Link } from "react-router-dom";
import mainBgImg from '../../assets/images/mainBgImg.jpg'

function VideoBtn(props) {

    return (
        <div className="bg-container">
            <div className="bg"></div>
            <div className="main-items">
                <div className="main-left-items">
                    <div className="main-text-box">
                        <h3>대기시간 없이,</h3>
                        <h3>언제든 자유롭게,</h3>
                        <h3>부담없는 AI 통역 서비스</h3>
                    </div>
                    <div className="main-btns">
                        <div>
                            <Link to="/cam" state={{test:false}}>
                                <button className="main-top-btn">통역사 매칭 서비스</button>
                            </Link>
                        </div>
                        <div>
                            <Link to="/aiTranslate">
                                <button className="main-bottom-btn">AI 통역 서비스</button>
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="main-right-item">
                    <video
                        className="video-item"
                        src="/VideoSrc/v1.webm"
                        loop="true"
                        autoPlay
                        // onMouseOver={e => e.target.play()}
                        // onMouseLeave={e => e.target.pause()}
                    ></video>
                </div>
            </div>

                {/* <HoverVideoPlayer
                    restartOnPaused
                    videoSrc={[
                        { src: '/VideoSrc/v1.webm', type: 'video/webm' },
                        { src: 'video.mp4', type: 'video/mp4' },
                    ]}>
                    </HoverVideoPlayer>
                    <Link to="/cam" state={{test:false}}>
                        <button className='matching-btn' type='submit'>통역사매칭서비스</button>
                    </Link> */}

                {/* <HoverVideoPlayer
                        restartOnPaused
                        videoSrc={[
                            { src: '/VideoSrc/v2.webm', type: 'video/webm' },
                            { src: 'video.mp4', type: 'video/mp4' },
                        ]}>
                    </HoverVideoPlayer>
                    <Link to="/aiTranslate">
                        <button className="matching-btn" type="submit">AI통역서비스</button>
                    </Link> */}

        </div>
    )
}

export default VideoBtn;