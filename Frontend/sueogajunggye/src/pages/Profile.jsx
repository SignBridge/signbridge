import React from 'react';
// 6. useSelector import를 해주기
import { useSelector, useDispatch } from 'react-redux';
import { login, logout } from '../redux/user';
import { useNavigate } from 'react-router-dom';

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

    return (
        <div>
            <button onClick={userLogout}>로그아웃</button>
            <h1>Profile Page</h1>
            <p> id : {user.userId.id}</p>
            <p> pass : {user.userPass.pass}</p>
            <p> name : {user.userName.username} </p>
            <p> email : {user.userEmail.useremail} </p>
            <p> isActive : {user.userIsActive.userisactive} </p>
        </div>
    );
}

export default Profile;