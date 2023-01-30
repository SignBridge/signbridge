import React, { useState } from 'react';
import TransToMainBtn from '../../components/Buttons/TransToMain'
import './LoginPage.css'

function LoginPage(props) {

    const [id, setId] = useState('');
    const [pass, setPass] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(id);
    }

    return (
        <div className='bg'>
            <div className='btn-bg'>
            <TransToMainBtn></TransToMainBtn>
            </div>
            <div className='login-bg'>
                <div className='login-form-container'>
                <div className="login-title">수어가중계</div>
                    <form className='login-form' onSubmit={handleSubmit}>
                        <label htmlFor="id">아이디</label>
                        <input value={id} onChange={(e) => setId(e.target.value)} type="text" placeholder='아이디를 입력해주세요' />
                
                        <label htmlFor="password">비밀번호</label>
                        <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder='비밀번호를 입력해주세요' />
                
                        <button className='login-btn' type='submit'>로그인</button>

                    </form>
                    <button onClick={() => props.onFormSwitch('idpass')} className='movePage'>아이디/비밀번호 찾기</button>
                </div>
            </div>
        </div>
        

      );
}

export default LoginPage;