import React from "react";
import './Buttons.css';
import { Link } from 'react-router-dom';
import LoginIcon from '@mui/icons-material/Login';

function TransToMainBtn(props) {

    return (
        <div className="trans-box">
            <Link to="/" style={{ textDecoration: "none" }}>
                <button className="main-btn">
                <LoginIcon></LoginIcon>
                    Main
                </button>
            </Link>
        </div>
    )
}

export default TransToMainBtn;