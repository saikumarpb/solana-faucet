import { Connection, PublicKey } from "@solana/web3.js";
import React, { useState } from "react";
import { DEV_NET_RPC_URL, TEST_NET_RPC_URL } from './constants';
import './App.css';
import { Form, Modal } from 'react-bootstrap';
import SolanaLogo from 'jsx:./assets/solana.svg';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type RPC = 'devnet' | 'testnet';
function App() {
  const [txHash, setTxHash] = useState('');
  const [publicAddress, setPublicAddress] = useState('');
  const [isValidAddress, setIsValidAddress] = useState(true);
  const [showSuccessModal, setShowsuccessModal] = useState(false);
  const [rpc, setRpc] = useState<RPC>('devnet');

  /**
   * Validates the address provided
   * @param address solana public wallet address
   */
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

  const requestAirdrop = async (publicKey: string, net: RPC) => {
    if (validateSolanaAddress(publicKey)) {
      const connection = new Connection(
        net === 'devnet' ? DEV_NET_RPC_URL : TEST_NET_RPC_URL
      );
      await connection
        .requestAirdrop(new PublicKey(publicKey), 1e9)
        .then((data) => {
          setTxHash(data);
          setShowsuccessModal(true);
        })
        .catch((e) =>
          toast.error('Something went wrong from solana, Airdrop failed.', {
            toastId: 'error',
            position: 'bottom-right',
          })
        );
    } else {
    }
  };

  const handleSubmit = (net: RPC) => {
    setRpc(net);
    requestAirdrop(publicAddress, rpc);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPublicAddress(e.target.value);
    setIsValidAddress(true);
  };

  const renderSuccessModal = () => (
    <Modal
      show={showSuccessModal}
      onHide={() => setShowsuccessModal(!showSuccessModal)}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Successful airdrop!
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="d-flex flex-column">
        <div>
          <p>Successfully airdropped 1 SOL to {publicAddress}</p>
        </div>
        <a
          target="_blank"
          href={`https://explorer.solana.com/tx/${txHash}?cluster=${rpc}`}
        >
          View transaction on solana explorer
        </a>
      </Modal.Body>
      <Modal.Footer>
        <button
          onClick={() => setShowsuccessModal(!showSuccessModal)}
          type="button"
          className="submit-btn"
        >
          Go back to SOL faucet
        </button>
      </Modal.Footer>
    </Modal>
  );

  return (
    <div className="app p-4">
      <div className="d-flex flex-column justify-content-center body">
        <div className="pb-5">
          <SolanaLogo height="40px" width="270px" />
        </div>

        <h2 className="text-white pb-4">SOL Faucet</h2>
        <h3 className="sub-heading pb-4">Get your airdrop</h3>
        <Form className="form">
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              placeholder="Enter Solana account address"
              value={publicAddress}
              onChange={handleInputChange}
            />
          </Form.Group>
          {!isValidAddress && (
            <div className="mb-3 text-light border rounded border-danger text-center">
              Invalid wallet address
            </div>
          )}

          <div className="d-flex justify-content-center gap-4 py-4">
            <button
              type="button"
              className="submit-btn px-2 py-1"
              onClick={() => handleSubmit('devnet')}
            >
              Devnet
            </button>
            <button
              type="button"
              className="submit-btn px-2 py-1"
              onClick={() => handleSubmit('testnet')}
            >
              Testnet
            </button>
          </div>
          <p className="text-white pb-4 text-center">
            With the click of a button, fund your SOL testnet or devnet wallet
          </p>
        </Form>
        {renderSuccessModal()}
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
