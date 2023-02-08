import React from "react";
import './Main.css';
import MainToTransBtn from '../../components/Buttons/MainToTrans'
import Logo from '../../assets/images/logo.png'

function Title(props) {
    return (
        <div className="title-box">
            <div className="title-header"><img src={Logo} />수어가중계</div>
            <MainToTransBtn></MainToTransBtn>
        </div>
    );
}

export default Title;