import styled from "styled-components";
function OrderDetail({ order, formatDate }) {
  return (
    <Layout>
      <Title>{order.user.userNickname}님의 주문 내역</Title>
      <Row>
        <RowTitle>주문번호</RowTitle>
        <p>{order.orderId}</p>
      </Row>
      <Row>
        <RowTitle>배송주소</RowTitle>
        <p>
          {order.address}
        </p>
      </Row>
      <Row>
        <RowTitle>수거날짜</RowTitle>
        <Half>{formatDate(order.deliveryDate)}</Half>
        <RowTitle>배송날짜</RowTitle>
        <p>{formatDate(order.pickupDate)}</p>
      </Row>
      <Row>
        <RowTitle>주문상태</RowTitle>
        <Half>
          {order.orderStatus === "ORDER"
            ? "주문 완료"
            : order.orderStatus === "CASH"
            ? "결제 대기 중"
            : order.orderStatus === "COMPLETE"
            ? "결제 완료"
            : order.orderStatus === "CANCEL"
            ? "주문 취소"
            : null}
        </Half>
        <RowTitle>주문금액</RowTitle>
        <p>{order.totalPrice.toLocaleString()}원</p>
      </Row>
      <Row>
        <RowTitle>세탁종류</RowTitle>
        <Half>{order.washingMethod}</Half>
        <RowTitle>주문자명</RowTitle>
        <p>{order.user.userName}</p>
      </Row>
    </Layout>
  );
}

const Layout = styled.section`
  display: flex;
  flex-direction: column;
  width: 500px;
  gap: 10px;
  font-size: 16px;
`;

const Title = styled.p`
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 10px;
`;

const Row = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

const RowTitle = styled.p`
  border: 1px solid rgb(232, 234, 237);
  background-color: black;
  color: white;
  padding: 4px;
  border-radius: 4px;
`;

const Half = styled.p`
  width: 200px;
`;

export default OrderDetail;
