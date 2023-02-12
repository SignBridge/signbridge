import React, { useState } from "react";
import './LoadingPage.css';
import PowerSettingsNew from '@material-ui/icons/PowerSettingsNew';

import { useNavigate } from 'react-router-dom';

// node 8 이상 && npm install --save moment react-moment 설치
import Moment from 'react-moment';
import moment from "moment/moment";
// 안써도 자동으로 한국 시간을 불러온다. 명확하게 하기 위해 import
import 'moment/locale/ko'

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

    return (
        <div className="loading-page">
            <div className="loading-top-items">
                <button className="waiting-btn" onClick={waiting}>{waitingState}</button>
            </div>
            <div className="loading-container">
                <div className="loading-items">
                    <div className="loading-video">
                        <div className="video-box">
                            <video className="video-item" muted autoPlay loop>
                                <source src="/VideoSrc/v1.webm" type="video/webm"/>
                            </video>
                            <br />
                            <div className="waiting-txt">통역 요청 승인 대기중입니다.</div>
                        </div>
                    </div>
                    <div className="loading-btns">
                        <button className="waitingTime-btn"><Moment date={startTime} format="mm:ss" durationFromNow interval={1000}/></button>
                        <button className="ai-btn">AI 상담 요청</button>
                        <button className="cancel-btn" onClick={leaveSession}>취소
                            <PowerSettingsNew />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoadingPage;