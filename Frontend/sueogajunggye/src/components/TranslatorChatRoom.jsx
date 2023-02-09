import React, { useState,useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import { useCallback } from 'react';

const TranslatorChatRoom = () => {
  const [stompClient, setStompClient] = useState(null);
  const [privateStompClient, setPrivateStompClient] = useState(null);
  const [userKey, setUserKey] = useState(null);
  const user = useSelector((state) => state.user.value);

  let _userKey = useRef();
  const _requestContainer = useRef();
  useEffect(() => {
    handleConnect();
    handlePrivateConnect();
  }, []);

  const handleConnect = () => {
    const socket = new SockJS('http://localhost:8090/ws');
    const client = Stomp.over(socket);
    console.log('CLIENT',client)
    
    client.connect({}, (frame) => {
      client.subscribe('/all/messages', (result) => {
        show(JSON.parse(result.body)); // 메세지를 화면에 출력해주는 부분
      });
    });
    setStompClient(client);
  };

  const handlePrivateConnect = () => {
    const socket = new SockJS('http://localhost:8090/ws');
    const client = Stomp.over(socket);
    console.log('PRIVATECLIENT',client)
    client.connect({"111":"111"}, (frame) => {
      _userKey.current = frame.headers['user-name'];
      setUserKey(_userKey.current);
      console.log("handlePrivateConnect 콘솔로그");
      client.subscribe('/user/specific', (result) => {
        console.log("result.bodyresult.bodyresult.bodyresult.body",result.body);
        show(JSON.parse(result.body));  
        showTranslateRequest();
      });
    });
    setPrivateStompClient(client);
  };

  const sendMessage = useCallback(() => {
    const username = user.userId.id
    const text = "통역요청을 수락하시겠습니까?"
    console.log("sendMessagesendMessagesendMessagesendMessagesendMessage: ",_userKey)
    if (!stompClient) {
      console.error("stompClient is not defined");
      return;
    }
    console.log("sendMessage함수 내 stompClient",stompClient)
    stompClient.send('/app/application', {}, JSON.stringify({ from : _userKey.current, text:  text, username: username }));
  }, [stompClient]);

  const sendPrivateMessage = () => {
    const text = "통역요청을 수락하시겠습니까?"
    const username = user.userId.id
    console.log("sendPrivateMessage 콘솔로그")
    console.log("from : ", _userKey)
    console.log(JSON.stringify({ text, username,_userKey }))
    privateStompClient.send('/app/private', {}, JSON.stringify({ text: text, username: username ,from : _userKey.current}));
  };

  // 메세지가 생성되는 부분
  const show = (message) => {
    console.log("message : ",message)
    const response = document.getElementById('messages');
    console.log(2222,response)
    const p = document.createElement('p');
    p.innerHTML = `message: ${message.from}, ${message.text}, ${message.username}`;
    response.appendChild(p);
  };

  //통역 요청 보여주기
  const showTranslateRequest = () => {
    const p = document.createElement('p');
    p.innerHTML = '통역 요청이 있습니다. 수락하시겠습니까?';
    _requestContainer.current.appendChild(p);
    const acceptButton = document.createElement('button');
    acceptButton.innerHTML = '수락';
    _requestContainer.current.appendChild(acceptButton);
  }  

  return (
    <div>
      <div className='requestContainer' ref={_requestContainer} />
      <div>
        <button id="sendMessage" onClick={sendMessage}>Send</button>
      </div>
      <br />
      <div>
        <button id="sendPrivateMessage" onClick={sendPrivateMessage}>
          Send Private
        </button>
        <input type="text" id="privateText" placeholder="Private Message" />
        <input type="text" id="to" placeholder="To" />
        <div id="messages">
        </div>
      </div>
      <br />
      <br />
      <br />

    </div>
  );
};

export default TranslatorChatRoom;