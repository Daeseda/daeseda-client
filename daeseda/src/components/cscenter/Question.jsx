import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Button from "../common/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Main = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.div`
  border-bottom: solid 1px rgb(232, 234, 237);
  padding: 10px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
`;

const Wrap2 = styled.div`
  border-bottom: 1px solid gray;
  display: flex;
  justify-content: space-between;
  padding: 4px 8px;
  cursor: pointer;
`;

const Wrap = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: #d9d9d9;
  padding: 4px 8px;
`;

const P = styled.p``;

const NoticeTitle = styled.p``;

const NoticeDate = styled.p``;

const NoticeNickname = styled.p``;

const ButtonWrap = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
`;

const Search = styled.div`
  margin: 5px;
  display: flex;
  justify-content: flex-end;
`;

const BoardRowLayout = styled.div`
  display: flex;
  align-items: center;
  gap:30px;
`;

const Question = ({ write, mypage }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("token"); // 로컬 스토리지에서 토큰을 가져옴
    if (token) {
      // 토큰이 존재하는 경우, 로그인 상태로 설정
      setIsLoggedIn(true);
    }
  }, []);
  const serverUrl = process.env.REACT_APP_SERVER_URL;
  const navigate = useNavigate();
  const [boardDummy, setBoardDummy] = useState([]);
  const [nickname, setNickname] = useState("");

  const token = localStorage.getItem("token"); // 토큰

  const headers = {
    Authorization: `Bearer ${token}`,
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${serverUrl}/board/list`, {
          headers,
        });
        const formattedData = response.data.map((board) => {
          // 날짜 변환 로직 추가
          const dateObject = new Date(board.regDate);
          const formattedDate = dateObject.toISOString().split("T")[0];

          // 변환된 날짜를 포함한 객체 반환
          return {
            ...board,
            regDate: formattedDate,
          };
        });
        setBoardDummy(formattedData);
      } catch (error) {
        alert("자유게시판 내역을 불러오는 데 실패하였습니다", error);
      }
    };

    fetchData();
  }, []);

  if (mypage) {
    axios
      .get(`${serverUrl}/users/myInfo`, { headers })
      .then(function (response) {
        setNickname(response.data.userNickname);
      })
      .catch(function (error) {
        alert("내 정보를 불러오는 데 오류가 발생하였습니다", error);
        console.log(error);
      });
  }

  const filteredBoard = boardDummy.filter(
    (board) => board.userNickname === nickname
  );
  return (
    <Main>
      <Title>
        {mypage == true ? (
          <h3>
            {nickname}님이 작성하신 글 ({filteredBoard.length})
          </h3>
        ) : (
          <h3>자유게시판</h3>
        )}
      </Title>
      <Search>
        <select
          style={{ textAlign: "center", marginRight: "5px", outline: "none" }}
        >
          <option value="">전체</option>
          <option value="배송">배송</option>
          <option value="결제">결제</option>
          <option value="로그인">로그인</option>
          <option value="주문">주문</option>
          <option value="기타">기타</option>
        </select>
        <input
          type="text"
          placeholder="Search"
          style={{ outline: "none" }}
        ></input>
        <Button text={"검색"}></Button>
      </Search>
      <Content>
        <Wrap>
          <BoardRowLayout>
            <P>구분</P>
            <NoticeTitle>제목</NoticeTitle>
          </BoardRowLayout>
          <BoardRowLayout>
            <NoticeDate>날짜</NoticeDate>
            <NoticeNickname>작성자</NoticeNickname>
          </BoardRowLayout>
        </Wrap>
        {mypage == true ? (
          filteredBoard.length === 0 ? (
            <p style={{ textAlign: "center", margin: "10px 0" }}>
              작성된 글이 없습니다
            </p>
          ) : (
            filteredBoard.map((board) => (
              <Wrap2
                key={board.boardId}
                onClick={() => {
                  navigate(`${board.boardId}`);
                }}
              >
                <BoardRowLayout>
                  <P>{board.boardCategory}</P>
                  <NoticeTitle>{board.boardTitle}</NoticeTitle>
                </BoardRowLayout>
                <BoardRowLayout>
                  <NoticeDate>{board.regDate}</NoticeDate>
                  <NoticeNickname>{board.userNickname}</NoticeNickname>
                </BoardRowLayout>
              </Wrap2>
            ))
          )
        ) : boardDummy.length === 0 ? (
          <p style={{ textAlign: "center", margin: "10px 0" }}>
            작성된 글이 없습니다
          </p>
        ) : (
          boardDummy.map((board) => (
            <Wrap2
              key={board.boardId}
              onClick={() => {
                navigate(`${board.boardId}`);
              }}
            >
              <BoardRowLayout>
                <P>{board.boardCategory}</P>
                <NoticeTitle>{board.boardTitle}</NoticeTitle>
                </BoardRowLayout>
              <BoardRowLayout>
                <NoticeDate>{board.regDate}</NoticeDate>
                <NoticeNickname>{board.userNickname}</NoticeNickname>
              </BoardRowLayout>
            </Wrap2>
          ))
        )}
      </Content>
      {write ? (
        <ButtonWrap>
          <Button
            text={"글 작성하기"}
            onClick={() => {
              if(isLoggedIn) navigate("question-write");
              else navigate("/login")
            }}
          ></Button>
        </ButtonWrap>
      ) : null}
    </Main>
  );
};

export default Question;
