import React from "react";
import styled from "styled-components";
import Button from "../common/Button";
import Header from "../common/Header";
import User from "../../assets/images/user.png";

const MainDiv = styled.div`
    
`
;
const Input = styled.input`
  width: 70%;
  padding: 10px;
  display: inline-block
`;
const ShowIdIndex = styled.div`
    padding-left: 20%;
  padding-right: 20%;
  
  
`;
const Explanation = styled.div`
    border-bottom: solid 1px grey;
`;
const IdBox = styled.div`
    
`;
const ShowIdBox =styled.div`
    margin: 50px;
    display: inline-block;
    border: 1px solid #ccc;
  border-radius: 3px;
`;
const Image =styled.img`
width: 5%; // 이미지를 컨테이너에 맞추기 위해 너비 100%로 설정
  
  display: inline-block
`;
const ButtonBox =styled(Button)`
`;

const FindPw = () => {
    return (
        <MainDiv>
        <Header></Header>
        <ShowIdIndex>
    
        <Explanation>
        <h3>비밀번호찾기</h3>
        </Explanation>
        <IdBox>
        <p>먼저 사용중인 아이디를 입력해주세요</p>
        
        <ShowIdBox>
        <Image src={User} alt=""/>
        <Input type="text" placeholder="Username" />
        </ShowIdBox>
        
        </IdBox>
        <ButtonBox text={"다음"}>
        
        </ButtonBox>
    </ShowIdIndex>
        </MainDiv>
  
    );
  };
  
  export default FindPw;