//택배 기사의 정보를 조회하는 컴포넌트
import styled from "styled-components";
function DeliveryDriver() {
  return (
    <DeliveryDriverLayout>
      <Title>기사정보</Title>
      <Row>
        <Label>지점명</Label>
        <Value>대세다</Value>
      </Row>
      <Row>
        <Label>지점연락처</Label>
        <Value>02-000-1234</Value>
      </Row>
      <Row>
        <Label>배송기사</Label>
        <Value>홍길동</Value>
      </Row>
      <Row>
        <Label>기사연락처</Label>
        <Value>010-1234-5678</Value>
      </Row>
    </DeliveryDriverLayout>
  );
}

const DeliveryDriverLayout = styled.section`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 400px;
`;
const Title = styled.p`
  font-size: 18px;
  font-weight: 500;
`;
const Row = styled.div`
  height: 40px;
  display: flex;
  gap: 5px;
  align-items: center;
  font-size: 16px;
`;

const Label = styled.div`
  width: 100px;
  border: 1px solid #111111;
  border-radius: 5px;
  text-align: center;
  padding:5px 0;
`;

const Value = styled.div`
`;
export default DeliveryDriver;
