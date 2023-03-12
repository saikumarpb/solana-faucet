import { Connection, PublicKey } from "@solana/web3.js";
import React, { useState } from "react";
import { DEV_NET_RPC_URL } from "./constants";

function App() {
  const [txHash, setTxHash] = useState("");
  const [publicAddress, setPublicAddress] = useState("");
  const [isValidAddress, setIsValidAddress] = useState(true);

  const validateSolanaAddress = (address: string) => {
    try {
      let publicKey = new PublicKey(address);
      let isSolana = PublicKey.isOnCurve(publicKey);
      setIsValidAddress(() => isSolana);
      return isSolana;
    } catch (error) {
      setIsValidAddress(() => false);
      return false;
    }
  };

  const requestAirdrop = async (publicKey: string) => {
    if (validateSolanaAddress(publicKey)) {
      const connection = new Connection(DEV_NET_RPC_URL);
      await connection
        .requestAirdrop(new PublicKey(publicKey), 1e9)
        .then((data) => {
          setTxHash(data);
        })
        .catch((e) => console.error(e.toString()));
    } else {
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    requestAirdrop(publicAddress);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPublicAddress(e.target.value);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input value={publicAddress} onChange={handleInputChange} />
        <button type="submit">submit</button>
      </form>
      {isValidAddress && txHash && (
        <div>
          <span>Tx hash : </span>
          {txHash}
        </div>
      )}
      {!isValidAddress && <div>Invalid wallet address</div>}
    </div>
  );
}

export default App;
