import React,{useState} from 'react';
import {useNavigate} from "react-router-dom";
import { anFadeLeftOut, anFadeOut, anFadeRight, anFadeSlow} from "../../animations";
import './WalletSuccess.css';
import {checkLightTheme} from "../../lightThemeCheck";

const WalletSuccess = (props) => {

    const navigate = useNavigate()

    const [fadeSlow,setFadeSlow] = useState(anFadeSlow)
    const [fadeLeft,setFadeLeft] = useState(anFadeRight)

    const handleConfirmPass = (url,event) =>{
        event.preventDefault()
        window.localStorage.setItem('totalBalance','Load')
        setFadeSlow(anFadeOut)
        setFadeLeft(anFadeLeftOut)
        setTimeout(() => navigateRoute(url),1000)
    }

    const navigateRoute = (url) =>{
        navigate(url)
    }

    return (
        <div className={`block-container wallet-success ${checkLightTheme()}`}>

            {props.path === 'mm'?'':
                <div className={`dots-create ${fadeSlow}`}>
                    <div className="dot active"></div>
                    <div className="dot active"></div>
                    <div className="dot active"></div>
                </div>
            }

            <div className={`conf-pass-container ${fadeLeft}`}>

                <h2 className={checkLightTheme()}>Congratulations!</h2>
                <p className={checkLightTheme()}>Your wallet is successfully restored by SEED</p>

                <button className={`blue-button`} onClick={event => handleConfirmPass('/',event)} >
                    Start <img src="./images/preview-page/arrow.svg" alt="arrow"/>
                </button>
            </div>

        </div>
    );
};

export default WalletSuccess;