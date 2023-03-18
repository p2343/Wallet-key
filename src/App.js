import React, { useState } from "react";
import "./App.css";
import { ethers } from "ethers";
import TronWeb from "tronweb";
import { Keypair } from "@solana/web3.js";
import { saveAs } from "file-saver";

function App() {
  const [numKeys, setNumKeys] = useState(10);
  const [blockchain, setBlockchain] = useState("ethereum");
  const [keys, setKeys] = useState([]);

  const generateKeys = async () => {
    let keysArr = [];
    switch (blockchain) {
      case "ethereum":
        for (let i = 0; i < numKeys; i++) {
          const wallet = ethers.Wallet.createRandom();
          const keyPair = {
            privateKey: wallet.privateKey,
            address: wallet.address,
            // mnemonic: bip39.generateMnemonic(),
          };
          keysArr.push(keyPair);
        }
        //correct
        break;

      case "tron":
        const tronWeb = new TronWeb({
          fullHost: "https://api.trongrid.io",
        });
        for (let i = 0; i < numKeys; i++) {
          const { privateKey } = await tronWeb.createAccount();
          const address = tronWeb.address.fromPrivateKey(privateKey);
          const keyPair = {
            privateKey,
            address,
            //  mnemonic: bip39.generateMnemonic(),
          };
          //correct
          keysArr.push(keyPair);
        }
        break;

      case "polygon":
        for (let i = 0; i < numKeys; i++) {
          const wallet = ethers.Wallet.createRandom();
          const keyPair = {
            privateKey: wallet.privateKey,
            address: wallet.address,
            // mnemonic: bip39.generateMnemonic(),
            //correct
          };
          keysArr.push(keyPair);
        }
        break;

      case "binance":
        const { ethers } = require("ethers");

        for (let i = 0; i < numKeys; i++) {
          const wallet = ethers.Wallet.createRandom();
          const keyPair = {
            privateKey: wallet.privateKey,
            address: wallet.address,
          };
          keysArr.push(keyPair);
        }

        console.log(keysArr);

      default:
        console.log("Invalid blockchain selected");
        break;
    }
    setKeys(keysArr);
  };

  const downloadKeys = () => {
    const csv = [
      ["Private Key", "Public Address"],
      ...keys.map((key) => [key.privateKey, key.address]),
    ]
      .map((row) => row.join(","))
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, `${blockchain}_keys.csv`);
  };

  return (
    <>
      <div>
        <label>Number of keys to generate:</label>
        <input
          type="number"
          min="1"
          max="100"
          value={numKeys}
          onChange={(e) => setNumKeys(e.target.value)}
        />
      </div>

      <div>
        <label>Select blockchain:</label>
        <select
          value={blockchain}
          onChange={(e) => setBlockchain(e.target.value)}
        >
          <option value="ethereum">Ethereum</option>
          <option value="tron">Tron</option>
          {/* <option value="bitcoin">Bitcoin</option> */}
          <option value="polygon">Polygon</option>
          <option value="binance">Binance</option>
        </select>
      </div>
      <div>
        <button onClick={generateKeys}>Generate Keys</button>
      </div>

      <div className="csvfile">
        {keys.length > 0 && (
          <>
            <button onClick={downloadKeys}>Download Keys</button>
            {keys.map((key, index) => (
              <div className="csvfile" key={index}>
                <p>
                  Private key {index + 1}: {key.privateKey}
                </p>
                <p>
                  Public address {index + 1}: {key.address}
                </p>
              </div>
            ))}
          </>
        )}
      </div>
    </>
  );
}

export default App;
