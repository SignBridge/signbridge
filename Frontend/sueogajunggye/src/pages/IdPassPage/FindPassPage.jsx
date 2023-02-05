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
            <div className='btn-bg'>
            <TransToMainBtn></TransToMainBtn>
            </div>
            <div className='pass-bg'>
                <div className='pass-form-container'>
                <div className="pass-title">아이디 º 비밀번호 찾기</div>
                    <div>
                        <Link to="/findId">
                            <button onClick={() => props.onFormSwitch('id')} className='find-id-btn'>아이디 찾기</button>
                        </Link>
                        <Link to="/findPass">
                            <button onClick={() => props.onFormSwitch('pass')} className='find-pass-btn'>비밀번호 찾기</button>
                        </Link>
                    </div>
                    <form className='pass-form' onSubmit={handleSubmit}>
                        <label htmlFor="pass">비밀번호 찾기</label>
                        <input className='find-input' value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder='이름' />
                        <br />
                        <input className='find-input' value={email} onChange={(e) => setEmail(e.target.value)} type="text" placeholder='아이디' />
                               
                        <button className='check-btn' type='submit'>확인</button>

                    </form>
                    <Link to="/login">
                        <button className='movePage'>로그인 하기</button>
                    </Link>
                </div>
            </div>
        </div>
        

      );
}

export default FindIdPage;