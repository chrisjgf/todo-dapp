import { ethers } from "ethers";

export const buildEtherscanURL = (id: string) =>
  `https://etherscan.io/tx/${id}`;

export const shortenAddress = (address: string, digits = 4) => {
  if (!isAddress(address)) {
    throw Error(`Invalid 'address' parameter '${address}'.`);
  }
  return `${address.substring(0, digits + 2)}...${address.substring(
    42 - digits
  )}`;
};

export const isAddress = (value: string) => {
  try {
    return ethers.utils.getAddress(value.toLowerCase());
  } catch {
    return false;
  }
};

export const ChainId: { [id: number]: string } = {
  1: "MAINNET",
  3: "ROPSTEN",
  4: "RINKEBY",
  5: "GÖRLI",
  42: "KOVAN",
};
