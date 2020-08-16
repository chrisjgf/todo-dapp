import React, { useCallback, useState, useRef, useEffect } from "react";
import * as S from "./styles";
import { useWeb3React } from "@web3-react/core";
import { shortenAddress } from "../../utils";
import { useModalContext, ModalType } from "../../context/ModalContext";
import { ethers } from "ethers";

interface Props {}

const { ConnectWallet } = ModalType;

const Header: React.FC<Props> = (props: Props) => {
  const { account, library } = useWeb3React();
  const [_, setModalVisibility] = useModalContext();

  const [ethBalance, setEthBalance] = useState<string | undefined>();

  useEffect(() => {
    const getBalance = async () => {
      if (library && account) {
        try {
          const balance = await library.getBalance(account);
          setEthBalance(balance);
        } catch (error) {
          console.log("Error with account balance");
          setEthBalance(undefined);
        }
      }
    };
    getBalance();
  }, [account]);

  const handleAccountPress = () =>
    !account && setModalVisibility(ConnectWallet);

  return (
    <S.Header>
      <h1>🤖 Task Manager</h1>
      <S.Account active={!!account}>
        <p>
          {ethBalance &&
            `${Number(ethers.utils.formatEther(ethBalance)).toFixed(4)} ETH`}
        </p>
        <button onClick={handleAccountPress}>
          {account ? `${shortenAddress(account)}` : `Connect wallet`}
        </button>
      </S.Account>
    </S.Header>
  );
};

export default Header;
