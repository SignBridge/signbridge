import React from "react";
import './Main.css';
import MainToTransBtn from '../../components/Buttons/MainToTrans'
import Logo from '../../assets/images/logo.png'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


function MainHeader(props) {
    window.onload=function(){
        var el = document.getElementById("goHome");
        el.onClick = goToHome;
    }
    const navigate = useNavigate();
    function goToHome(){
        console.log('go home');
        navigate('/');
    }
    return (
        <div className="title-box">
            <Link to="/">
            <button style={{border: 'none', 'background-color':'white'}}>
            <div className="title-header hhh" ><img src={Logo} />수어가중계</div>
            </button>
            </Link>
            
            <MainToTransBtn></MainToTransBtn>
        </div>
    );
}

export default MainHeader;