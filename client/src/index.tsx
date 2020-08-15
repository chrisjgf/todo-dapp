import { createWeb3ReactRoot, Web3ReactProvider } from "@web3-react/core";
import { ethers, providers } from "ethers";
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import * as serviceWorker from './serviceWorker';
import ThemeProvider, { GlobalStyle } from "./theme";

const Web3ProviderNetwork = createWeb3ReactRoot('NETWORK')

const getLibrary = (provider: providers.ExternalProvider) => {
  const library = new ethers.providers.Web3Provider(provider);
  library.pollingInterval = 8000;
  return library;
}

ReactDOM.render(
  <Web3ReactProvider getLibrary={getLibrary}>
    <Web3ProviderNetwork getLibrary={getLibrary}>
      <ThemeProvider>
        <>
          <GlobalStyle />
          <App />
        </>
      </ThemeProvider>
    </Web3ProviderNetwork>
  </Web3ReactProvider>,
  document.getElementById("root")
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
