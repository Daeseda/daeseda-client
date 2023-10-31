// 세탁 신청 완료 페이지 컴포넌트
import styled from "styled-components";
import Button from "../common/Button";
import laundry from "../../assets/images/laundry.png";
import { useNavigate } from "react-router-dom";
function Complete({ pickupDate, addressRoad, addressDetail, deliveryLocation }) {
  const navigate = useNavigate();
  return (
    <CompleteLayout>
      <Header>
        <Img src={laundry} alt="" />
        <p>{pickupDate} 주문하신 세탁의</p>
        <p>
          주문이<BlueBold>완료</BlueBold>되었습니다
        </p>
        <p>
          <RedBold>{pickupDate}</RedBold>까지 세탁물을
          <RedBold>{deliveryLocation}</RedBold>에 위치시켜주세요
        </p>
      </Header>
      <Main>
        <p>주문정보</p>
        <Row>
          <p>수거날짜</p>
          <p>{pickupDate}</p>
        </Row>
        <Row>
          <p>배송주소</p>
          <p>{addressRoad} {addressDetail}</p>
        </Row>
        <Row style={{ marginBottom: "20px" }}>
          <p>수거/배송위치</p>
          <p>{deliveryLocation}</p>
        </Row>
        <Button text="주문내역 확인하기" onClick={() => {
          navigate("/orderlist")
        }} />
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
  margin-bottom: 20px;
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
  padding: 24px 15%;
    @media (max-width: 768px) {
        padding-left:10px;
        padding-right:10px;
  }
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
`;

export default Complete;
