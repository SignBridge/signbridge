import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import './LoadingPage.css';

// node 8 이상 && npm install --save moment react-moment 설치
import Moment from 'react-moment';
import moment from "moment/moment";
// 안써도 자동으로 한국 시간을 불러온다. 명확하게 하기 위해 import
import 'moment/locale/ko'

import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
// import colors from '../style/colors';

function LoadingPage(props) {

    const startTime = moment()

    const [waitingState, setWaitingState] = useState('원활');
    
    const waitingNums = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function waiting(e) {
        e.preventDefault();

        const nums = waitingNums(0, 50);
        console.log(nums);

        if (nums >= 21) {
            setWaitingState('혼잡');
        } else if (nums < 10) {
            setWaitingState('원활');
        } else {
            setWaitingState('보통');
        }
    }
    console.log('되나');
    console.log(props);

    const navigate = useNavigate();
    const leaveSession = (event) => {
        event.preventDefault();
        props.leaveSession();
        navigate('/');
    }

    const bounce = keyframes`
        0 {
            transform: translateY(0);
        }
        50% {
            transform: translateY(-15px);
        }
        100% {
            transform: translateY(0);
        }
        `;

    const Text = styled.div({
    width: '400px',
    height: '40px',
    margin: '10px auto',
    animation: `${bounce} 3s ease infinite`,
    fontSize: '30px',
    textAlign: 'center',
    color: 'black',
    fontFamily: 'esamaru-bord'
    });

    const Container = styled.div({
    width: '200px',
    margin: '0 auto',
    });

    const BoxStyle = styled.div({
    float: 'left',
    width: '20%',
    padding: '5px',
    });

    const LoadingIcon = styled.div({
    width: '30px',
    height: '30px',
    borderRadius: '100%',
    background: `rgba(133, 194, 251, 1)`,
    animation: `${bounce} 3s ease infinite`,
    marginLeft: '15px',
    });

    return (
        <div className="loading-page">
            {/* <div className="loading-top-items">
                <button className="loading-waiting-btn" onClick={waiting}>{waitingState}</button>
            </div> */}
            
            <div className="loading-container">
                <div className="loading-items">
                    <div className="loading-video">
                        <div className="loading-video-box">
                            {/* <video className="loading-video-item" muted autoPlay loop>
                                <source src="/VideoSrc/v1.webm" type="video/webm"/>
                            </video> */}
                            {/* <br />
                            <div className="loading-waiting-txt">통역 요청 승인 대기중입니다.</div> */}
                            <Text>
                                통역 요청 승인 대기중입니다
                            </Text>
                            <Container>
                                <BoxStyle>
                                <LoadingIcon />
                                </BoxStyle>
                                <BoxStyle>
                                <LoadingIcon />
                                </BoxStyle>
                                <BoxStyle>
                                <LoadingIcon />
                                </BoxStyle>
                            </Container>
                        </div>
                    </div>
                    <div className="loading-loading-btns">
                        <button className="loading-waitingTime-btn"><Moment date={startTime} format="mm:ss" durationFromNow interval={1000}/></button>
                        <Link to="/aiTranslate">
                        <button className="loading-ai-btn">AI 상담 요청</button>
                        </Link>
                        <button className="loading-cancel-btn" onClick={leaveSession}>취소
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoadingPage;