import React, { useState } from 'react';
import styled from "styled-components";
import Review from "../review/Review"
import Coin from "../../assets/images/coin.png";
import Clean from "../../assets/images/clean.png";
import Time from "../../assets/images/time.png";
import { useNavigate } from "react-router-dom";

const BoxContainer = styled.div`
  display: flex;
  height: 565px;
  background: linear-gradient(45deg, #5d8df2, #72edf2);
  flex-direction: column;
 align-items: center;
  @media (max-width: 768px) {
    height: 250px;
  }
`;
const Background = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 100px;
  @media (max-width: 768px) {
  margin-top: 15px;
  }
  
`;

const Text = styled.p`
  color: #ffffff;
  font-size: 48px;
  margin: 20px;
  font-size: 48px;
  font-weight: 700;
  @media (max-width: 768px) {
    text-align: center; /* 화면이 작아질 때 가운데 정렬 */
    font-size: 20px;
  }
`;

const ButtonWrap = styled.div`
  display: flex;
  
  @media (max-width: 768px) {
    justify-content: center;
  }
`;
const Content = styled.div`

display: flex;
flex-wrap: wrap;
justify-content: center;

`;
const ContentWrap = styled.div`
  
  display: flex;
  flex-direction: column;
  margin-top: 150px;
  @media (max-width: 768px) {
    text-align: center; /* 화면이 작아질 때 가운데 정렬 */
    margin-top: 50px;
  }
`;

const Text2 = styled.p`
color: black;
  font-size: 36px;
  font-weight: 700;
  text-align:center;
  margin-top:20px;
`;

const Box = styled.div`
  float: left;
  margin-right: 30px;
`;
const Box1 = styled(Box)` width: 350px;
height: 250px;
border: 1px solid #d9d9d9;
border-radius: 20px;
width: 250px;
text-align: center;
padding:50px;
margin:10px;
`;

const Image = styled.img`
  width: 20%; // 이미지를 컨테이너에 맞추기 위해 너비 100%로 설정
  height: auto; // 이미지의 가로세로 비율 유지
  border: 50px;
  margin: auto;
  margin-top: 30px;
`;

const Button = styled.button`
  margin: 30px;
  font-size: 18px;
  color: #ffffff;
  height: 40px;
  width: 150px;
  border-radius: 10px;
  border: 1px ridge #ffffff;
  box-shadow: 1px 1px 0px 2px rgba (0, 0, 0, 0.3);
  cursor: pointer;
  @media (max-width: 768px) {
    margin: 10px;
  }
  
`;

const P = styled.p`
  font-size: 18px;
`;

const ReviewWrap = styled.div`
  display: flex;
  flex-direction: column;
`;




const Index = () => {
  const navigate = useNavigate();
  return (
    <BoxContainer>
    <Background>
      <Text>대신세탁해드립니다</Text>
      <Text>당신의 편리한 일상 생활을 도와드리겠습니다</Text>
      <ButtonWrap>
      <Button onClick={() => navigate("laundry")} >신청하기</Button>
        <Button>이용방법</Button>
      </ButtonWrap>
      
    </Background>
    <ContentWrap>
    <Text2>
        대세다를 선택해야하는 이유
      </Text2>
     <Content>
     
      <Box1>
        <h2>
        신속정확
        </h2>
          
          <Image src={Coin} />
          <br />
          <P>
            신청 접수시 2시간 내 즉시 수거해드립니다 급히 세탁이 필요할 때도
            신청해주세요
          </P>
        </Box1>
     <Box1>
     <h2>
        오염케어
        </h2>
          <Image src={Clean} />
          <br />
          <P>
          얼룩진 옷 때문에 걱정 많으셨죠?
          <br />
          완벽히 요염 제거를 해드리겠습니다
          </P>
        </Box1>
      <Box1>
      <h2>
      합리적인 가격
        </h2>
          
          <Image src={Time} />
          <br />
          <P>
          
          옵션에 따라 별도 추가 요금 없이
          가격표 가격 그대로 이용할 수 있습니다
          </P>
        </Box1>
        </Content>
    </ContentWrap>
    <ReviewWrap>
    <Text2>
      이용후기
      </Text2>
      <Content>
        <Review/>
      </Content>
    </ReviewWrap>
    </BoxContainer>
  );
};

export default Index;
