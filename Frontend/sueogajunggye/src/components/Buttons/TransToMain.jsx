import React from "react";
import './Buttons.css';
import { Link } from 'react-router-dom';
// npm install @mui/icons-material 설치
import LoginIcon from '@mui/icons-material/Login';

function TransToMain(props) {

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <div className="trans-box">
            <Link to="/" style={{ textDecoration: "none" }}>
                <button className="trans-btn">
                <LoginIcon></LoginIcon>
                    Main
                </button>
            </Link>
        </div>
    )
}

export default TransToMain;