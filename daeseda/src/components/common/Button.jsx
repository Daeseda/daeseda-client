// 공통적으로 사용되는 버튼 컴포넌트, props 값으로 버튼 내부에 들어갈 텍스트를 지정해주면 됨
import styled from "styled-components";

function Button({ text, size }) {
  return (
    <ButtonStyle size={size}>
      {text ? text : "props 값을 전달하세요"}
    </ButtonStyle>
  );
}

const ButtonStyle = styled.button`
  all: unset;
  background-color: rgb(93, 141, 242);
  color: white;
  font-size: 18px;
  padding: 8px 12px;
  border-radius: 4px;
  text-align: center;
  cursor: pointer;
  width: ${(props) =>
    props.size ? props.size : "auto"}; // size 프롭에 따라 너비 조정
`;

export default Button;
