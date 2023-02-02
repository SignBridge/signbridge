import React from "react";
import './Main.css';
import MainToTransBtn from '../../components/Buttons/MainToTrans'

function Title(props) {
    return (
        <div className="title-box">
            <MainToTransBtn></MainToTransBtn>
            <div className="title-header">수어가중계</div>
        </div>
    );
}

export default Title;