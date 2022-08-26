import React, {useEffect, useState} from 'react';
import {Route, Routes, useLocation, useNavigate} from "react-router-dom";
import AuthorizationPage from "./pages/AuthorizationPage/AuthorizationPage";
import NavbarLeft from "./general-components/NavbarLeft/NavbarLeft";
import CreateWalletPage from "./pages/CreateWalletPage/CreateWalletPage";
import ShowSeedPage from "./pages/ShowSeedPage/ShowSeedPage";
import ConfirmPassword from "./pages/ConfimPassword/ConfimPassword";
import WalletPage from "./pages/WalletPage/WalletPage";
import Send from "./pages/WalletPage/components/Send/Send";
import Receive from "./pages/WalletPage/components/Receive/Receive";
import RecoverSeed from "./pages/RecoverSeed/RecoverSeed";
import CreatePassword from "./pages/CreatePassword/CreatePassword";
import Staking from "./pages/WalletPage/components/Staking/Staking";
import AboutUsPage from "./pages/AboutUsPage/AboutUsPage";
import FAQpage from "./pages/FAQpage/FAQpage";
import FormHelp from "./pages/FAQpage/components/FormHelp/FormHelp";
import Settings from "./pages/Settings/Settings";
import LoadPage from "./general-components/LoadPage/LoadPage";
import { useIdleTimer } from 'react-idle-timer'
import WalletSuccess from "./pages/WalletSuccess/WalletSuccess";
import FileForm from "./pages/AboutUsPage/components/FileForm/FileForm";
import MetaMaskPass from "./pages/MetaMaskPass/MetaMaskPass";


const Router = () => {

    const path = useLocation().pathname;
    const navigate = useNavigate()

    //timer or check inaction user
    const handleOnIdle = () => {
        navigate('/loadPage')
    }
    const [lsSecur] = useState(Number(window.localStorage.getItem('security')));
    const { getRemainingTime, getLastActiveTime } = useIdleTimer({
        timeout: 1000 * 60 * (lsSecur?Number(lsSecur):15),
        onIdle: handleOnIdle,
        debounce: 200
    })

    useEffect(() => {
        //secure
        const getSecure = () =>{
            const lsNow = window.localStorage.getItem('security')
            if (lsNow === null){
                window.localStorage.setItem('security',15)
            }
        }
        getSecure()

        //hints
        const getHints = () =>{
            const lsNow = window.localStorage.getItem('hints')
            if (lsNow === null){
                window.localStorage.setItem('hints',true)
            }
        }
        getHints()

        //receive addresses
        const checkAdrs = () =>{
            if (!window.localStorage.getItem('adrsRec')){
                window.localStorage.setItem('adrsRec',1)
            }
        }
        checkAdrs()
    },[])

    return (
        <>
            {path==='/'?'':<NavbarLeft />}
            <Routes>
                <Route path='/' element={ <AuthorizationPage /> } />
                <Route path='/createWallet' element={ <CreateWalletPage /> } />
                <Route path='/showSeed' element={ <ShowSeedPage /> } />
                <Route path='/confirmPass' element={ <ConfirmPassword /> } />
                <Route path='/recoverSeed' element={ <RecoverSeed /> } />
                <Route path='/createPass' element={ <CreatePassword /> } />
                <Route path='/mmPass' element={ <MetaMaskPass /> } />
                <Route path='/wallet' element={ <WalletPage /> } />
                <Route path='/wallet/send' element={ <Send /> } />
                <Route path='/wallet/receive' element={ <Receive /> } />
                <Route path='/wallet/staking' element={ <Staking /> } />
                <Route path='/wallet/stake' element={ <Send blue={'blue'} /> } />
                <Route path='/wallet/unstake' element={ <Send blue={'blue'} /> } />
                <Route path='/wallet/azSeed' element={ <Send /> } />
                {/*<Route path='/wallet/aboutUs' element={ <AboutUsPage /> } />*/}
                <Route path='/connectMM/confirmPassword' element={ <ConfirmPassword path={'mm'} /> } />
                {/*<Route path='/wallet/FAQ' element={ <FAQpage /> } />*/}
                {/*<Route path='/wallet/form' element={ <FormHelp /> } />*/}
                <Route path='/wallet/settings' element={ <Settings /> } />
                <Route path='/loadPage' element={ <LoadPage /> } />
                <Route path='/localWalletSuccess' element={ <WalletSuccess /> } />
                <Route path='/wallet/fileForm' element={ <FileForm /> } />
            </Routes>
        </>
    );
};

export default Router;