import React from 'react';
import medsymbol from './medsymbol.jpg';

const Header = ({ account, isOwner }) => {
    return (
        <div className='header'>
            <h1>
                <img className='medsymbol' src={medsymbol} alt="Health Symbol" />
                Health Ledger
            </h1>
            {account && <p className='connected'>Connected To: {account}</p>}
            {isOwner ? (
                <p className='ownerclass'>Owner Mode <span className='green'></span></p>
            ) : (
                <p className='ownerclass'>You are not the owner<span className='red'></span></p>
            )}
        </div>
    );
};

export default Header;
