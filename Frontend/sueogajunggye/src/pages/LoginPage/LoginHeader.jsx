import React from "react";
import './LoginPage.css'
import TransToMainBtn from '../../components/Buttons/TransToMain'
import Logo from '../../assets/images/logo.png'

function LoginHeader(props) {
    return (
        <div className="title-box">
            <div className="title-header"><img src={Logo} />손길</div>
            <TransToMainBtn></TransToMainBtn>
        </div>
    );
}

export default LoginHeader;