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

const Search = styled.div`
  margin: 5px;
  display: flex;
  justify-content: flex-end;
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

const BoardRowLayout = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
`;

const Notice = () => {
  const serverUrl = process.env.REACT_APP_SERVER_URL;
  const navigate = useNavigate();
  const [noticeDummy, setNoticeDummy] = useState([]);

  const token = localStorage.getItem("token"); // 토큰

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${serverUrl}/notice/list`, {
          headers,
        });
        const formattedData = response.data.map((notice) => {
          // 날짜 변환 로직 추가
          const dateObject = new Date(notice.regDate);
          const formattedDate = dateObject.toISOString().split("T")[0];

          // 변환된 날짜를 포함한 객체 반환
          return {
            ...notice,
            regDate: formattedDate,
          };
        });
        setNoticeDummy(formattedData);
      } catch (error) {
        alert("공지사항 내역을 불러오는 데 실패하였습니다", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Main>
      <Title>
        <h3>공지사항</h3>
      </Title>
      <Search>
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
          </BoardRowLayout>
        </Wrap>
        {noticeDummy
          .filter((notice) => notice.noticeCategory === "공지사항")
          .map((notice) => (
            <Wrap2
              key={notice.noticeId}
              onClick={() => {
                navigate(`notice/${notice.noticeId}`);
              }}
            >
              <BoardRowLayout>
                <P>{notice.noticeCategory}</P>
                <NoticeTitle>{notice.noticeTitle}</NoticeTitle>
              </BoardRowLayout>
              <BoardRowLayout>
                <NoticeDate>{notice.regDate}</NoticeDate>
              </BoardRowLayout>
            </Wrap2>
          ))}
      </Content>
    </Main>
  );
};

export default Notice;
