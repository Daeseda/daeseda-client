// 배송지 추가
import styled from "styled-components";
import InfoRow from "../common/InfoRow";

function AddDeliveryAddress() {
  return (
    <AddDeliveryAddressLayout>
      <InfoRow label="이름" type="text" id="name" />
      <InfoRow label="우편번호" type="text" id="zipcode" />
      <InfoRow label="주소" type="text" id="address" />
      <InfoRow label="상세주소" type="text" id="detailAddress" />
    </AddDeliveryAddressLayout>
  );
}
const AddDeliveryAddressLayout = styled.div`
  padding: 12px;
  border: 1px solid rgb(232, 234, 237);
  border-radius: 4px;
  display: inline-block;
  font-size: 16px;
`;
export default AddDeliveryAddress;
