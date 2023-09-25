import React, { useState } from "react";
import styled from "styled-components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

function Modal({ isOpen, onClose, children }) {
  if (!isOpen) {
    return null; // 모달이 열리지 않으면 null을 반환하여 렌더링하지 않습니다.
  }

  return (
    <ModalWrapper>
      <ModalContent>
        {children}
        <Close>
          <FontAwesomeIcon
            icon={faX}
            onClick={onClose}
            style={{
              backgroundColor: "rgb(232,234,237)",
              padding: "8px 12px",
              borderRadius: "50%",
            }}
          />
        </Close>
      </ModalContent>
    </ModalWrapper>
  );
}

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* 반투명한 배경 */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999; /* 모달을 다른 요소 위에 표시하기 위한 z-index 설정 */
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
`;

const Close = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
  cursor: pointer;
`;
export default Modal;
