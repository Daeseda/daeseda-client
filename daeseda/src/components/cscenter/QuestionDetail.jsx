import styled from "styled-components";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Reply from "./Reply";
import SmallButton from "../common/SmallButton";

function QuestionDetail({ question }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const serverUrl = process.env.REACT_APP_SERVER_URL;

  const token = localStorage.getItem("token"); // 토큰

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [nickname, setNickname] = useState("")
  useEffect(() => {
    const fetchQuestionData = async () => {
      try {
        const response = await axios.get(
          `${serverUrl}/${question ? "board" : "notice"}/${id}`,
          { headers: headers }
        );
        if (question) {
          setCategory(response.data.boardCategory);
          setContent(response.data.boardContent);
          setTitle(response.data.boardTitle);
          setNickname(response.data.userNickname)
        } else {
          setCategory(response.data.noticeCategory);
          setContent(response.data.noticeContent);
          setTitle(response.data.noticeTitle);
        }

        setDate(response.data.regDate); // 날짜 설정
      } catch (error) {
        alert("데이터 불러오기에 실패하였습니다: " + error);
      }
    };

    fetchQuestionData();
  }, [id, serverUrl, headers, question]);

  function 변환날짜시간(원본날짜시간) {
    const 원본날짜 = new Date(원본날짜시간);

    const 연도 = 원본날짜.getFullYear();
    const 월 = 원본날짜.getMonth() + 1; // 월은 0부터 시작하므로 1을 더합니다.
    const 일 = 원본날짜.getDate();
    const 시간 = 원본날짜.getHours();
    const 분 = 원본날짜.getMinutes();

    const 변환된날짜시간 = `${연도}년 ${월}월 ${일}일 ${시간}시 ${분}분`;

    return 변환된날짜시간;
  }
  return (
    <Main>
      <Title>
        <p>{title}</p>
        <SmallButton text="목록으로" onClick={()=>{
          navigate("/cscenter")
        }}/>
        </Title>
      {question && 
      <Small>작성자 - {nickname}</Small>}
      <Small>작성일 - {변환날짜시간(date)}</Small>
      <Content>{content}</Content>
      {question ? <Reply /> : null}
    </Main>
  );
}
const Main = styled.div`
  gap: 4px;
  /* margin: 20px; */
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
  margin-bottom:10px;
  display:flex;
  justify-content: space-between;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid gray;
  gap: 8px;
  padding: 12px;
  margin: 10px 0;
  border-radius: 4px;
  min-height: 300px;
`;

const Small = styled.p`
  font-size: 14px;
`;

export default QuestionDetail;
