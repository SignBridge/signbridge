import React, { useState } from 'react';
import TransToMainBtn from '../../components/Buttons/TransToMain'
import './IdPassPage.css'
import { Link } from 'react-router-dom';

function FindIdPage(props) {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(name);
    }


    return (
        <div className='bg'>
            <div className='find-top-items'>
                <TransToMainBtn></TransToMainBtn>
            </div>
            <div className='id-bg'>
                <div className='id-form-container'>
                <div className="id-title">수어가중계</div>
                    <div className='select-id-pass'>
                    </div>
                    <form className='id-form' onSubmit={handleSubmit}>
                        <label htmlFor="id">아이디찾기</label>
                        <input className='find-input' value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder='이름' />
                        <br />
                        <input className='find-input' value={email} onChange={(e) => setEmail(e.target.value)} type="text" placeholder='계정' />
                               
                        <button className='check-btn' type='submit'>확인</button>

                    </form>
                    <div className='find-bottom-items'>
                        <Link to="/findPass">
                            <button className='find-pass-btn'>비밀번호 찾기</button>
                        </Link>
                        <Link to="/login">
                            <button className='movePage'>로그인 하기</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
        

      );
}

export default FindIdPage;