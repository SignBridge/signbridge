import React from "react";
import './Main.css';

// Hovering 라이브러리 필요
// npm install react-hover-video-player
import HoverVideoPlayer from 'react-hover-video-player';

function VideoBtn(props) {

    function handleSubmit(event) {
        event.preventDefault();
        console.log('video clicked');
    }

    return (
        <div className="wrapper">
            <div className="video-box">
                <div className="video">
                <HoverVideoPlayer
                    restartOnPaused
                    videoSrc={[
                        { src: '/VideoSrc/v1.webm', type: 'video/webm' },
                        { src: 'video.mp4', type: 'video/mp4' },
                    ]}>
                </HoverVideoPlayer>
                    <form onSubmit={handleSubmit}>
                        <button className="matching-btn" type="submit">통역사매칭서비스</button>
                    </form>
                </div>

                <div className="video">
                <HoverVideoPlayer
                        restartOnPaused
                        videoSrc={[
                            { src: '/VideoSrc/v2.webm', type: 'video/webm' },
                            { src: 'video.mp4', type: 'video/mp4' },
                        ]}>
                    </HoverVideoPlayer>
                    <form onSubmit={handleSubmit}>
                        <button className="matching-btn" type="submit">AI통역서비스</button>
                    </form>
                </div>

            </div>

        </div>
    )
}

export default VideoBtn;