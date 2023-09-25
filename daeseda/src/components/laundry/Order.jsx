// 세탁 신청서 작성 컴포넌트
import styled from "styled-components";
import Check from "../common/Check";
import truck from "../../assets/images/truck.png";
import bill from "../../assets/images/bill.png";
import change from "../../assets/images/change.png";
import Button from "../common/Button";
function Order() {
  return (
    <OrderLayout>
      <Title>주문내용</Title>
      <Row>
        <p>세탁서비스</p>
        <p>일반세탁</p>
      </Row>
      <RequestMessage type="text" placeholder="요청사항 입력하기" />
      <Title>수거/배송정보</Title>
      <Row>
        <p>수거시간</p>
        <RowRight>
          <p>9/11(월) 오후 11시부터</p>
          <Change src={change} />
        </RowRight>
      </Row>

      <Row>
        <p>배송주소</p>
        <RowRight>
          <p>서울시 노원구 101동 101호</p>
          <Change src={change} />
        </RowRight>
      </Row>

      <Row style={{ borderBottom: "1px solid #111111", paddingBottom: "20px" }}>
        <p>수거/배송위치</p>
        <RowRight>
          <p>문 앞</p>
          <Change src={change} />
        </RowRight>
      </Row>

      <Title>공동현관비밀번호</Title>
      <PasswordRow>
        <Check />
        <input
          type="text"
          placeholder="예) 1234**"
          style={{ outline: "none" }}
        />
      </PasswordRow>
      <PasswordRow
        style={{ borderBottom: "1px solid #111111", paddingBottom: "20px" }}
      >
        <Check />
        <button>비밀번호 없음</button>
      </PasswordRow>
      <Title>이용안내</Title>
      <Guide>
        <GuideImg src={truck} alt="" />
        <p>9/11(월) 오후 11시까지 세탁물을 문 앞에 위치시켜주세요</p>
        <Check />
      </Guide>
      <Guide style={{ marginBottom: "20px" }}>
        <GuideImg src={bill} alt="" />
        <p>
          세탁비는 수거 후 인수증에서 요금을 확인하신 후 7일 이내 결제해주세요
        </p>
        <Check />
      </Guide>
      <Button text="세탁 신청하기" />
    </OrderLayout>
  );
}

const OrderLayout = styled.div`
  display: flex;
  flex-direction: column;
  padding: 24px 48px;
  gap: 8px;
`;

const Title = styled.p`
  font-size: 20px;
  font-weight: 500;
  margin-top: 10px;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const RowRight = styled.div`
  display: flex;
  gap: 10px;
`;

const Change = styled.img`
  width: 24px;
  height: 24px;
  cursor: pointer;
`;

const RequestMessage = styled.input`
  padding: 12px 0;
  font-size: 18px;
  border-bottom: 1px solid #d9d9d9;
  outline: none;
`;
const PasswordRow = styled.div`
  display: flex;
  gap: 4px;
`;

const Guide = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const GuideImg = styled.img`
  width: 40px;
  height: 40px;
`;

export default Order;
