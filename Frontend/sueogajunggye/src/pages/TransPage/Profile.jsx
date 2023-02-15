import { useSelector, useDispatch } from 'react-redux';
import { login, logout } from '../../redux/user';
import React, { useState, useEffect, useRef } from 'react';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import { useNavigate } from 'react-router-dom';
import { requestTrans } from '../../redux/session'
import axios from 'axios';
import TransHeader from './TransHeader'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import './Profile.css'

function Profile() {
    
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const ssafyURL = 'https://i8d204.p.ssafy.io';
    const localURL = 'http://localhost:8080'
    const user = useSelector((state) => state.user.value);
    const Img = `https://d204.s3.ap-northeast-1.amazonaws.com/%ED%86%B5%EC%97%AD%EC%82%AC/${user.userId.id}`

    const openViduSession = useSelector((state) => state.session.value);

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
        client.subscribe(socketSubscripeURL, (result) => {
            show(result.body,client)
        });
        client.subscribe(deleteRequestMessageSubscriptURL, (result) => {
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

    const show = (requestUserSessionIdentity, client) => {

        const requestMessage = document.getElementById('requestMessage');
        requestMessage.innerHTML = `<div class='transRequestBg'>
                <div class='transRequestText'>수어 통역 요청이 왔습니다</div>
                <button class='transRequestBtn'>통역수락</button>
            </div>`

        requestMessage.addEventListener('click',function(e){
            dispatch(requestTrans({
                openViduSession: {requestUserSessionIdentity},
                identifySession: "",
                exitOther:0
            }));

            client.send('/app/accept', {}, JSON.stringify({sessionIdentity: requestUserSessionIdentity }))
            navigate('/cam');
        })
    }

    function userLogout() {
        dispatch(logout())
        navigate("/login");
    }

    return (
        <div>
            <TransHeader></TransHeader>
            <div className='profile-box'>
                <div className='profile-side-box'>
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
                                height: 400,
                            },
                        }}>
                        <Paper className='paper-box' elevation={3}>
                            <button className="profile-btn">
                                <img className="profile-img" src={Img} />
                            </button>
                        </Paper>
                    </Box>
                    <button className='profile-logout-btn' onClick={userLogout}>로그아웃</button>
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
        </div>
    );
}

export default Profile;