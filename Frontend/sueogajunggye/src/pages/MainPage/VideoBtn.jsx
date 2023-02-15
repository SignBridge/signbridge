import './Main.css';
import { Link } from "react-router-dom";
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { requestTrans } from '../../redux/session';

function VideoBtn(props) {
    const ssafyURL = 'https://i8d204.p.ssafy.io';
    const identifySession = useSelector((state) => state.session.value);
    
    const dispatch = useDispatch();
  
    const [privateStompClient, setPrivateStompClient] = useState(null);
    const [sessionIdentity, setSessionIdentity] = useState(null);
    let _sessionIdentity = useRef();
    const socketSubscibeURL = '/user/specific'
    const sendSocketRequestURL = '/app/private'

    useEffect(() => {
      SocketConnet()
    }, []);
  
    const SocketConnet = () => {
      const socket = new SockJS(`${ssafyURL}/ws`);
      const client = Stomp.over(socket);
      client.connect({}, (frame) => {
        _sessionIdentity.current = frame.headers['user-name'];

        dispatch(requestTrans({
          openViduSession: "",
          identifySession: _sessionIdentity.current,
          exitOther:0
        }))
  
        setSessionIdentity(_sessionIdentity.current);
        client.subscribe(socketSubscibeURL, (result) => {
        })
      });
      setPrivateStompClient(client);
    };

    const navigate = useNavigate();
    const handleClick = (sessionIdentityArgu) => {
      navigate('/cam');
    };

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
                    ></video>
                </div>
            </div>
        </div>
    )
}

export default VideoBtn;