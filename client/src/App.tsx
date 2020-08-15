import { Contract, ethers } from "ethers";
import React from 'react';
import './App.css';
import TaskManager from "./contracts/TaskManager.json";
import logo from './logo.svg';

const App: React.FunctionComponent = () => {

  const provider = new ethers.providers.JsonRpcProvider('http://localhost:7545');
  const signer = provider.getSigner();

  const interact = async () => {
    const contract = new Contract('0xDD31006257504A6B838aef3fA3C97ea87a07b633', TaskManager.abi, provider);
    // const tx = await contract.createTask('Test');
    const taskCountRaw = await contract.getTasksCount();
    console.warn(taskCountRaw.toNumber());
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          onClick={interact}
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
