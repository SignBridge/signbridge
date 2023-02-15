import React, { useState,useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import './LoadingPage.css';
import Moment from 'react-moment';
import moment from "moment/moment";
import 'moment/locale/ko'
import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

function LoadingPage(props) {

    const startTime = moment()

    let _sessionIdentity = useRef();

    const navigate = useNavigate();
    const leaveSession = (event) => {
        props.leaveSession();
        navigate('/');
    }

    if(props.reload!==0){
        if(props.who!==undefined){
            props.leaveSession();
            navigate('/profile');
        }else{
            leaveSession();
        }
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
            <div className="loading-container">
                <div className="loading-items">
                    <div className="loading-video">
                        <div className="loading-video-box">
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