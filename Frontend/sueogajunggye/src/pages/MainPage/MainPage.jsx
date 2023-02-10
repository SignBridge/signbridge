import Title from "./Title";
import VideoBtn from "./VideoBtn";
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import React, { useState, useEffect, useRef } from 'react';
function MainPage(props) {


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
        const socket = new SockJS('http://localhost:8080/ws');
        const client = Stomp.over(socket);
        client.connect({}, (frame) => {
          _sessionIdentity.current = frame.headers['user-name'];
          setSessionIdentity(_sessionIdentity.current);
          client.subscribe(socketSubscibeURL,(result)=>{
            show(result.body)
          })
        });
        setPrivateStompClient(client);
      };
      //통역사들에게 통역요청메세지를 전달하는 부분
      const sendRequestToTranslators = () => {
        const text = "통역요청을 수락하시겠습니까?"
        privateStompClient.send(sendSocketRequestURL, {}, JSON.stringify({sessionIdentity: _sessionIdentity.current }));
      };
    
    const show = (acceptMessage) => {
      const acceptMessageDiv = document.getElementById('acceptMessage');

      const p = document.createElement('p');
      p.innerHTML = "통역사가 요청을 수락했습니다. 지금 접속하시겠습니까?";

      const acceptMessageBtn = document.createElement('button')
      acceptMessageBtn.innerText = "수락"
      acceptMessageBtn.addEventListener('click',function(e){
        console.log("이곳에 수락이후 openvidu를 연결하는 코드를 작성하시오")
      })
      
      p.appendChild(acceptMessageBtn)
      acceptMessageDiv.appendChild(p);
    }
    //////////////////////////////////////////////////////////////////////////// 소켓통신부분 (by 최성민)


    return (
        <div className="main-box">
            <button onClick={sendRequestToTranslators}>통역사 매칭 서비스</button>
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