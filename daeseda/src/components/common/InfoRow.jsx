// 내 정보에 사용되는 행 컴포넌트
import styled from "styled-components";
function InfoRow({ label, type, id }) {
  return (
    <Row>
      <Label htmlFor={id}>{label}</Label>
      <Value type={type} id={id} />
      {id === "phone" || id === "email" ? (
        <SmallButton>인증번호 받기</SmallButton>
      ) : null}
      {id === "certification" ? <SmallButton>확인</SmallButton> : null}
      {id === "zipcode" ? <SmallButton>우편번호 찾기</SmallButton> : null}
    </Row>
  );
}

const Row = styled.div`
  display: flex;
  gap: 5px;
  margin-bottom: 10px;
`;

const Label = styled.label`
  width: 90px;
`;

const Value = styled.input`
  border-bottom: 1px solid rgb(232, 234, 237);
  outline: none;
`;

const SmallButton = styled.button`
  background-color: rgb(93, 141, 242);
  color: white;
  font-weight: 500;
  padding: 0 8px;
  border-radius: 4px;
`;

export default InfoRow;
