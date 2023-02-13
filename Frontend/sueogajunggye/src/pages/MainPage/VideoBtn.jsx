import './Main.css';
// Hovering 라이브러리 필요
// npm install react-hover-video-player
import { Link } from "react-router-dom";
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { requestTrans } from '../../redux/session';

function VideoBtn(props) {
    const ssafyURL = 'https://i8d204.p.ssafy.io:8080';
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
      const socket = new SockJS(`${ssafyURL}/wss`);
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
      privateStompClient.send(sendSocketRequestURL, {}, JSON.stringify({ sessionIdentity: _sessionIdentity.current }));
      handleClick(_sessionIdentity.current)
    };
  

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
                            <Link to="/cam">
                                <button className="main-top-btn" onClick={sendRequestToTranslators}>통역사 매칭 서비스</button>
                            </Link>
                        </div>
                        <div>
                            <Link to="/aiTranslate">
                                <button className="main-bottom-btn">AI 통역 서비스</button>
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="main-video-wrap">
                    <video
                        src="/VideoSrc/mainVideo.mp4"
                        muted
                        loop="true"
                        autoPlay
                        // onMouseOver={e => e.target.play()}
                        // onMouseLeave={e => e.target.pause()}
                    ></video>
                </div>
            </div>
        </div>
    )
}

export default VideoBtn;