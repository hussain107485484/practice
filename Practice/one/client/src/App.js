import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import abi from './Storage.json';

const contractAddress = 0x7f91b921c44751968d8d2f1cc412047c3ee11e88; // Replace with your deployed contract address

const App = () => {
  const [inputValue, setInputValue] = useState(0);
  const [storedValue, setStoredValue] = useState(0);
  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState(null);
  const [temp, settemp] = useState(false);
  useEffect(() => {
    const connectToMetamask = async () => {
      try {
        if (!window.ethereum) return;
        const web3 = new Web3(window.ethereum);
        setWeb3(web3);
        const accounts = await web3.eth.getAccounts();
        setAccounts(accounts);
        settemp(true) ;
      } catch (error) {
        console.error('Error connecting to Metamask:', error);
      }
    };

    connectToMetamask();
  }, [temp]);

  const handleInputChange = (event) => {
    setInputValue(parseInt(event.target.value));
  };

  const storeValue = async () => {
    if (!web3 || !accounts) return;
    const contract = new web3.eth.Contract(abi, contractAddress); // Replace with your contract ABI

    try {
      await contract.methods.store(inputValue).send({ from: accounts[0] });
      console.log('Value stored successfully');
    } catch (error) {
      console.error('Error storing value:', error);
    }
  };

  const retrieveValue = async () => {
    if (!web3 || !accounts) return;
    const contract = new web3.eth.Contract(abi, contractAddress); // Replace with your contract ABI

    try {
      const retrievedValue = await contract.methods.retrieve().call();
      setStoredValue(retrievedValue);
    } catch (error) {
      console.error('Error retrieving value:', error);
    }
  };

  return (
    <div className="App">
      <h1>Store & Retrieve Value</h1>
      <input type="number" value={inputValue} onChange={handleInputChange} />
      <button onClick={storeValue}>Store Value</button>
      <button onClick={retrieveValue}>Retrieve Value</button>
      {storedValue > 0 && <p>Stored Value: {storedValue}</p>}
    </div>
  );
};

export default App;
