import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import UserGuide1 from "../../assets/images/userguide1.png"
import UserGuide2 from "../../assets/images/userguide2.png"
import UserGuide3 from "../../assets/images/userguide3.png"
import UserGuide4 from "../../assets/images/userguide4.png"
import Button from '../common/Button';
import { useNavigate } from "react-router-dom";

const Main = styled.div`
    display: flex;
    flex-direction: column;
    padding-bottom:50px;
    padding-left: 15%;
    padding-right: 15%;
    @media (max-width: 768px) {
        padding-left:10px;
        padding-right:10px;
  }
`;
const Title = styled.div`
  border-bottom: solid 1px rgb(232, 234, 237);
  padding: 10px;
`;
const Image = styled.img`
    margin-bottom: 20px;
`;
const Content = styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;
    border-bottom: solid 1px rgb(232, 234, 237);
    padding: 10px;
`;
function UserGuide() {
    useEffect(() => {
        const token = localStorage.getItem("token"); // 로컬 스토리지에서 토큰을 가져옴
        if (token) {
            // 토큰이 존재하는 경우, 로그인 상태로 설정
            setIsLoggedIn(true);
        }
        else {
            setIsLoggedIn(false);
        }
    }, []);
    const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태
    const navigate = useNavigate();
    return (
        <Main>
            <Title>
                <h3>이용방법</h3>
            </Title>
            <br />
            <Content>
                <Image src={UserGuide1} />
                <h3>STEP 1</h3>
                <h5>로그인 후 신청하기를 눌러주세요</h5>
            </Content>
            <Content>
                <Image src={UserGuide2} />
                <h3>STEP 2</h3>
                <h5>일반 세탁과 특수 세탁중 하나를 정해주세요</h5>
            </Content>

            <Content>
                <Image src={UserGuide3} />
                <h3>STEP 3</h3>
                <h5>번호에 따라 진행해주세요</h5>

            </Content>

            <Content>
                <Image src={UserGuide4} />
                <h3>STEP 4</h3>
                <h5>주문내역에서 결제를 진행해주세요</h5>
            </Content>
            {isLoggedIn ? (
                <Button onClick={() => navigate("/laundry")} text="신청하기"/>
              ) : (
                <Button onClick={() => navigate("/login")} text="신청하기"/>
              )}
        </Main>
    );
}

export default UserGuide;