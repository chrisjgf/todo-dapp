import React, { useEffect, useMemo, useRef, useCallback } from "react";
import CloseIcon from "../../assets/svg/close.svg";
import { ModalType, useModalContext } from "../../context/ModalContext";
import ModalConnect from "../ModalConnect";
import * as S from "./styles";

const Modal: React.FC = (props) => {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const [modalType, setModalType] = useModalContext();
  const handleClosePress = useCallback(() => setModalType(undefined), [
    setModalType,
  ]);

  useEffect(() => {
    const handleOutsideClick = (event: any) => {
      if (!!modalRef.current?.contains(event.target)) return;
      handleClosePress();
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [modalType, handleClosePress]);

  const modalTitle = useMemo(() => {
    switch (modalType) {
      case ModalType.ConnectWallet:
        return "Connect Account";
      default:
        return "Modal";
    }
  }, [modalType]);

  const childView = useMemo(() => {
    switch (modalType) {
      case ModalType.ConnectWallet:
        return <ModalConnect />;
      default:
        return null;
    }
  }, [modalType]);

  if (!modalType) return null;

  return (
    <S.Modal>
      <S.Container ref={modalRef}>
        <S.Header>
          {modalType && <p>{modalTitle}</p>}
          <S.CloseIcon onClick={handleClosePress}>
            <img src={CloseIcon} alt={"Close"} />
          </S.CloseIcon>
        </S.Header>
        <S.Body>{childView}</S.Body>
      </S.Container>
    </S.Modal>
  );
};

export default Modal;
