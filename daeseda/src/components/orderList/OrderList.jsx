//주문 내역을 조회하는 컴포넌트(취소하기, 결제하기 페이지, 기사정보 모달, 리뷰작성 모달로 이동 가능)
import { useState } from "react";
import styled from "styled-components";
import Modal from "../common/Modal";
import DeliveryDriver from "./DeliveryDriver";
import ReviewWrite from "./ReviewWrite";
function OrderList() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const lists = [
    ["202309110001", "2023.09.11", "일반세탁", "25,000", "배송중"],
    ["202309110002", "2023.09.11", "특수세탁", "17,000", "배송완료"],
  ];

  return (
    <OrderListLayout>
      <Title>주문내역</Title>
      <Table>
        <Header>
          <Number>주문번호</Number>
          <Date>주문날짜</Date>
          <Service>세탁서비스</Service>
          <Price>금액</Price>
          <Status>주문상태</Status>
        </Header>
        {lists.map((list, index) => (
          <List key={index}>
            <Number>{list[0]}</Number>
            <Date>{list[1]}</Date>
            <Service>{list[2]}</Service>
            <Price>{list[3]}</Price>
            <Status>{list[4]}</Status>
            <StatusButton onClick={openModal}>취소하기</StatusButton>
            <Modal isOpen={isModalOpen} onClose={closeModal}>
              {/* <DeliveryDriver/> */}
              <ReviewWrite/>
            </Modal>
          </List>
        ))}
      </Table>
    </OrderListLayout>
  );
}

const OrderListLayout = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 24px;
`;

const Title = styled.p`
  font-size: 20px;
  font-weight: 500;
  margin: 20px 0;
`;

const Table = styled.section`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Header = styled.header`
  display: flex;
  font-size: 18px;
  font-weight: 500;
  border-bottom: 1px solid rgb(232, 234, 237);
  padding-bottom: 10px;
  margin-bottom: 10px;
`;

const List = styled.article`
  display: flex;
  font-size: 18px;
`;

const Number = styled.p`
  width: 200px;
  text-align: center;
`;

const Date = styled.p`
  width: 150px;
  text-align: center;
`;

const Service = styled.p`
  width: 150px;
  text-align: center;
`;

const Price = styled.p`
  width: 150px;
  text-align: center;
`;

const Status = styled.p`
  width: 150px;
  text-align: center;
`;

const StatusButton = styled.button`
  text-align: center;
  font-size: 18px;
  border-bottom: 1px solid rgb(253, 71, 85);
  color: rgb(253, 71, 85);
  box-sizing: border-box;
`;

export default OrderList;
