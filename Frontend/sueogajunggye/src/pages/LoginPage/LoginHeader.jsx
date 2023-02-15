import React from "react";
import './LoginPage.css'
import TransToMainBtn from '../../components/Buttons/TransToMain'
import Logo from '../../assets/images/logo.png'
import { Link } from 'react-router-dom';

function LoginHeader(props) {
    return (
        <div className="title-box">
            <Link to="/">
            <button style={{border: 'none', 'background-color':'white'}}>
            <div className="title-header" ><img src={Logo} />수어가중계</div>
            </button>
            </Link>
            <TransToMainBtn></TransToMainBtn>
        </div>
    );
}

export default LoginHeader;