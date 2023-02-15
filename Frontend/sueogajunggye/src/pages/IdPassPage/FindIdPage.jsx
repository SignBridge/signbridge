import React, { useState } from 'react';
import './IdPassPage.css'
import LoginHeader from '../LoginPage/LoginHeader';
import { Link } from 'react-router-dom';

function FindIdPage(props) {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <div>
            <LoginHeader></LoginHeader>
            <div className='bg-container'>
                <div className='bg'></div>
                <div className='id-bg'>
                    <div className='id-form-container'>
                    <div className="id-title">아이디 찾기</div>
                        <div className='id-pass-switch'>
                            <Link to="/findId">
                                <button onClick={() => props.onFormSwitch('id')} className='find-id-btn'>아이디 찾기</button>
                            </Link>
                            <Link to="/findPass">
                                <button onClick={() => props.onFormSwitch('pass')} className='find-pass-btn'>비밀번호 찾기</button>
                            </Link>
                        </div>
                        <form className='id-form' onSubmit={handleSubmit}>
                            <input className='find-input' value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder='이름' />
                            <br />
                            <input className='find-input' value={email} onChange={(e) => setEmail(e.target.value)} type="text" placeholder='이메일' />     
                            <button className='check-btn' type='submit'>확인</button>
                        </form>
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