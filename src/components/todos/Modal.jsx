import React from "react";
import styled from "styled-components";
import ReactDom from "react-dom";

const Modal = ({ onClose, children }) => {
  return ReactDom.createPortal(
    <>
      <BackDrop>
        <ModalContainer>
          {children}
          <>
            <Button onClick={onClose}>no</Button>
          </>
        </ModalContainer>
      </BackDrop>
    </>,
    document.getElementById("modal-block")
  );
};

export default Modal;

const BackDrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 1000;
`;

const ModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  color: #000;
  padding: 50px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const Button = styled.button`
  padding: 10px;
  border: none;
  background-color: #d91414;
`;
