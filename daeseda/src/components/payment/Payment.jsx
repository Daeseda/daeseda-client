//결제를 나타내는 컴포넌트
import styled from "styled-components";
import Check from "../common/Check";
import Button from "../common/Button";
const paymentTypes = ["카드결제", "계좌이체", "카카오페이", "네이버페이"];
const laundryItems = [
  {
    name: "와이셔츠",
    trait: "목 뒤 얼룩제거",
    price: 3000,
  },
  {
    name: "코트",
    trait: "특징이 없네요",
    price: 15500,
  },
  // 다른 세탁물 아이템들을 추가할 수 있습니다.
];

function Payment() {
  // 세탁물 아이템 가격의 합계 계산
  const totalPrice = laundryItems.reduce(
    (total, item) => total + item.price,
    0
  );

  return (
    <PaymentLayout>
      <Title>결제</Title>
      <SubTitle>나의 세탁물({laundryItems.length}개)</SubTitle>
      <LaundryItems>
        {laundryItems.map((item, index) => (
          <LaundryItem key={index}>
            <div>
              <p>{item.name}</p>
              <Trait>{item.trait}</Trait>
            </div>
            <Price>{item.price.toLocaleString()}원</Price>
          </LaundryItem>
        ))}
      </LaundryItems>
      <p>결제 수단</p>
      <PaymentTypes>
        {paymentTypes.map((type, index) => (
          <PaymentType key={index}>
            <Check />
            <p>{type}</p>
          </PaymentType>
        ))}
      </PaymentTypes>
      <Button text={`${totalPrice.toLocaleString()}원 결제하기`} size="200px" />
    </PaymentLayout>
  );
}

const PaymentLayout = styled.main`
  display: flex;
  flex-direction: column;
  margin: 12px 24px;
  gap: 10px;
`;

const Title = styled.p`
  font-size: 20px;
  font-weight: 500;
`;

const SubTitle = styled.p`
  font-size: 18px;
  padding-bottom: 10px;
  border-bottom: 1px solid rgb(232, 234, 237);
`;

const LaundryItems = styled.section`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-bottom: 10px;
  border-bottom: 1px solid rgb(232, 234, 237);
`;

const LaundryItem = styled.article`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Trait = styled.p`
  font-size: 12px;
`;

const Price = styled.p`
  font-size: 20px;
  font-weight: 500;
`;

const PaymentTypes = styled.section`
  display: flex;
  gap: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid rgb(232, 234, 237);
  margin-bottom: 10px;
`;

const PaymentType = styled.article`
  display: flex;
  gap: 4px;
`;

export default Payment;
