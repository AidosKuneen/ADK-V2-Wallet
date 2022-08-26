import React, {useEffect, useState} from 'react';
import './NavbarLeft.css';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import {anFadeLeft, anFadeLeftOut} from "../../animations";
import {checkLightTheme} from "../../lightThemeCheck";
import {getBalance} from "../../getBalance";
import {getStackedBalance} from "../../getStackedBalance";
import {Spinner} from "react-bootstrap";

const NavbarLeft = () => {

    const navigate = useNavigate();
    const path = useLocation().pathname;

    const [totalBal,setTotalBal] = useState(window.localStorage.getItem('totalBalance'))
    const [totalStake,setTotalStake] = useState(window.localStorage.getItem('totalStake'))
    const [stakedAllow,setStakedAllow] = useState([null])

    const [fadeStakeDiv,setFadeStakeDiv] = useState(1)

    useEffect(() =>{

        //slider state balance
        const sliderState = (value) =>{
            setFadeStakeDiv(value)
            setTimeout(() => sliderState(value===3?1:value + 1),3000)
        }
        sliderState(fadeStakeDiv)

        //update balance
        const checkBal = async () => {
            const newBal = await getBalance()
            setTotalBal(newBal)
            window.localStorage.setItem('totalBalance',newBal)
            setTimeout(checkBal,5000)
        }
        checkBal()

        //state balance (last updates)
        const getStBal = async () =>{
            const adress = window.localStorage.getItem('adress')
            let data = await getStackedBalance()
            let dataNums = String(data.data[adress])
            let arrNums = dataNums.split(';')
            setStakedAllow([arrNums[1],arrNums[2]])
            setTimeout(getStBal,5000)
        }
        getStBal()

        //total stake
        const getTotalStake = async () =>{
            await setTotalStake(window.localStorage.getItem('totalStake'))
            const totSt = JSON.parse(await window.walletAPI.totalStake(`"${window.localStorage.getItem('seed')}"`))
            await setTotalStake(totSt.data/10000000000000000000000)
            window.localStorage.setItem('totalStake',totSt.data/10000000000000000000000)
            setTimeout(getTotalStake,5000)
        }
        getTotalStake()
    },[])

    return (
        <>
        {path.startsWith('/wallet')?
        <nav className={`navbar-left ${anFadeLeft} ${checkLightTheme()}`}>
            <header>
                <div className="logo">
                    <img width={30} className={'ai-logo'} src="./images/navbar-left/logo.svg" alt=""/>
                    <p>Aidos Kuneen</p>
                </div>


                <div className={`nav-bal-stack ${checkLightTheme()}`}>
                    <div>
                        <p>Total balance</p>
                        <h5 className={`green`}>
                            {
                                totalBal==='Load'?
                                    <Spinner
                                        variant={checkLightTheme()?"dark":"light"}
                                        as="span"
                                        animation="grow"
                                        size="sm"
                                        role="status"
                                        aria-hidden="true"
                                    />:totalBal?totalBal:0
                            }
                        </h5>
                    </div>
                    {checkLightTheme()?'':<hr />}
                    <div className={`stake-container`}>
                        <div className={`stake-div ${fadeStakeDiv!==1?'opac':''}`}>
                            <p>Total staked</p>
                            <h5>{totalStake?String(totalStake).slice(0,10):0}</h5>
                        </div>

                        <div className={`stake-div ${fadeStakeDiv!==2?'opac':''}`}>
                            <p>Current Mielstone</p>
                            <h5>{stakedAllow[1]?stakedAllow[1]:0}</h5>
                        </div>

                        <div className={`stake-div ${fadeStakeDiv!==3?'opac':''}`}>
                            <p>Locked Till</p>
                            <h5>{stakedAllow[0]?stakedAllow[0]:0}</h5>
                        </div>
                    </div>
                </div>


                <div className="menu">
                    <Link id={'link-two'}  to={`/wallet`} className={path==='/wallet' || path==='/wallet/send' || path==='/wallet/receive' || path==='/wallet/azSeed'?'active':''}>
                        {checkLightTheme()?
                            <img src="./images/navbar-left/black-icons/credit-card.svg" alt=""/>:
                            <img src="./images/navbar-left/credit-card.svg" alt=""/>
                        }
                        Wallet
                    </Link>
                    <Link  to={`/wallet/staking`} className={path==='/wallet/staking' || path==='/wallet/stake' || path==='/wallet/unstake' ?'active':''}>
                        {checkLightTheme()?
                            <img src="./images/navbar-left/black-icons/briefcase.svg" alt=""/>:
                            <img src="./images/navbar-left/briefcase.svg" alt=""/>
                        }
                        Staking
                    </Link>

                    {/*<Link to={`/wallet/fileForm`} className={path==='/wallet/fileForm'?'active':''}>*/}
                    {/*    {checkLightTheme()?*/}
                    {/*        <img src="./images/navbar-left/black-icons/edit-3.svg" alt=""/>:*/}
                    {/*        <img src="./images/navbar-left/edit-3.svg" alt=""/>*/}
                    {/*    }*/}
                    {/*    Support*/}
                    {/*</Link>*/}

                    {/*<Link to={`/wallet/FAQ`} className={path==='/wallet/FAQ' || path==='/wallet/form'?'active':''}>*/}
                    {/*    {checkLightTheme()?*/}
                    {/*        <img src="./images/navbar-left/black-icons/support.svg" alt=""/>:*/}
                    {/*        <img src="./images/navbar-left/support.svg" alt=""/>*/}
                    {/*    }*/}
                    {/*    Support*/}
                    {/*</Link>*/}
                </div>
            </header>

            <footer>
                <Link className={path==='/wallet/settings'?'active':''} to={`/wallet/settings`}>
                    {checkLightTheme()?
                        <img src="./images/navbar-left/black-icons/settings.svg" alt=""/>:
                        <img src="./images/navbar-left/settings.svg" alt=""/>
                    }
                    Settings
                </Link>


                <div className={`logout-but-cont`}>
                    <hr className={checkLightTheme()}/>
                    <Link className={path==='/'?'active':''} to={`/`}>
                        {checkLightTheme()?
                            <img src="./images/navbar-left/black-icons/log-out.svg" alt=""/>:
                            <img src="./images/navbar-left/log-out.svg" alt=""/>
                        }
                        Log out
                    </Link>
                </div>
            </footer>

        </nav> :''}</>
    );
};

export default NavbarLeft;