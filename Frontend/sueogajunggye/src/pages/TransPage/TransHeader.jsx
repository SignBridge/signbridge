import React from "react";
import './Profile.css'
import TransToMain from '../../components/Buttons/TransToMain'
import { Link } from 'react-router-dom';
import Logo from '../../assets/images/logo.png'

function MainHeader(props) {

    return (
        <div className="title-box">
            <Link to="/">
            <button style={{border: 'none', 'background-color':'white'}}>
            <div className="title-header" ><img src={Logo} />손길</div>
            </button>
            </Link>           
            <TransToMain></TransToMain>
        </div>
    );
}

export default MainHeader;