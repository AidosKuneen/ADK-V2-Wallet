import React,{useState} from 'react';
import WalletBalance from "../WalletBalance/WalletBalance";
import LatestTransactions from "../LatestTransactions/LatestTransactions";
import {Link, useLocation} from "react-router-dom";
import './Staking.css';
import Overview from "../Overview/Overview";
import CalculatorPage from "../../../CalculatorPage/CalculatorPage";
import {anFade, anFade1s} from "../../../../animations";
import {checkLightTheme} from "../../../../lightThemeCheck";

const Staking = () => {

    const path = useLocation().pathname;
    const [fadeExit,setFadeExit] = useState('')

    return (
        <div className={`block-container ${fadeExit} ${checkLightTheme()}`}>
            <div className={`block-container menu`}>
                {checkLightTheme()?
                    <img className={`fon-wallet-bal ${anFade}`} src="./images/wallet-page/fon-wal-bb.svg" alt=""/>:
                    <img className={`fon-wallet-bal ${anFade}`} src="./images/wallet-page/waves-shd-blue.svg" alt=""/>
                }

                <WalletBalance setFadeExit={setFadeExit} path={path} />

                <div className={`body-wallet ${anFade1s}`}>
                    <Overview />
                    <CalculatorPage />
                </div>

                <LatestTransactions path={path} />
            </div>
        </div>
    );
};

export default Staking;