import React, { useState } from 'react';

const AuthorizeProvider = ({ contract, isOwner }) => {
    const [providerAddress, setProviderAddress] = useState("");

    const authorizeProvider = async () => {
        if (isOwner) {
            try {
                if (providerAddress !== "") {
                    const tx = await contract.authorizedProvider(providerAddress);
                    await tx.wait();
                    alert(`Provider Address: ${providerAddress} is authorized`);
                } else {
                    alert("Provider Address is required");
                }
            } catch (error) {
                alert(error.reason);
            }
        } else {
            alert("Only Contract OWNER can authorize providers");
        }
    };

    return (
        <div className='rectangle-box'>
            <h2>Authorize Healthcare Provider</h2>
            <input
                type='text'
                placeholder='Enter Provider Address'
                value={providerAddress}
                onChange={(e) => setProviderAddress(e.target.value)}
            />
            <button onClick={authorizeProvider}>Authorize Provider</button>
        </div>
    );
};

export default AuthorizeProvider;
