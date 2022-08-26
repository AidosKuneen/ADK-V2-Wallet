import React, {useEffect, useState} from 'react';
import './WalletBalance.css';
import {anFadeDown, anFadeOut} from "../../../../animations";
import {useNavigate} from "react-router-dom";
import {checkLightTheme} from "../../../../lightThemeCheck";

const WalletBalance = (props) => {

    const [blueClass,setBlueClass] = useState('')

    const [balance,setBalance] = useState(window.localStorage.getItem('totalBalance'))

    const [balanceStake,setBalanceStake] = useState(null)

    const [usdValue,setUsdValue] = useState(null)

    const [fadeDown,setFadeDown] = useState(anFadeDown)

    const navigate = useNavigate()

    const handleCloseWallet = (url) =>{
        props.setFadeExit(anFadeOut)
        setTimeout(() => navigateRoute(url),1000)
    }
    const navigateRoute = (url) =>{
        navigate(url)
    }

    useEffect(() => {

        const updateBal = () =>{
            setBalance(window.localStorage.getItem('totalBalance'))
            setTimeout(updateBal,1000)
        }
        updateBal()

        const showBalanceStake = async () =>{
            const totSt = JSON.parse(await window.walletAPI.totalStake(`"${window.localStorage.getItem('seed')}"`))
            setBalanceStake(totSt.data/10000000000000000000000)
        }
        showBalanceStake()

        const showValuesADK = async () =>{
            const values = await window.walletAPI.getAdkPrices()
            setUsdValue(values.USD)
            // console.log(values.USD)
        }
        showValuesADK()

        if (props.path === '/wallet'){
            setBlueClass('')
        }else {
            setBlueClass('blue')
        }
    },[])

    return (
        <div className={`wallet-balance ${fadeDown}`}>

            <div className={`container-top-wallet`}>
                <div className={`bal-container ${checkLightTheme()}`}>
                    {
                        blueClass === 'blue'?
                            <img src="./images/wallet-page/logoKrugBlue.svg" alt=""/>:
                            <img src="./images/wallet-page/logoKrug.svg" alt=""/>
                    }
                    {/*<img src="./images/wallet-page/lisa.svg" alt=""/>*/}
                </div>
            </div>

            <div className={`balance ${checkLightTheme()}`}>
                {
                    blueClass === 'blue'?
                        <div className={'money-container'}>
                            <h1 className={blueClass}>{balanceStake?String(balanceStake).slice(0,10):0}<span className={blueClass}>ADK</span></h1>
                            <h2 className={blueClass}>{balanceStake?String(balanceStake * usdValue).slice(0,10):0} $</h2>
                        </div>:
                        <div className={'money-container'}>
                            {
                                balance==='Load'?'':
                                    <>
                                        <h1 className={blueClass}>{String(balance).slice(0,10)}<span>ADK</span></h1>
                                        <h2 className={blueClass}>{String(balance * usdValue).slice(0,10)} $</h2>
                                    </>
                            }
                        </div>
                }
                <div className={`butt-container-wallet ${checkLightTheme()}`}>
                    {
                        blueClass === 'blue'?
                            <>
                                <button className={`border-button ${blueClass}`} onClick={() => handleCloseWallet('/wallet/stake')}>Stake</button>
                                <button className={`border-button ${blueClass}`} onClick={() => handleCloseWallet('/wallet/unstake')}>Unstake</button>
                            </>:
                            <>
                                <button className={`border-button ${blueClass}`} onClick={() => handleCloseWallet('/wallet/azSeed')}>AZ Seed</button>
                                <button className={`border-button ${blueClass}`} onClick={() => handleCloseWallet('/wallet/send')}>Send</button>
                                <button className={`border-button ${blueClass}`} onClick={() => handleCloseWallet('/wallet/receive')}>Receive</button>
                            </>
                    }
                </div>
            </div>
        </div>
    );
};

export default WalletBalance;