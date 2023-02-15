import React, { Component } from 'react';
import './ToolbarComponent.css';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
// import { useSelector, useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';

import Mic from '@material-ui/icons/Mic';
import MicOff from '@material-ui/icons/MicOff';
import Videocam from '@material-ui/icons/Videocam';
import VideocamOff from '@material-ui/icons/VideocamOff';
import Fullscreen from '@material-ui/icons/Fullscreen';
import FullscreenExit from '@material-ui/icons/FullscreenExit';
import SwitchVideoIcon from '@material-ui/icons/SwitchVideo';
// import PictureInPicture from '@material-ui/icons/PictureInPicture';
// import ScreenShare from '@material-ui/icons/ScreenShare';
// import StopScreenShare from '@material-ui/icons/StopScreenShare';
import Tooltip from '@material-ui/core/Tooltip';
import PowerSettingsNew from '@material-ui/icons/PowerSettingsNew';
import QuestionAnswer from '@material-ui/icons/QuestionAnswer';
import {  connect } from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import { Link} from "react-router-dom";
// const logo = require('../../assets/images/openvidu_logo.png');
console.log('툴바 컴포넌트 내부');

class ToolbarComponent extends Component {
    constructor(props) {
        console.log('툴바 컴포넌트 내부 생성자');
        super(props);
        // console.log(super(props));
        // console.log(props);
        this.state = { fullscreen: false };
        this.camStatusChanged = this.camStatusChanged.bind(this);
        this.micStatusChanged = this.micStatusChanged.bind(this);
        // this.screenShare = this.screenShare.bind(this);
        // this.stopScreenShare = this.stopScreenShare.bind(this);
        this.toggleFullscreen = this.toggleFullscreen.bind(this);
        this.switchCamera = this.switchCamera.bind(this);
        this.leaveSession = this.leaveSession.bind(this);
        this.toggleChat = this.toggleChat.bind(this);
        const { storeValue } = this.props;
        console.log('툴바컴포넌트 생성자');
        console.log({storeValue});
        
    }
    
    

    micStatusChanged() {
        console.log(this.props.storeValue.session.value);
        this.props.micStatusChanged();
        
    }

    camStatusChanged() {
        this.props.camStatusChanged();
        
    }

    // screenShare() {
    //     this.props.screenShare();
    // }

    // stopScreenShare() {
    //     this.props.stopScreenShare();
    // }

    toggleFullscreen() {
        this.setState({ fullscreen: !this.state.fullscreen });
        this.props.toggleFullscreen();
    }

    switchCamera() {
        
        this.props.switchCamera();
        if(this.storeValue.session.value.identifySession===""){
            console.log('농인');
        }
    }

    leaveSession() {
        
        if(this.props.storeValue.session.value.identifySession===""){
            window.history.back();
        }
    }

    toggleChat() {
        console.log('토글챗. ')
        this.props.toggleChat();
    }

    render() {
        const mySessionId = this.props.sessionId;
        const localUser = this.props.user;
        // this.set
        // const navigate = this.useNavigate();
        // 9. action을 보낼 수 있도록 dispatch 함수정의
        // const dispatch = this.useDispatch();
        // const user = this.useSelector((state) => state.user.value);
        // console.log(user);

        console.log('여기도 생성자 뒤 맨 처음?');
        return (
            <AppBar className="toolbar" id="header">
                <Toolbar className="toolbar">
                    <div id="navSessionInfo">
                        {console.log('툴바 요소안에 div')}
                        {/* <img
                            id="header_img" 
                            alt="OpenVidu Logo"
                            src={logo}
                        /> */}

                        {this.props.sessionId && <div id="titleContent">
                            <div id="session-title">손길</div>
                        </div>}
                    </div>

                    <div className="buttonsContent">
                        <IconButton color="inherit" className="navButton" id="navMicButton" onClick={this.micStatusChanged}>
                            {localUser !== undefined && localUser.isAudioActive() ? <Mic /> : <MicOff color="secondary" />}
                        </IconButton>

                        <IconButton color="inherit" className="navButton" id="navCamButton" onClick={this.camStatusChanged}>
                            {localUser !== undefined && localUser.isVideoActive() ? (
                                <Videocam />
                            ) : (
                                <VideocamOff color="secondary" />
                            )}
                        </IconButton>

                        {/* <IconButton color="inherit" className="navButton" onClick={this.screenShare}>
                            {localUser !== undefined && localUser.isScreenShareActive() ? <PictureInPicture /> : <ScreenShare />}
                        </IconButton> */}

                        {/* {localUser !== undefined &&
                            localUser.isScreenShareActive() && (
                                <IconButton onClick={this.stopScreenShare} id="navScreenButton">
                                    <StopScreenShare color="secondary" />
                                </IconButton>
                            )} */}

                        <IconButton color="inherit" className="navButton" onClick={this.switchCamera}>
                            <SwitchVideoIcon />
                        </IconButton>
                        <IconButton color="inherit" className="navButton" onClick={this.toggleFullscreen}>
                            {localUser !== undefined && this.state.fullscreen ? <FullscreenExit /> : <Fullscreen />}
                        </IconButton>
                        <Link to="/">
                            <IconButton color="secondary" className="navButton" onClick={this.leaveSession} id="navLeaveButton">
                                <PowerSettingsNew />
                            </IconButton>
                        </Link>
                         <IconButton color="inherit" onClick={this.toggleChat} id="navChatButton">
                            {this.props.showNotification && <div id="point" className="" />}
                            <Tooltip title="Chat">
                                <QuestionAnswer />
                            </Tooltip>
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
        );
    }
}

const mapStateToProps = (state)=>({
    storeValue: state
});
// export default connect(mapStateToProps)
export default connect(mapStateToProps)(ToolbarComponent);