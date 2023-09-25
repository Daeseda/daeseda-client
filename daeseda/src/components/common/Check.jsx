// 일반 세탁, 툭수 세탁 등 선택할 요소에 사용할 체크박스 컴포넌트
import styled from "styled-components";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

function Check() {
  const [check, setCheck] = useState(false);

  function checkHandler() {
    setCheck(!check);
  }
  return (
    <CheckButton checked={check} onClick={checkHandler}>
      {check && <FontAwesomeIcon icon={faCheck} />}
    </CheckButton>
  );
}

const CheckButton = styled.div`
  border: 1px solid #111111;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) =>
    props.checked ? "rgb(93,141,242)" : "transparent"};
  color: ${(props) => (props.checked ? "white" : "transparent")};
  font-size: 12px;
  cursor: pointer;
`;

export default Check;
