import React from "react";
import styled from "styled-components";
import Button from "../common/Button";
import Check from "../../assets/images/check.png";
import { useNavigate } from "react-router-dom";

const MainDiv = styled.div`
  padding: 0 20px;
`;
const Input = styled.input`
  width: 70%;
  padding: 10px;
  display: inline-block;
`;
const ShowIdIndex = styled.div`
  padding-left: 20%;
  padding-right: 20%;
  text-align: center;
`;
const Explanation = styled.div`
  border-bottom: solid 1px rgb(232,234,237);
  padding:10px;
`;
const IdBox = styled.div``;
const ShowIdBox = styled.div`
  margin: 50px;
  display: inline-block;
  border-radius: 3px;
`;
const Image = styled.img`
  display: inline-block;
`;
const ButtonBox = styled(Button)``;

const QuestionWriteSuccess = () => {
  const navigate = useNavigate();
  return (
    <MainDiv>
      <Explanation>
        <h3>자유게시판</h3>
      </Explanation>

      <ShowIdIndex>
        <IdBox>
          <ShowIdBox>
            <p>글 작성이 완료됐습니다</p>
            <Image src={Check} alt="" />
          </ShowIdBox>
        </IdBox>
        <ButtonBox
          text={"목록으로"}
          onClick={() => {
            navigate("/cscenter");
          }}
        ></ButtonBox>
      </ShowIdIndex>
    </MainDiv>
  );
};

export default QuestionWriteSuccess;
