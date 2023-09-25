// 세탁 신청하기 페이지에서 수거 예정일을 선택하는 컴포넌트
import styled from "styled-components";
function PickupDate() {
  return (
    <PickupDateLayout>
      <Title>수거 예정일을 선택하세요</Title>
      <DateLayout>
        <Date>9/10(월) 오후 11시부터</Date>
        <DateButton>변경</DateButton>
      </DateLayout>
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
`;

const DateLayout = styled.div`
  display: flex;
  gap: 10px;
  font-size: 18px;
  padding: 0 32px;
`;
const Date = styled.p``;

const DateButton = styled.button`
  font-size: 18px;
  border-bottom: 1px solid #111111;
  &:hover {
    font-weight: 500;
    border-bottom: 2px solid #111111;
  }
`;

export default PickupDate;
