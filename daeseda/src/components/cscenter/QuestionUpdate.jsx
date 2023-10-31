import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Button from "../common/Button";
import { useNavigate, useParams } from "react-router-dom"; // useParams 추가
import axios from "axios";
import SmallButton from "../common/SmallButton";

const Main = styled.div`
  margin-top:50px;
padding-left: 15%;
  padding-right: 15%;
    @media (max-width: 768px) {
        padding-left:10px;
        padding-right:10px;
  }
  
`;

const Title = styled.div`
  border-bottom: solid 1px grey;
  padding: 10px;
  display:flex;
  justify-content:space-between;
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

const QuestionUpdate = () => {
  const serverUrl = process.env.REACT_APP_SERVER_URL;
  const navigate = useNavigate();
  const { id } = useParams(); // useParams로 id 받아옴

  const questionCategorys = ["전체", "배송", "결제", "로그인", "주문", "기타"];
  const [category, setCategory] = useState("전체");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const token = localStorage.getItem("token"); // 토큰

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  useEffect(() => {
    axios
      .get(`${serverUrl}/board/${id}`, { headers })
      .then(function (response) {
        setCategory(response.data.boardCategory);
        setTitle(response.data.boardTitle);
        setContent(response.data.boardContent);
      })
      .catch(function (error) {
        alert("문의 조회에 실패하였습니다", error);
      });
  }, [id]); // id가 변경될 때마다 데이터를 다시 불러옴

  function categoryChangeHandler(e) {
    setCategory(e.target.value);
  }

  function titleChangeHandler(e) {
    setTitle(e.target.value);
  }

  function contentChangeHandler(e) {
    setContent(e.target.value);
  }

  function questionUpdateHandler() {
    if (title === "" || content === "") {
      alert("제목과 내용을 입력해주세요");
    } else {
      axios
        .put(
          `${serverUrl}/board/${id}`,
          {
            boardId: id,
            boardCategory: category,
            boardTitle: title,
            boardContent: content,
          },
          { headers }
        )
        .then(function (response) {
          navigate("/myinfo");
        })
        .catch(function (error) {
          alert("문의 수정에 실패하였습니다", error);
        });
    }
  }

  function questionDeleteHandler() {
    axios
      .delete(`${serverUrl}/board/${id}`, { headers })
      .then(function () {
        alert("문의가 삭제되었습니다");
        navigate("/myinfo"); // 삭제 후 myinfo 페이지로 이동
      })
      .catch(function (error) {
        alert("문의 삭제 중에 오류가 발생했습니다", error);
      });
  }

  return (
    <Main>
      <Title>
        <h3>자유게시판</h3>
        <SmallButton onClick={()=>{navigate("/myinfo")}} text="목록으로"/>
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
        <Button text={"수정하기"} onClick={questionUpdateHandler}></Button>

        <Button2 onClick={questionDeleteHandler}>삭제하기</Button2>
      </ButtonWrap>
    </Main>
  );
};

export default QuestionUpdate;
