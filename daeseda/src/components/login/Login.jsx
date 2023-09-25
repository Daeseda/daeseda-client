import React from "react";
import styled from "styled-components";
import LoginIcon from '../../assets/images/login.png';

const LoginIndex=styled.div`
 text-align: center;
`;
const Image=styled.img`
margin: auto;
margin-top: 100px;
width: 50px;
height: 50px;
`;
const LoginBox = styled.div`
background-color:  #5D8DF2;
border-radius: 35px;
height: 300px;
width: 700px;
margin: auto;
padding: 30px;
padding-top: 100px;
`;

const Input = styled.input`
  width: 50%;
  padding: 10px;
  margin-top: 10px;
  border: 1px solid #ccc;
  border-radius: 3px;
`;
const LoginButton = styled.button`
  width: 80px;
  color: black;
  background: white;
  padding: 5px 0;
  border: 1px ridge #bcbcbc;
  border-radius: 3px;
  outline: none;
`;
const Login = () => {
    return (
    <LoginIndex>
        <Image src={LoginIcon}/>
        <br />
        <h1>로그인</h1>
        <br />
        <LoginBox><Input type="text" placeholder="Username" />
      <Input type="password" placeholder="Password" />
      <br />
      <br />
      <LoginButton>Login</LoginButton>
      </LoginBox>
      <a href="" >아이디찾기</a> | <a href="" >비밀번호찾기</a> | <a href="" >회원가입</a>
    </LoginIndex>
    );
  };
  
  export default Login;