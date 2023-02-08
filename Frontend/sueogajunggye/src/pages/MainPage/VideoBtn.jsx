import React from "react";
import './Main.css';
// Hovering 라이브러리 필요
// npm install react-hover-video-player
import HoverVideoPlayer from 'react-hover-video-player';
import { Link } from "react-router-dom";

function VideoBtn(props) {

    return (
        <div className="video-box">
            <div className="video-left-item">
                <Link to="/cam" state={{test:false}}>
                    <video
                        className="video-item" 
                        src="/VideoSrc/v1.webm"
                        loop="true"
                        onMouseOver={e => e.target.play()}
                        onMouseLeave={e => e.target.pause()}
                    ></video>
                </Link>
                <div>통역사매칭서비스</div>
            </div>   
            
            <div className="video-right-item">
                <Link to="/aiTranslate">
                <video
                    className="video-item" 
                    src="/VideoSrc/v2.webm"
                    loop="true"
                    onMouseOver={e => e.target.play()}
                    onMouseLeave={e => e.target.pause()}
                ></video>
                </Link>
                <div>AI통역서비스</div>
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