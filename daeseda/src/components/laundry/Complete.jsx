// 세탁 신청 완료 페이지 컴포넌트
import styled from "styled-components";
import Button from "../common/Button";
import laundry from "../../assets/images/laundry.png";
function Complete() {
  return (
    <CompleteLayout>
      <Header>
        <Img src={laundry} alt="" />
        <Title>주문이 완료되었습니다</Title>
        <p>2023.09.11 주문하신 세탁의</p>
        <p>
          주문번호는<BlueBold>202309110001</BlueBold>입니다
        </p>
        <p>
          <RedBold>9/11(월) 오후 11시</RedBold>까지 세탁물을
          <RedBold>문 앞</RedBold>에 위치시켜주세요
        </p>
      </Header>
      <Main>
        <p>주문정보</p>
        <Row>
          <p>수거시간</p>
          <p>9/11(월) 오후 11시부터</p>
        </Row>
        <Row>
          <p>배송주소</p>
          <p>서울시 노원구 101동 101호</p>
        </Row>
        <Row>
          <p>수거/배송위치</p>
          <p>문 앞</p>
        </Row>
        <Row style={{ marginBottom: "20px" }}>
          <p>공동현관비밀번호</p>
          <p>1234**</p>
        </Row>
        <Button text="주문내역 확인하기" />
      </Main>
    </CompleteLayout>
  );
}
const CompleteLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 20px;
  padding: 24px 0;
  border-bottom: 1px solid rgb(232, 234, 237);
`;

const Img = styled.img`
  width: 120px;
  height: 120px;
  background-color: rgb(232, 234, 237);
  border-radius: 35%;
  padding: 12px;
`;

const Title = styled.p`
  font-size: 20px;
  font-weight: 500;
`;

const BlueBold = styled.span`
  color: rgb(93, 141, 242);
  font-weight: 500;
  margin: 0 4px;
`;

const RedBold = styled.span`
  color: rgb(253, 71, 85);
  font-weight: 500;
  margin: 0 4px;
`;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 24px 100px;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
`;

export default Complete;
