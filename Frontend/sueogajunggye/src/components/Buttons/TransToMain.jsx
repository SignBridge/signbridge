import React from "react";
import './Buttons.css';

function MainToTransBtn(props) {

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <div className="trans-box">
            <form onSubmit={handleSubmit}>
                <button className="main-btn">
                    Main
                </button>
            </form>
        </div>
    )
}

export default MainToTransBtn;