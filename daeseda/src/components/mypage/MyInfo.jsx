//내 정보에서 조회 및 수정이 가능하도록 구현한 컴포넌트
import styled from "styled-components";
import InfoRow from "../common/InfoRow";
function MyInfo() {
  return (
    <MyInfoLayout>
      <InfoRow label="이름" type="text" id="name" />
      <InfoRow label="닉네임" type="text" id="nickname" />
      <InfoRow label="휴대폰 번호" type="tel" id="phone" />
      <InfoRow label="인증번호" type="text" id="certification" />
      <InfoRow label="이메일 주소" type="email" id="email" />
      <InfoRow label="인증번호" type="text" id="certification" />
    </MyInfoLayout>
  );
}

const MyInfoLayout = styled.div`
  padding: 12px;
  border: 1px solid rgb(232, 234, 237);
  border-radius: 4px;
  display: inline-block;
  font-size: 16px;
`;

export default MyInfo;
