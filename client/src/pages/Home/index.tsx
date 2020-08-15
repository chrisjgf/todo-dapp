import React from "react";
import { ModalType, useModalContext } from "../../context/ModalContext";

const { ConnectWallet } = ModalType;

const Main: React.FC = () => {
  const [_, setModalVisibility] = useModalContext();

  const handlePress = () => setModalVisibility(ConnectWallet);

  return (
    <p onClick={handlePress}>Hello, world</p>
  )
};

export default Main;