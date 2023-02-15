import React, { useState, useRef } from 'react';
import LoginHeader from './LoginHeader';
import './LoginPage.css'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/user';
import axios from 'axios';

function LoginPage(props) {


  const ssafyURL = 'https://i8d204.p.ssafy.io';
  const localURL = 'http://localhost:8080'
    const navigate = useNavigate();

    const [id, setId] = useState('');
    const [pass, setPass] = useState('');

    const dispatch = useDispatch();

    const userid = useRef();
    const userpassword = useRef(); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.post(`${ssafyURL}/api/v1/users/login`,
            JSON.stringify({'userName': userid.current.value, 'password': userpassword.current.value}),
            {
              headers: {
                'header1':'header1',
                'Content-Type': 'application/json',
              },
              withCredentials: false
            }
          );
            const username = response.data.name
            const useremail = response.data.email
            const userisactive = response.data.is_active
            const usertoken = response.data.token

            dispatch(login({
              userId: {id},
              userPass: {pass},
              userName: {username},
              userEmail: {useremail},
              userIsActive: {userisactive},
              usertoken:{usertoken}
                }));


            navigate("/profile");
        } catch (err) {
            navigate("/login")
        }
      };    

    return (
      <div>
        <LoginHeader></LoginHeader>
        <div className='bg-container'>
          <div className='bg'></div>
              <div className='login-bg'>
                  <div className='login-form-container'>
                  <div className="login-title">통역사 로그인</div>
                      <form className='login-form' onSubmit={handleSubmit}>
                          <label htmlFor="id">아이디</label>
                          <input ref={userid} className='login-input-item' value={id} onChange={(e) => setId(e.target.value)} type="text" placeholder='아이디를 입력해주세요' />
                  
                          <label htmlFor="password">비밀번호</label>
                          <input ref={userpassword} className='login-input-item' value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder='비밀번호를 입력해주세요' />

                          <button className='login-btn' type='submit'>로그인</button>
                      </form>
                      <Link to="/FindId">
                          <button className='movePage'>아이디/비밀번호 찾기</button>
                      </Link>
                  </div>
              </div>
          </div>
      </div>
      );
}

export default LoginPage;