import React from "react";
import './Buttons.css';
import { Link } from "react-router-dom";

function MainToTransBtn(props) {

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <div className="trans-box">
            <Link to="/">
                <form onSubmit={handleSubmit}>
                    <button className="main-btn">
                        Main
                    </button>
                </form>
            </Link>
        </div>
    )
}

export default MainToTransBtn;