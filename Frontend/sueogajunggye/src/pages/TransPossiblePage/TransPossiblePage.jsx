import React, { useState } from "react";
// npm install --save moment react-moment 설치
import Moment from 'react-moment';
// 안써도 자동으로 한국 시간을 불러온다. 명확하게 하기 위해 import
import 'moment/locale/ko';
// npm install moment react-moment use-interval 설치
import useInterval from 'react-useinterval';
import { useSelector } from 'react-redux';
import './TransPossible.css'

function TransPossible(props) {

    // 현재시간 띄워주기
    const [nowTime, setNowTime] = useState(Date.now());

    useInterval(() => {
        setNowTime(Date.now());
    }, 1000);

    // user reducer에 있는 state에 접근
    const user = useSelector((state) => state.user.value); 

    return (
        <div className="trans-items">
            <div className="trans-left-items">
                <button className="user-name-btn">
                    {user.userName.username} 통역사님
                </button>
                <Moment format="YYYY.MM.DD HH:mm" className={"moment-box"}>{nowTime}</Moment>
                <div>요청 대기 인원 : </div>
                <div>요청카드</div>
            </div>
            <div className="trans-right-items">
                추후Q&A 공지사항 들어갈 자리
            </div>
        </div>
    )
}

export default TransPossible;