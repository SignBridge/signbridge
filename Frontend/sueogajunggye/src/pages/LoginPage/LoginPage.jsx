import React, { useState, useRef } from 'react';
import TransToMainBtn from '../../components/Buttons/TransToMain'
import './LoginPage.css'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
// 8. useDispatch 훅 사용
import { useDispatch } from 'react-redux';
import { login } from '../../redux/user';
import axios from 'axios';

function LoginPage(props) {
    // link 대신 navigate 사용하기
    const navigate = useNavigate();

    // id, pass 입력을 받는 변수
    const [id, setId] = useState('');
    const [pass, setPass] = useState('');

    // 9. action을 보낼 수 있도록 dispatch 함수정의
    const dispatch = useDispatch();

    // axios 요청으로 회원의 id, pass를 받을 변수
    const userid = useRef();
    const userpassword = useRef(); 


    // login을 위한 axios 요청
    const handleSubmit = async (e) => {
        console.log('axios 요청보내기')
        e.preventDefault();
        try {
          const response = await axios.post("http://localhost:8090/api/v1/users/login",
            JSON.stringify({'userName': userid.current.value, 'password': userpassword.current.value}),
            {
              headers: {
                'header1':'header1',
                'Content-Type': 'application/json',
              },
              withCredentials: false
            }
          );
            console.log(response)
            // reponse 응답으로 받은 유저의 정보 저장
            const username = response.data.name
            const useremail = response.data.email
            const userisactive = response.data.is_active
            console.log(username)

            // 10. value 값을 넣어 함수호출
            dispatch(login({userId: {id}, userPass: {pass}, userName: {username}, userEmail: {useremail}, userIsActive: {userisactive}}));


            // 로그인 성공 후 profile로 이동
            navigate("/profile");
        } catch (err) {
          console.log(err)
            // 에러 나면 로그인 창 새로고침 돼야함..
            navigate("/login")
        }
      };    

    return (
        <div className='bg'>
            <div className='login-top-items'>
                <TransToMainBtn></TransToMainBtn>
            </div>
            <div className='login-bg'>
                <div className='login-form-container'>
                <div className="login-title">수어가중계</div>
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
        

      );
}

export default LoginPage;