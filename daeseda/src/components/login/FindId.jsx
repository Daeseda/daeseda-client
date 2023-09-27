//아이디찾기
import React from "react";
import styled from "styled-components";
import Button from "../common/Button";
import Check from "../common/Check";

const MainDiv = styled.div`
   padding-left: 20%;
  padding-right: 20%; 
`
;
const Input = styled.input`
  width: 70%;
  outline-color: gray;
  display: inline-block
`;
const ShowCheckIndex = styled.div`
   
border: 1px solid #ccc;
  
  
`;
const Explanation = styled.div`
    border-bottom: solid 1px grey;
`;

const ShowCheckBox =styled.div`
display: flex;
  gap: 4px;
`;
const ButtonBox =styled(Button)`
`;

const FindId = () => {
    return (
        <MainDiv>
        <Explanation>
        <h3>아이디찾기</h3>
        </Explanation>
        <p>아이디 찾는 방법을 선택해주세요</p>
        <ShowCheckIndex>
    
        
        
        <ShowCheckBox>
        <Check />
        <button>등록된 전화번호로 찾기</button>
        </ShowCheckBox>
        이름
        <Input/>
        <br/>
        휴대번호
        <Input/>
        <ShowCheckBox>
        <Check />
        <button>등록된 이메일로 찾기</button>
        
        </ShowCheckBox>
        이름
        <Input/>
        <br/>
        이메일
        <Input/>        
    </ShowCheckIndex>
    <ButtonBox text={"다음"}>
        
        </ButtonBox>
        </MainDiv>
  
    );
  };
  
  export default FindId;