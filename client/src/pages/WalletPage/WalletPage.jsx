import React, {useState} from 'react';
import './WalletPage.css';
import LatestTransactions from "./components/LatestTransactions/LatestTransactions";
import WalletBalance from "./components/WalletBalance/WalletBalance";
import {useLocation} from "react-router-dom";

const WalletPage = () => {

    const path = useLocation().pathname;
    console.log(path,'PATHHHH')

    const [fadeExit,setFadeExit] = useState('')

    return (
        <div className={`wallet-page ${fadeExit}`}>
            <div className={`block-container`}>
                <WalletBalance setFadeExit={setFadeExit} />

                <LatestTransactions />
            </div>
        </div>
    );
};

export default WalletPage;