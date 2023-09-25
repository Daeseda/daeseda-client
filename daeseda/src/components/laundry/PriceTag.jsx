// 세탁 신청 페이지에서 세탁 상품 가격을 나타내는 가격표 컴포넌트
import styled from "styled-components";
function PriceTag() {
  const prices = {
    "일반 세탁": "333원(L당)",
    "와이셔츠, 일반셔츠": "2,200원",
    바지: "5,300원",
    "니트, 스웨터": "5,800원",
    티셔츠: "4,500원",
    이불: "13,800원",
    코트: "14,800원",
    패딩: "17,800원",
  };

  return (
    <PriceTagLayout>
      <Title>인기 품목 가격표</Title>
      {Object.entries(prices).map(([itemName, itemPrice]) => (
        <PriceRow key={itemName}>
          <p>{itemName}</p>
          <p>{itemPrice}</p>
        </PriceRow>
      ))}
      <Message>정확한 가격은 수거 후 책정됩니다</Message>
    </PriceTagLayout>
  );
}
const PriceTagLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 330px;
  border: 1px solid #111111;
  border-radius: 4px;
  padding: 12px;
  box-sizing: border-box;
`;

const Title = styled.p`
  font-size: 20px;
  font-weight: 500;
`;

const PriceRow = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #d9d9d9;
  padding-bottom: 4px;
`;

const Message = styled.p`
  color: rgb(93, 141, 242);
  font-weight: 500;
  margin: 4px 0;
`;

export default PriceTag;
