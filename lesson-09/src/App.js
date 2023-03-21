import { useState } from "react";
import { ethers } from "ethers";

function App() {
  // let [text, setText] = useState("");
  // let [savedText, setSavedText] = useState("");
  let [connected, setConnected] = useState(false);
  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [decimals, setDecimals] = useState("");
  const [totalSupply, setTotalSupply] = useState("");

  let { ethereum } = window;
  let contract = null;

  if (ethereum) {
    let abi = [
      "function name() public view returns (string memory)",
      "function symbol() public view returns (string memory)",
      "function decimals() public view returns (uint8)",
      "function totalSupply() public view returns (uint256)",
    ];
    let address = "0xdCd721c5Fb4f2c5e70e6e0DE3804151AC1C806b9";
    let provider = new ethers.providers.Web3Provider(ethereum);
    let signer = provider.getSigner();
    contract = new ethers.Contract(address, abi, signer);
  }

  return (
    <div className="App">
      <h1>BadgerCoin Contract</h1>

      <button
        onClick={() => {
          if (contract && !connected) {
            ethereum
              .request({ method: "eth_requestAccounts" })
              .then((accounts) => {
                setConnected(true);
              });
          }
        }}
      >
        {!connected ? "Connect wallet" : "Connected"}
      </button>

      <h2>Contract Functions</h2>
      <button
        onClick={() => {
          if (contract && connected) {
            contract.name().then((contractName) => {
              setName(contractName);
            });
          }
        }}
      >
        Get name
      </button>

      <h3>{name}</h3>

      <button
        onClick={() => {
          if (contract && connected) {
            contract.symbol().then((sym) => {
              setSymbol(sym);
            });
          }
        }}
      >
        Get symbol
      </button>

      <h3>{symbol}</h3>

      <button
        onClick={() => {
          if (contract && connected) {
            contract.decimals().then((dec) => {
              setDecimals(dec);
            });
          }
        }}
      >
        Get decimals
      </button>

      <h3>{decimals}</h3>

      <button
        onClick={() => {
          if (contract && connected) {
            contract.totalSupply().then((supply) => {
              setTotalSupply(Number(supply));
            });
          }
        }}
      >
        Get totalSupply
      </button>

      <h3>{totalSupply}</h3>
    </div>
  );
}

export default App;
