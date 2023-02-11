// 6. useSelector import를 해주기
import { useSelector, useDispatch } from 'react-redux';
import { login, logout } from '../redux/user';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect, useRef } from 'react';
// npm install --save react-socks 설치
// npm install --save react-stomp 설치
// npm install socket.io-client 설치
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

// 8. useDispatch 훅 사용
import { requestTrans } from '../redux/session';
import axios from 'axios';


function Profile() {
    // 7. user reducer에 있는 state에 접근
    const user = useSelector((state) => state.user.value);
    console.log(user);

    const openViduSession = useSelector((state) => state.session.value);
    console.log(`openViduSession 값 : ${openViduSession.openViduSession.openViduSession}`)

    // navigate 함수
    const navigate = useNavigate();
    // 9. action을 보낼 수 있도록 dispatch 함수정의
    const dispatch = useDispatch();

    // 로그아웃
    function userLogout() {
        // 로그아웃 시 회원 정보 초기화
        dispatch(logout())
        // login 페이지로 이동
        navigate("/login");
    }

    //////////////////////////////////////////////////////////////////////////// 소켓통신부분 (by 최성민)
    const [privateStompClient, setPrivateStompClient] = useState(null);
    const [sessionIdentity, setSessionIdentity] = useState(null);

    const socketSubscripeURL = '/user/specific'
    const sendSocketRequestURL = '/app/private'

    const deleteRequestMessageSubscriptURL = '/user/delete'
    let _sessionIdentity = useRef();
    useEffect(() => {
        SocketConnet();
        MappingIdentityLoginUserName();
    }, []);

    const MappingIdentityLoginUserName = async (e) => {
        try {
        const response = await axios.post("http://localhost:8080/mapping/login/user", {sessionIdentity: _sessionIdentity.current}, {
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.usertoken.usertoken}`
            }
        });
        } catch (error) {
        console.log(error)
        }
    };
    const SocketConnet = () => {
        console.log('연결됨');
        const socket = new SockJS('http://localhost:8080/ws');
        const client = Stomp.over(socket);
        
        client.connect({}, (frame) => {
        _sessionIdentity.current = frame.headers['user-name'];
        setSessionIdentity(_sessionIdentity.current);
        //통역신청이 올때의 메세지를 받는 소켓구독
        client.subscribe(socketSubscripeURL, (result) => {
            show(result.body,client)
        });
        //다른 통역사가 메세지를 수락했을때 받는 소켓 구독
        client.subscribe(deleteRequestMessageSubscriptURL, (result) => {
            //메세지 삭제로직
            const buttonId = result.body
            const btn = document.getElementById(buttonId)
            const pTag = btn.parentNode;
            console.log(pTag)
            pTag.parentNode.removeChild(pTag);
        });

        });
        setPrivateStompClient(client);
    };
    const sendRequestToTranslators = () => {
        const text = "통역요청을 수락하시겠습니까?"
        privateStompClient.send(sendSocketRequestURL, {}, JSON.stringify({sessionIdentity: _sessionIdentity.current }));
        };
    //한 통역사가 매칭을 수락했을때 다른 통역사들에게는 메세지가 삭제되도록 하는 소켓



    const show = (requestUserSessionIdentity, client) => {
        const requestMessage = document.getElementById('requestMessage');
        const p = document.createElement('p');
        p.innerHTML = `통역요청이 왔습니다, 세션값 : ${requestUserSessionIdentity}`;
        //수락버튼생성
        const acceptRequestBtn = document.createElement('button')
        acceptRequestBtn.innerText = "수락"
        acceptRequestBtn.setAttribute('id',requestUserSessionIdentity)
        //해당 요청을 수락했을때, openvidu와 연결 그리고 요청자에게 수락됐다는 메세지 전달
        acceptRequestBtn.addEventListener('click',function(e){
            // session 값을 store에 저장
            dispatch(requestTrans({
                openViduSession: {requestUserSessionIdentity},
            }));


            client.send('/app/accept', {}, JSON.stringify({sessionIdentity: requestUserSessionIdentity }))
            // navigate('/cam', {state: {'sessionIdentityArgu':requestUserSessionIdentity}});
        })
        p.appendChild(acceptRequestBtn)
        requestMessage.appendChild(p);
    }

    // redux에 저장할 변수명 : openViduSession

    //////////////////////////////////////////////////////////////////////////// 소켓통신부분 (by 최성민)
    
    

    return (
        <div id="aaa">
            <button onClick={userLogout}>로그아웃</button>
            <h1>Profile Page</h1>
            <p> id : {user.userId.id}</p>
            <p> pass : {user.userPass.pass}</p>
            <p> name : {user.userName.username} </p>
            <p> email : {user.userEmail.useremail} </p>
            <p> isActive : {user.userIsActive.userisactive} </p>
            <p> usertoken : {user.usertoken.usertoken}</p>
            <button id="sendMessage" onClick={MappingIdentityLoginUserName}>통역사용 : 고유식별값을 로그인 유저네임과 mapping</button>
            <button onClick={sendRequestToTranslators}>통역요청보내기</button>
            <div id="requestMessage"></div>
        </div>
    );
}

export default Profile;