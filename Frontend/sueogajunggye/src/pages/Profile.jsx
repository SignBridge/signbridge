import React from 'react';
// 6. useSelector import를 해주기
import { useSelector } from 'react-redux';

function Profile() {
    // 7. user reducer에 있는 state에 접근
    const user = useSelector((state) => state.user.value);
    console.log(user)

    return (
        <div>
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