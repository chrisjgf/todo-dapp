import React, { useState, useEffect } from "react";
import * as S from "./styles";
import { useWeb3React } from "@web3-react/core";
import { shortenAddress, ChainId } from "../../utils";
import { useModalContext, ModalType } from "../../context/ModalContext";
import { ethers } from "ethers";

interface Props {}

const { ConnectWallet } = ModalType;

const Header: React.FC<Props> = (props: Props) => {
  const { account, library, chainId } = useWeb3React();
  const [, setModalVisibility] = useModalContext();

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
  }, [account, library]);

  const handleAccountPress = () =>
    !account && setModalVisibility(ConnectWallet);

  return (
    <S.Header>
      <h2>
        <span role="img" aria-label="robot">
          🤖
        </span>{" "}
        Task Manager
      </h2>
      <S.Account active={!!account}>
        {chainId && (
          <p>
            <i>{ChainId[chainId]}</i>
          </p>
        )}
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
