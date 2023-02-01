import React from "react";
import { Link } from "react-router-dom";
import './Buttons.css';

function MainToTransBtn(props) {

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <div className="trans-box">
            <Link to="/login">
                <form onSubmit={handleSubmit}>
                    <button className="trans-btn">
                        통역사
                    </button>
                </form>
            </Link>
        </div>
    )
}

export default MainToTransBtn;