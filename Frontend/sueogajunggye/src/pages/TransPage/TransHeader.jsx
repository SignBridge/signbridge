import React from "react";
import './Profile.css'
import TransToMain from '../../components/Buttons/TransToMain'

import { useDispatch } from 'react-redux';
import { logout } from '../../redux/user';
import { useNavigate } from 'react-router-dom';
import Logo from '../../assets/images/logo.png'

function MainHeader(props) {

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

    return (
        <div className="title-box">
            <div className="title-header"><img src={Logo} />수어가중계</div>
            <button onClick={userLogout}>로그아웃</button>
            <TransToMain></TransToMain>
        </div>
    );
}

export default MainHeader;