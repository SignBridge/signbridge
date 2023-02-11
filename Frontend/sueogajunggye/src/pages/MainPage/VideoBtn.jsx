import './Main.css';
// Hovering 라이브러리 필요
// npm install react-hover-video-player
import HoverVideoPlayer from 'react-hover-video-player';
import { Link } from "react-router-dom";
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { requestTrans } from '../../redux/session';

function VideoBtn(props) {
    const ssafyURL = 'http://i8d204.p.ssafy.io:8080';
    const identifySession = useSelector((state) => state.session.value);
    console.log("identifySession 처음값 : ",identifySession.identifySession)
  
    const dispatch = useDispatch();
  
    //////////////////////////////////////////////////////////////////////////
    // 소켓통신부분 (by 최성민)
    const [privateStompClient, setPrivateStompClient] = useState(null);
    const [sessionIdentity, setSessionIdentity] = useState(null);
    let _sessionIdentity = useRef();
    const socketSubscibeURL = '/user/specific'
    const sendSocketRequestURL = '/app/private'
    useEffect(() => {
      SocketConnet()
    }, []);
  
    // 농인들이 소켓에 연결되는 부분
    const SocketConnet = () => {
      const socket = new SockJS(`${ssafyURL}/ws`);
      const client = Stomp.over(socket);
      client.connect({}, (frame) => {
        _sessionIdentity.current = frame.headers['user-name'];
  
        
        // console.log(`농인이 요청 시 보내는 세션 값 : ${_sessionIdentity.current}`)
  
        // 농인의 고유 식별값을 store에 저장
        dispatch(requestTrans({
          openViduSession: "",
          identifySession: _sessionIdentity.current
        }))
  
        setSessionIdentity(_sessionIdentity.current);
        client.subscribe(socketSubscibeURL, (result) => {
          console.log(result.body)
        })
      });
      setPrivateStompClient(client);
    };
  
    //////////////////////// openvidu로 넘어가는 코드
    const navigate = useNavigate();
    const handleClick = (sessionIdentityArgu) => {
      console.log("handleClickhandleClickhandleClick : ",sessionIdentityArgu)
      navigate('/cam');
    };
    ////////////////////////
  
    //통역사들에게 통역요청메세지를 전달하는 부분

    //이함수를 대기화면으로 넘어가게 하고 싶은 곳에 넣으시면 됩니다.
    const sendRequestToTranslators = (event) => {
      event.preventDefault();
      const text = "통역요청을 수락하시겠습니까?"
      privateStompClient.send(sendSocketRequestURL, {}, JSON.stringify({ sessionIdentity: _sessionIdentity.current }));
      handleClick(_sessionIdentity.current)
    };
  

    return (
        <div className="video-box">
            <div className="video-left-item">
                <button onClick={sendRequestToTranslators}>
                    <video
                        className="video-item" 
                        src="/VideoSrc/v1.webm"
                        loop="true"
                        onMouseOver={e => e.target.play()}
                        onMouseLeave={e => e.target.pause()}
                    ></video>
                </button>
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