import React, { useState } from "react";
import styled from "styled-components";
import LoginIcon from "../../assets/images/login.png";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import WarningMessage from "../common/WarningMessage";

const LoginIndex = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const Image = styled.img`
  margin: auto;
  width: 50px;
  height: 50px;
`;
const LoginBox = styled.div`
  background-color: #5d8df2;
  border-radius: 35px;
  height: 150px;
  width: 400px;
  margin: 10px auto;
  padding: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const Input = styled.input`
  width: 50%;
  padding: 10px;
  border: 1px solid rgb(232, 234, 237);
  border-radius: 3px;
`;
const LoginButton = styled.button`
  width: 150px;
  color: black;
  background: white;
  padding: 5px 0;
  border: 1px ridge rgb(232, 234, 237);
  border-radius: 3px;
  outline: none;
  /* margin-top: 20px; */
`;

const BottomButton = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;
`;

const Login = () => {
  const serverUrl = process.env.REACT_APP_SERVER_URL;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //로그인 실패나 이메일, 비밀번호를 입력하지 않고 로그인을 시도할 시 경고문을 표시, View는 표시할지 말지를 지정, Text는 어떤 경고문을 표시할지 지정
  const [warningMessageView, setWarningMessageView] = useState(false);
  const [warningMessageText, setWarningMessageText] = useState("");
  const navigate = useNavigate();
  function emailChangeHandler(e) {
    setEmail(e.target.value);
  }
  function passwordChangeHandler(e) {
    setPassword(e.target.value);
  }
  const loginInfo = {
    userEmail: email,
    userPassword: password,
  };
  function loginHandler() {
    if (email === "") {
      setWarningMessageView(true);
      setWarningMessageText("이메일을 입력하세요");
    } else if (password === "") {
      setWarningMessageView(true);
      setWarningMessageText("비밀번호를 입력하세요");
    } else {
      axios
        .post(`${serverUrl}/users/authenticate`, loginInfo, {
          withCredentials: true,
        })
        .then(function (response) {
          navigate("/");
          localStorage.setItem("token", response.data.token); //token 이라는 이름으로 token값을 localStorage에 저장
        })
        .catch(function (error) {
          setWarningMessageView(true);
          setWarningMessageText("로그인에 실패하였습니다");
        });
    }
  }
  return (
    <LoginIndex>
      <Image src={LoginIcon} />
      <h1>로그인</h1>
      <LoginBox>
        <Input
          type="text"
          placeholder="아이디"
          onChange={emailChangeHandler}
          value={email}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              loginHandler();
            }
          }}
        />
        <Input
          type="password"
          placeholder="비밀번호"
          onChange={passwordChangeHandler}
          value={password}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              loginHandler();
            }
          }}
        />

        {warningMessageView ? (
          <WarningMessage text={warningMessageText} />
        ) : null}
        <LoginButton onClick={loginHandler}>로그인</LoginButton>
      </LoginBox>
      <BottomButton>
        <Link to="">아이디찾기</Link>
        <Link to="">비밀번호찾기</Link>
        <Link to="/signup">회원가입</Link>
      </BottomButton>
    </LoginIndex>
  );
};

export default Login;
