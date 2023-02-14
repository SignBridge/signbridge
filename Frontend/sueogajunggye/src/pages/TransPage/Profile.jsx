// 6. useSelector import를 해주기
import { useSelector, useDispatch } from 'react-redux';
import { login, logout } from '../../redux/user';
import React, { useState, useEffect, useRef } from 'react';
// npm install --save react-socks 설치
// npm install --save react-stomp 설치
// npm install socket.io-client 설치
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import { useNavigate } from 'react-router-dom';

// 8. useDispatch 훅 사용
import { requestTrans } from '../../redux/session'
import axios from 'axios';

import TransHeader from './TransHeader'

// 카드 css
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

import './Profile.css'
import profileBasicImg from "../../assets/images/profileBasicImg.png";
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';

function Profile() {

    // navigate 함수
    const navigate = useNavigate();
    // 9. action을 보낼 수 있도록 dispatch 함수정의
    const dispatch = useDispatch();

    // 7. user reducer에 있는 state에 접근
    const ssafyURL = 'https://i8d204.p.ssafy.io';
    const localURL = 'http://localhost:8080'
    const user = useSelector((state) => state.user.value);
    console.log(user);

    // session reducer 에 있는 state에 접근 후 session 값 가져오기
    const openViduSession = useSelector((state) => state.session.value);


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
        const response = await axios.post(`${ssafyURL}/mapping/login/user`, {sessionIdentity: _sessionIdentity.current}, {
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

        const socket = new SockJS(`${ssafyURL}/ws`);
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
        MappingIdentityLoginUserName();
        });
        setPrivateStompClient(client);
    };

    // const sendRequestToTranslators = () => {
    //     const text = "통역요청을 수락하시겠습니까?"
    //     privateStompClient.send(sendSocketRequestURL, {}, JSON.stringify({sessionIdentity: _sessionIdentity.current }));
    //     };
    const sendRequestToTranslators = () => {
        const text = "통역요청을 수락하시겠습니까?"
        privateStompClient.send(sendSocketRequestURL, {}, JSON.stringify({sessionIdentity: _sessionIdentity.current }));
        };

    const show = (requestUserSessionIdentity, client) => {

        const requestMessage = document.getElementById('requestMessage');
        // 요청 시 요청메세지 생성 
        requestMessage.innerHTML = `<div class='transRequestBg'>
                <div class='transRequestText'>알림 : 수어 통역 요청이 왔습니다</div>
                <button class='transRequestBtn'>통역수락</button>
            </div>`

        // 해당 요청을 수락했을때, openvidu와 연결 & 요청자에게 수락됐다는 메세지 전달
        requestMessage.addEventListener('click',function(e){
            // session 값을 store에 저장
            dispatch(requestTrans({
                openViduSession: {requestUserSessionIdentity},
                identifySession: ""
            }));

            client.send('/app/accept', {}, JSON.stringify({sessionIdentity: requestUserSessionIdentity }))
            navigate('/cam');
        })
    }

    // 프로필 사진 함수
    const [file, setFile] = useState(profileBasicImg);
    function handleChange(e) {
        console.log(e.target.files);
        setFile(URL.createObjectURL(e.target.files[0]));
    }

    // 로그아웃
    function userLogout() {
        // 로그아웃 시 회원 정보 초기화
        dispatch(logout())
        // login 페이지로 이동
        navigate("/login");
    }
    //////////////////////////////////////////////////////////////////////////// 소켓통신부분 (by 최성민)

    return (
        <div>
            <TransHeader></TransHeader>
            <div className='profile-box'>
                <div className='profile-side-box'>
                    <button 
                        className='profile-logout-btn'
                        onClick={userLogout}><PowerSettingsNewIcon fontSize='large'></PowerSettingsNewIcon>
                    </button>
                    <div>
                        <button className='profile-trans-name'>{user.userName.username}<br></br>통역사님</button>
                    </div>
                    <Box
                        className="profile-box-container"
                        sx={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            '& > :not(style)': {
                                m: 1,
                                width: 300,
                                height: 470,
                            },
                        }}>
                        <Paper className='paper-box' elevation={3}>
                            <button className="profile-btn">
                                <img className="profile-img" src={file} />
                            </button>
                            {/* <input type="file" onChange={handleChange} /> */}
                        </Paper>
                    </Box>
                </div>

                <div className='profile-content-box'>
                    <br />
                    <h1>통역 요청 대기열</h1>
                    <br />
                    <div className='profile-content-inner'>
                        <div id="requestMessage"></div>
                    </div>
                </div>
            </div>

            {/* <div id="aaa">
                <button onClick={userLogout}>로그아웃</button>
                <h1>Profile Page</h1>
                <p> id : {user.userId.id}</p>
                <p> pass : {user.userPass.pass}</p>
                <p> name : {user.userName.username} </p>
                <p> email : {user.userEmail.useremail} </p>
                <p> isActive : {user.userIsActive.userisactive} </p>
                <p> usertoken : {user.usertoken.usertoken}</p>
                <div id="requestMessage"></div>
            </div> */}
        </div>
    );
}

export default Profile;