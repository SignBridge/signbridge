import React from "react";
import './Profile.css'
import TransToMain from '../../components/Buttons/TransToMain'

import Logo from '../../assets/images/logo.png'

function MainHeader(props) {

    return (
        <div className="title-box">
            <div className="title-header"><img src={Logo} />수어가중계</div>
            <TransToMain></TransToMain>
        </div>
    );
}

export default MainHeader;