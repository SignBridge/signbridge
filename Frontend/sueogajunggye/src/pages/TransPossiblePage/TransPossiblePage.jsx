import React, { useState } from "react";
// npm install --save moment react-moment 설치
import Moment from 'react-moment';
// 안써도 자동으로 한국 시간을 불러온다. 명확하게 하기 위해 import
import 'moment/locale/ko';
// npm install moment react-moment use-interval 설치
import useInterval from 'react-useinterval';

function TransPossible({ user }) {

    const [nowTime, setNowTime] = useState(Date.now());

    useInterval(() => {
        setNowTime(Date.now());
    }, 1000);

    const transName = user.name;

    return (
        <div className="trans-items">
            <div className="trans-left-items">
                {transName}
                <Moment format="YYYY.MM.DD HH:mm" className={"moment-box"}>{nowTime}</Moment>

            </div>
            <div className="trans-right-items">
                추후Q&A 공지사항 들어갈 자리
            </div>
        </div>
    )
}

export default TransPossible;