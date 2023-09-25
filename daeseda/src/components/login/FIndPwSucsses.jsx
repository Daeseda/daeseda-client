import React from "react";
import styled from "styled-components";
import Button from "../common/Button";
import Check from "../../assets/images/check.png";

const MainDiv = styled.div`
   padding-left: 20%;
  padding-right: 20%; 
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
  text-align: center;
  
`;
const Explanation = styled.div`
    border-bottom: solid 1px grey;
`;
const IdBox = styled.div`
    
`;
const ShowIdBox =styled.div`
    margin: 50px;
    display: inline-block;
  border-radius: 3px;
`;
const Image =styled.img`
  
  display: inline-block
`;
const ButtonBox =styled(Button)`
`;

const FindPwSucsses = () => {
    return (
        <MainDiv>
        <Explanation>
        <h3>비밀번호찾기</h3>
        </Explanation>
        
        <ShowIdIndex>
    
        
        <IdBox>
        
        <ShowIdBox>
        <p>비밀번호 변경이 완료됐습니다</p>
        <Image src={Check} alt=""/>
        </ShowIdBox>
        
        </IdBox>
        <ButtonBox text={"로그인하기"}>
        
        </ButtonBox>
    </ShowIdIndex>
        </MainDiv>
  
    );
  };
  
  export default FindPwSucsses;