import React from "react";
import styled from "styled-components";
import Coin from '../../assets/images/coin.png';
import Clean from '../../assets/images/clean.png';
import Time from '../../assets/images/time.png';

const BoxContainer = styled.div`
  height: 565px;
  background: linear-gradient( 45deg, #5D8DF2, #72EDF2 );
  display: flex;
`;



const Text = styled.p`
color: #ffffff;
font-size: 48px;
font-weight: 700;
left: 300px;
letter-spacing: 0;
line-height: normal;
position: absolute;
top: 180px;
`;
const Text2 = styled.p`
color: black;
font-size: 36px;
font-weight: 700;
left: 300px;
letter-spacing: 0;
line-height: normal;
position: absolute;
top: 700px;
`;

const Box = styled.div`
float: left; 
margin-right: 30px
`;
const Box1 = styled(Box)`
  width: 350px;
  height: 300px;
  border: 1px solid #D9D9D9;
  border-radius: 20px;
  text-align: center;
  padding: 30px;
`;
const Box2 = styled(Box)`
  width: 350px;
  height: 300px;
  border: 1px solid #D9D9D9;
  border-radius: 20px;
  text-align: center;
  padding: 30px;
`;
const Box3 = styled(Box)`
  width: 350px;
  height: 300px;
  border: 1px solid #D9D9D9;
  border-radius: 20px;
  text-align: center;
  padding: 30px;
`;


const Image = styled.img`
  width: 20%; // 이미지를 컨테이너에 맞추기 위해 너비 100%로 설정
  height: auto; // 이미지의 가로세로 비율 유지
  border: 50px;
  margin: auto;
  margin-top: 30px;
`;



const Button =styled.button`
  margin: 30px;
  font-size: 18px;
  color: #ffffff;
  height: 40px;
  width: 150px;
  border-radius: 10px;
  border: 1px ridge #ffffff;
  box-shadow: 1px 1px 0px 2px rgba (0,0,0,0.3);
   cursor: pointer;
 `;

 const P = styled.p`
 font-size: 19px;
 `;


const MainIndex = () => {
  return (
    <BoxContainer>
      <Text>
      대신 세탁해 드립니다
          <br />
          당신의 편리한 일상 생활을 도와드리겠습니다
          <br />
          <Button>신청하기</Button>
          <Button>이용방법</Button>
      </Text>
      <Text2>대세다를 선태해야하는 이유
        <br />
        <br />
      <Box1>신속정화
      <Image src={Coin}/>
      <br/>
      <P>신청 접수시 2시간 내 즉시 수거해드립니다
급히 세탁이 필요할 때도 신청해주세요</P>
      </Box1>
      <Box2>
        오염케어
        <Image src={Clean}/>
        <br/>
        <P>신청 접수시 2시간 내 즉시 수거해드립니다
급히 세탁이 필요할 때도 신청해주세요</P>
        </Box2>
      <Box3>합리적인 가격
      <Image src={Time}/>
      <br/>
      <P>신청 접수시 2시간 내 즉시 수거해드립니다
급히 세탁이 필요할 때도 신청해주세요</P>
      </Box3>
      </Text2>
      
    </BoxContainer>
  );
};

export default MainIndex;