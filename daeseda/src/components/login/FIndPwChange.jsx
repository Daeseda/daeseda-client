import React from "react";
import styled from "styled-components";
import Button from "../common/Button";
import Header from "../common/Header";
import Lock from "../../assets/images/lock.png";

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
width: 10%;
  
  display: inline-block
`;
const ButtonBox =styled(Button)`
`;

const FindPwChange = () => {
    return (
        <MainDiv>
        <Header></Header>
        <ShowIdIndex>
    
        <Explanation>
        <h3>비밀번호찾기</h3>
        </Explanation>
        <IdBox>
        <p>인증이 완료됐습니다. 새로 사용하실 비밀번호를 입력해주세요.</p>
        
        <ShowIdBox>
        <Image src={Lock} alt=""/>
        <Input type="password" placeholder="비밀번호" />
        </ShowIdBox>
        
        </IdBox>
        <ButtonBox text={"변경하기"}>
        
        </ButtonBox>
    </ShowIdIndex>
        </MainDiv>
  
    );
  };
  
  export default FindPwChange;