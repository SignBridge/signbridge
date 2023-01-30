import React, { useState } from 'react';
import TransToMainBtn from '../../components/Buttons/TransToMain'
import './IdPassPage.css'

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
            <div className='id-bg'>
                <div className='id-form-container'>
                <div className="id-title">아이디 º 비밀번호 찾기</div>
                    <div>
                        <button onClick={() => props.onFormSwitch('id')} className='find-id-btn'>아이디 찾기</button>
                        <button onClick={() => props.onFormSwitch('pass')} className='find-pass-btn'>비밀번호 찾기</button>
                    </div>
                    <form className='id-form' onSubmit={handleSubmit}>
                        <label htmlFor="id">아이디찾기</label>
                        <input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder='이름' />
                        <br />
                        <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" placeholder='계정' />
                               
                        <button className='check-btn' type='submit'>확인</button>

                    </form>
                    <button onClick={() => props.onFormSwitch('login')} className='movePage'>로그인 하기</button>
                </div>
            </div>
        </div>
        

      );
}

export default FindIdPage;