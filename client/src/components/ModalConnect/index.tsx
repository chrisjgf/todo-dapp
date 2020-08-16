import { useWeb3React } from "@web3-react/core";
import React from "react";
import MetaMaskIcon from "../../assets/metamask.png";
import { AvailableConnectors, injected } from "../../connectors";
import { useModalContext } from "../../context/ModalContext";
import * as S from "./styles";

const ModalConnect: React.FC = () => {
  const { activate } = useWeb3React();
  const [, setModalType] = useModalContext();

  const activateConnector = (connector: AvailableConnectors) => {
    activate(connector);
    setModalType(undefined);
  };

  const connectors = [
    {
      title: "Metamask",
      image: MetaMaskIcon,
      onClick: () => activateConnector(injected),
      id: "connector-0",
    },
  ];

  return (
    <S.ModalConnect>
      {connectors.map(({ title, image, onClick, id }) => (
        <S.Button key={id} style={{ cursor: "pointer" }} onClick={onClick}>
          <img src={image} alt={title} />
          <p>{title}</p>
        </S.Button>
      ))}
    </S.ModalConnect>
  );
};

export default ModalConnect;
