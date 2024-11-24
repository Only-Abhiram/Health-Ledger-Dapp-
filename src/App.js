import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ethers } from 'ethers';
import Header from './header';
import AuthorizeProvider from './AuthorizeProvider';
import FetchPatientRecords from './FetchPatientRecords';
import AddPatientRecords from './AddPatientRecords';
import './App.css';
import shield from './shield.jpg';
import search from './search.jpg';
import file from './file.jpg';
const App = () => {
    const [contract, setContract] = useState(null);
    const [account, setAccount] = useState(null);
    const [isOwner, setIsOwner] = useState(false);

    const contractAddress = "0x7aa6744455c111592584e5e7f6f193f6c6635495";
    const contractABI = [
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "patientID",
                    "type": "uint256"
                },
                {
                    "internalType": "string",
                    "name": "patientName",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "email",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "mobile",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "diagnosis",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "treatment",
                    "type": "string"
                }
            ],
            "name": "addRecord",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "provider",
                    "type": "address"
                }
            ],
            "name": "authorizedProvider",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "inputs": [],
            "name": "getOwner",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "patientID",
                    "type": "uint256"
                }
            ],
            "name": "getPatientRecords",
            "outputs": [
                {
                    "components": [
                        {
                            "internalType": "uint256",
                            "name": "recordID",
                            "type": "uint256"
                        },
                        {
                            "internalType": "string",
                            "name": "patientName",
                            "type": "string"
                        },
                        {
                            "internalType": "string",
                            "name": "email",
                            "type": "string"
                        },
                        {
                            "internalType": "string",
                            "name": "mobile",
                            "type": "string"
                        },
                        {
                            "internalType": "string",
                            "name": "diagnosis",
                            "type": "string"
                        },
                        {
                            "internalType": "string",
                            "name": "treatment",
                            "type": "string"
                        },
                        {
                            "internalType": "uint256",
                            "name": "timestamp",
                            "type": "uint256"
                        }
                    ],
                    "internalType": "struct HealthcareRecords.Record[]",
                    "name": "",
                    "type": "tuple[]"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ];

    useEffect(() => {
        const connectWallet = async () => {
          if (!window.ethereum) {
            alert("Please install Metamask to use this DApp");
            return;
          }
          try {
              const provider = new ethers.providers.Web3Provider(window.ethereum);
              await provider.send('eth_requestAccounts', []);
              const signer = provider.getSigner();
              const accountAddress = await signer.getAddress();
              setAccount(accountAddress);
              const contract = new ethers.Contract(contractAddress, contractABI, signer);
              setContract(contract);

              const ownerAddress = await contract.getOwner();

              setIsOwner(ownerAddress.toLowerCase() === accountAddress.toLowerCase());

          } catch (error) {
              console.error("Error connecting to the wallet : " + error);
          }
        };
        connectWallet();
    }, []);

    return (
        <Router>
            <Header account={account} isOwner={isOwner} />
            <nav className='navlist'>
                <Link to="/" className='navlist-item'>Authorize Provider <img className='shield' src={shield}/></Link>
                <Link to="/fetch-records" className='navlist-item'>Fetch Patient Records <img className='shield' src={search}/></Link>
                <Link to="/add-records" className='navlist-item'>Add Patient Records <img className='shield' src={file}/></Link>
            </nav>
            <Routes>
                <Route path="/" element={<AuthorizeProvider contract={contract} isOwner={isOwner} />} />
                <Route path="/fetch-records" element={<FetchPatientRecords contract={contract} />} />
                <Route path="/add-records" element={<AddPatientRecords contract={contract} />} />
            </Routes>
            <div className='rectangle-box footer'><p><h4>About Us</h4>
                We are Zephyrus, a team dedicated to developing innovative solutions like our healthcare records DApp. Leveraging blockchain technology, we aim to revolutionize healthcare with secure, transparent, and user-empowered data management.</p>
                <p><h4>Copyright Notice</h4>
                    © 2024 Team Zephyrus. All Rights Reserved.
                    Unauthorized reproduction or distribution of this application, its content, or features is strictly prohibited.
                    For inquiries or licensing, contact: teamzephyrus@gmail.com</p>
            </div>
        </Router>
    );
};

export default App;
