import { InjectedConnector } from "@web3-react/injected-connector";

export type AvailableConnectors = InjectedConnector;

export const injected = new InjectedConnector({
  supportedChainIds: [3],
});
