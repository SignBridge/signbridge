import React, { useState } from "react";
import './MyPage.css'
import TransToMain from "../../components/Buttons/TransToMain"
import Back from "../../components/Buttons/Back"
import profileBasicImg from "../../assets/images/profileBasicImg.png"

function MyPage(props) {

    const [file, setFile] = useState(profileBasicImg);
    function handleChange(e) {
        console.log(e.target.files);
        setFile(URL.createObjectURL(e.target.files[0]));
    }

    return (
        <div>
            <div className="mypage-top-items">
                <Back></Back>
                <div className="mypage-title">마이페이지</div>
                <TransToMain></TransToMain>
            </div>
            <div className="mypage-bottom-items">
                <div className="mypage-profile">
                    <button className="profile-btn">
                        <img className="profile-img" src={file} />
                    </button>
                    <input type="file" onChange={handleChange} />
                </div>
                <div className="mypage-accounts">
                    <label>
                        이름 <input type="text" />
                    </label>
                    <label>
                        아이디 <input type="text" />
                    </label>
                    <label>
                        이메일 <input type="text" />
                        <button className="change">변경</button>
                    </label>
                    <label>
                        비밀번호 <input type="text" />
                        <button className="change">변경</button>
                    </label>
                </div>
            </div>
        </div>
    )
}

export default MyPage;