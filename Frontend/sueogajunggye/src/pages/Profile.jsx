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
        </div>
    );
}

export default Profile;