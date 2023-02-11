import Title from "./Title";
import VideoBtn from "./VideoBtn";
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import React, { useState, useEffect, useRef } from 'react';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
// 8. useDispatch 훅 사용
import { requestTrans } from '../../redux/session';

function MainPage(props) {
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
        show(result.body)
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
  const sendRequestToTranslators = (event) => {
    event.preventDefault();
    const text = "통역요청을 수락하시겠습니까?"
    privateStompClient.send(sendSocketRequestURL, {}, JSON.stringify({ sessionIdentity: _sessionIdentity.current }));
    handleClick(_sessionIdentity.current)
  };

  const show = (acceptMessage) => {
    const acceptMessageDiv = document.getElementById('acceptMessage');
    const p = document.createElement('p');
    p.innerHTML = "통역사가 요청을 수락했습니다. 지금 접속하시겠습니까?";
    const acceptMessageBtn = document.createElement('button')
    acceptMessageBtn.innerText = "접속"
    acceptMessageBtn.addEventListener('click', function (e) {

      // console.log("이곳에 접속이후 openvidu를 연결하는 코드를 작성하시오")

    })

    p.appendChild(acceptMessageBtn)
    acceptMessageDiv.appendChild(p);
  }
  //////////////////////////////////////////////////////////////////////////// 소켓통신부분 (by 최성민)


  return (
    <div className="main-box">
      <button onClick={sendRequestToTranslators}>통역사 매칭 서비스
      </button>
      <div id="acceptMessage">
        acceptMessage
      </div>
      <Title></Title>
      <div className="main-bg-img">
        <VideoBtn></VideoBtn>
      </div>
    </div>
  )
}

export default MainPage;