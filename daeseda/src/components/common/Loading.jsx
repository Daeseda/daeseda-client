// 통신 도중 Loading 창에 보여질 컴포넌트
import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const LoadingMessage = styled.p`
  font-size: 18px;
  margin-left: 10px;
`;

function Loading() {
  return (
    <LoadingContainer>
      <FontAwesomeIcon icon={faSpinner} spin size="2x" />
      <LoadingMessage>Loading...</LoadingMessage>
    </LoadingContainer>
  );
}

export default Loading;
