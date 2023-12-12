//회원정보 기입
import React from "react";
import styled from "styled-components";
import Button from "../common/Button";
import InfoRow from "../common/InfoRow";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SmallButton from "../common/SmallButton";
import WarningMessage from "../common/WarningMessage";

const Main = styled.div`
  display: flex;
  align-items:center;
  flex-direction: column;
  gap: 4px;
`;

const Title = styled.div`
  border-bottom: solid 1px rgb(232, 234, 237);
  padding: 10px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 10px;
  padding: 50px;
  width: 400px;
  border: solid 1px rgb(232, 234, 237);
`;

const Row = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;
`;

const SignupInfo = () => {
  const serverUrl = process.env.REACT_APP_SERVER_URL;
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [certificationNumber, setCertificationNumber] = useState("");
  const [certificationText, setCertificationText] = useState("인증번호전송");
  const [certificationCheckText, setCertificationCheckText] = useState("인증하기");
  // 인증번호를 입력하는 란을 보여줄지 말지를 결정하는 state, 인증번호가 전송되면 true가 되고 인증번호 입력창이 생김
  const [certificationNumberView, setCertificationNumberView] = useState(true);
  const [certificationValidation, setCertificationValidation] = useState(false); // 이메일 인증이 완료되었는지 완료되지않았는지 상태를 저장
  const signupInfo = {
    userEmail: email,
    userName: name,
    userNickname: nickname,
    userPhone: phone,
    userPassword: password,
  };
  const navigate = useNavigate();
  //비밀번호가 영문, 숫자, 특수문자를 모두 포함한 8자 이상인지 확인하는 정규식
  const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@#$%^&+=!]).{8,}$/;

  function certificationCheckHandler() {
    axios
      .post(`${serverUrl}/users/mailConfirm`, {
        userEmail: email,
        code: certificationNumber,
      })
      .then((response) => {
        if (response.status === 200) {
          setCertificationValidation(true);
          setCertificationCheckText("인증완료");
          alert("이메일 인증에 성공했습니다")
        } else {
          setCertificationValidation(false);
          setCertificationCheckText("인증실패");
        }
      })
      .catch((error) => {
        alert("인증 중 오류가 발생했습니다", error);
        console.log(error);
      });
  }

  function signupButton() {
    if (!certificationValidation) {
      alert("이메일 인증이 완료되지 않았습니다");
    } else if (!passwordRegex.test(password)) {
      alert("비밀번호는 영문, 숫자, 특수문자를 모두 포함한 8자 이상이어야 합니다.");
    } else {
      // 회원가입 요청
      axios
        .post(`${serverUrl}/users/signup`, signupInfo)
        .then(function (response) {
          navigate("/signup/success");
        })
        .catch(function (error) {
          alert(`회원가입 오류: ${error}`);
        });
    }
  }

  function emailCertificationHandler() {
    // 이메일 인증번호 전송을 진행할 시 인증번호가 전송
    axios
      .post(`${serverUrl}/users/mailAuthentication`, {
        userEmail: email,
      })
      .then(function (response) {
        setCertificationNumberView(true);
        setCertificationText("전송완료");
        alert("인증번호가 전송되었습니다");
      })
      .catch(function (error) {
        setCertificationNumberView(false);
        setCertificationText("전송실패");
        alert("인증번호 전송에 실패하였습니다");
      });
  }

  return (
    <Main>
      <Title>
        <h3>회원가입</h3>
      </Title>
      <Content>
        <Row>
          <InfoRow
            label="이메일 주소"
            type="email"
            id="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <SmallButton text={certificationText} onClick={emailCertificationHandler} />
        </Row>
        {certificationNumberView ? (
          <Row>
            <InfoRow
              label="인증번호"
              type="text"
              id="certificationNumber"
              value={certificationNumber}
              onChange={(e) => {
                setCertificationNumber(e.target.value);
              }}
            />
            <SmallButton text={certificationCheckText} onClick={certificationCheckHandler} />
          </Row>
        ) : null}
        <Row>
          <InfoRow
            label="비밀번호"
            type="password"
            id="password"
            value={password}
            placeholder="영문, 숫자, 특수문자 포함 8자 이상"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </Row>
        <InfoRow
          label="이름"
          type="text"
          id="name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <InfoRow
          label="닉네임"
          type="text"
          id="nickname"
          value={nickname}
          onChange={(e) => {
            setNickname(e.target.value);
          }}
        />
        <InfoRow
          label="휴대폰번호"
          type="tel"
          id="phone"
          value={phone}
          onChange={(e) => {
            setPhone(e.target.value);
          }}
        />
        <Button text={"가입하기"} onClick={signupButton} />
      </Content>
    </Main>
  );
};

export default SignupInfo;