import styled from "styled-components";
import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function PickupDate({ date, setDate }) {
  useEffect(() => {
    // 초기값 설정 (한 번만 실행)
    const today = new Date();
    setDate(today);
  }, []);

  // 요일을 반환하는 함수 선언식으로 정의
  function getDayOfWeek(date) {
    const daysOfWeek = [
      "일요일",
      "월요일",
      "화요일",
      "수요일",
      "목요일",
      "금요일",
      "토요일",
    ];
    return daysOfWeek[date.getDay()];
  }

  function formattedDate(date) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const dayOfWeek = getDayOfWeek(date);

    return `${year}년 ${month < 10 ? `0${month}` : month}월 ${
      day < 10 ? `0${day}` : day
    }일 ${dayOfWeek}`;
  }

  const handleDateChange = (selectedDate) => {
    setDate(selectedDate);
  };

  return (
    <PickupDateLayout>
      <Title>수거 예정일</Title>
      <DateLayout>
        <StyledDatePicker
          selected={date}
          onChange={handleDateChange}
          value={formattedDate(date)}
        />
      </DateLayout>
      <Message>변경하려면 날짜를 클릭하세요</Message>
    </PickupDateLayout>
  );
}

const PickupDateLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 330px;
  height: 100px;
  border: 1px solid #111111;
  border-radius: 4px;
  padding: 12px;
  box-sizing: border-box;
`;

const Title = styled.p`
  font-size: 20px;
  font-weight: 500;
  padding: 0 36px;
  text-align: center;
`;

const StyledDatePicker = styled(DatePicker)`
  outline: none;
  font-size: 18px;
  text-align: center;
  cursor: pointer;
  width: 300px;
`;

const DateLayout = styled.div`
  display: flex;
  gap: 10px;
  font-size: 18px;
  width: 300px;
`;

const Message = styled.div`
  width: 300px;
  font-size: 10px;
  text-align: center;
`;

export default PickupDate;
