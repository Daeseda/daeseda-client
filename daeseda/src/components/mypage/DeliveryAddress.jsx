import styled from "styled-components";
import Button from "../common/Button";
//배송지 관리 페이지 컴포넌트, 현재 등록된 배송지의 리스트를 볼 수 있고, 수정, 삭제, 추가 버튼이 존재함
function DeliveryAddress() {
  return (
    <DeliveryAddressLayout>
      <DeliveryAddressArticle>
        <Name>내 집</Name>
        <Address>12591 서울특별시 관악구 101동 101호</Address>
        <ButtonWrapper>
          <EditDeleteButton>수정하기</EditDeleteButton>
          <EditDeleteButton>삭제하기</EditDeleteButton>
        </ButtonWrapper>
      </DeliveryAddressArticle>

      <Button text="배송지 추가하기" size="120px" />
    </DeliveryAddressLayout>
  );
}
const DeliveryAddressLayout = styled.section`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const DeliveryAddressArticle = styled.article`
  border: 1px solid rgb(232, 234, 237);
  width: 300px;
  display: inline-block;
  padding: 12px;
  border-radius: 4px;
`;

const Name = styled.p`
  font-size: 17px;
  font-weight: 500;
`;

const Address = styled.p`
  margin: 5px 0;
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 4px;
  font-size: 15px;
`;

const EditDeleteButton = styled.button`
  border: 1px solid #111111;
  padding: 4px 8px;
  border-radius: 4px;
`;
export default DeliveryAddress;
