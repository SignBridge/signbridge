import React from "react";
import './Main.css';
// import VideoRoomComponent from "../../components/VideoRoomComponent"
import VideoRoomComponent from '../../components/VideoRoomComponent';
// Hovering 라이브러리 필요
// npm install react-hover-video-player
import HoverVideoPlayer from 'react-hover-video-player';
import registerServiceWorker from '../../registerServiceWorker';
import ReactDOM from 'react-dom';
import { Link } from "react-router-dom";

function VideoBtn(props) {

    function handleSubmit(event) {
        event.preventDefault();
        console.log('video clicked');
    }
    function videoSubmit(event){
        event.preventDefault();
        ReactDOM.render(
            <VideoRoomComponent />, document.getElementById('root')
          );
          registerServiceWorker();
         
        // return  (
        //     <div>
        //         <VideoRoomComponent />
        //     </div>
        // )
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
                    <form onSubmit={videoSubmit}>
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
                    {/* <form onSubmit={handleSubmit}> */}
                    <Link to="/aiTranslate">
                        <button className="matching-btn" type="submit">AI통역서비스</button>
                    </Link>
                    {/* </form> */}
                </div>

            </div>

        </div>
    )
}

export default VideoBtn;