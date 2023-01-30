import React from "react";
import './Buttons.css';

function MainToTransBtn(props) {

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <div className="trans-box">
            <form onSubmit={handleSubmit}>
                <button className="trans-btn">
                    통역사
                </button>
            </form>
        </div>
    )
}

export default MainToTransBtn;