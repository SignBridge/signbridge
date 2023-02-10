// 6. useSelector import를 해주기
import { useSelector, useDispatch } from 'react-redux';
import { login, logout } from '../redux/user';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect, useRef } from 'react';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import axios from 'axios';

function Profile() {
    // 7. user reducer에 있는 state에 접근
    const user = useSelector((state) => state.user.value);
    console.log(user);

    // navigate 함수
    const navigate = useNavigate();

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
    const socketSubscibeURL = '/user/specific'
    const sendSocketRequestURL = '/app/private'
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
        client.subscribe(socketSubscibeURL, (result) => {
            show(result.body,client)
        });
        });
        setPrivateStompClient(client);
        
    };

    const sendRequestToTranslators = () => {
        const text = "통역요청을 수락하시겠습니까?"
        privateStompClient.send(sendSocketRequestURL, {}, JSON.stringify({sessionIdentity: _sessionIdentity.current }));
        };

    const show = (requestUserSessionIdentity, client) => {
        const requestMessage = document.getElementById('requestMessage');
        const p = document.createElement('p');
        p.innerHTML = `통역요청이 왔습니다, 세션값 : ${requestUserSessionIdentity}`;
        //수락버튼생성
        const acceptRequestBtn = document.createElement('button')
        acceptRequestBtn.innerText = "수락"
        acceptRequestBtn.setAttribute('id',requestUserSessionIdentity)
        acceptRequestBtn.addEventListener('click',function(e){
        client.send('/app/accept', {}, JSON.stringify({sessionIdentity: requestUserSessionIdentity }))
        })
    
        p.appendChild(acceptRequestBtn)
        requestMessage.appendChild(p);
    }
    //////////////////////////////////////////////////////////////////////////// 소켓통신부분 (by 최성민)
    

    return (
        <div>
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