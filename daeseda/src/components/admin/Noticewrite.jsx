import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Button from "../common/Button";
import { useNavigate } from "react-router";
import axios from "axios";

const Main = styled.div`
`;

const Title = styled.div`
  border-bottom: solid 1px grey;
  padding: 10px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid gray;
  gap: 8px;
  padding: 12px;
  margin: 10px 0;
  border-radius: 4px;
`;

const ButtonWrap = styled.div`
  display: flex;
  gap: 4px;
  justify-content: center;
`;

const Button2 = styled.button`
  border: 1px solid gray;
  border-radius: 4px;
  color: gray;
  font-size: 18px;
  padding: 8px 12px;
  text-align: center;
`;

const SubTitle = styled.div``;

const CheckWrap = styled.div`
  display: flex;
  gap: 10px;
`;

const Noticewrite = () => {
  const serverUrl = process.env.REACT_APP_SERVER_URL;
  const navigate = useNavigate();
  const questionCategorys = ["공지사항"];
  const [category, setCategory] = useState("공지사항");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const token = localStorage.getItem("token"); // 토큰

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  function categoryChangeHandler(e) {
    setCategory(e.target.value);
  }

  function titleChangeHandler(e) {
    setTitle(e.target.value);
  }

  function contentChangeHandler(e) {
    setContent(e.target.value);
  }

  function questionWriteHandler() {
    if (title === "" || content === "") {
      alert("제목과 내용을 입력해주세요");
    } else {
      axios
        .post(
          `${serverUrl}/notice/register`,
          {
            noticeCategory: category,
            noticeTitle: title,
            noticeContent: content,
          },
          { headers }
        )
        .then(function (response) {
          navigate("/cscenter");
        })
        .catch(function (error) {
          alert("글 작성에 실패하였습니다", error);
        });
    }
  }

  return (
    <Main>
      <Title>
        <h3>공지사항</h3>
      </Title>
      <Content>
        <SubTitle>
          <select
            style={{ textAlign: "center", marginRight: "5px", outline: "none" }}
            onChange={categoryChangeHandler}
            value={category}
          >
            {questionCategorys.map((questionCategory) => (
              <option key={questionCategory} value={questionCategory}>
                {questionCategory}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="제목"
            style={{ outline: "none" }}
            onChange={titleChangeHandler}
            value={title}
          ></input>
        </SubTitle>
        <textarea
          placeholder="내용을 입력해주세요"
          style={{ outline: "none", height: "200px", padding: "10px" }}
          onChange={contentChangeHandler}
          value={content}
        ></textarea>
      </Content>
      <ButtonWrap>
        <Button text={"작성하기"} onClick={questionWriteHandler}></Button>
        <Button2
          onClick={() => {
            navigate("/cscenter");
          }}
        >
          취소하기
        </Button2>
      </ButtonWrap>
    </Main>
    );
}

export default Noticewrite;