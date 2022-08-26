import React, {useEffect, useState} from 'react';
import './RecoverSeed.css';
import {useNavigate} from "react-router-dom";
import {anFade, anFadeLeftOut, anFadeOut, anFadeRight} from "../../animations";
import {checkLightTheme} from "../../lightThemeCheck";
import Errors from "../../general-components/Errors/Errors";
import ModalForgotSeed from "./ModalForgotSeed/ModalForgotSeed";

const RecoverSeed = () => {

    const navigate = useNavigate()

    const [fade,setFade] = useState(anFade)
    const [fadeLeft,setFadeLeft] = useState(anFadeRight)

    //errors
    const [error,setError] = useState('');
    const [invalid,setInvalid] = useState('');

    //modal state
    const [modalForgot,setModalForgot] = useState(false)

    //input state
    const [seedInp,setSeedInp] = useState('')

    //count words in seed
    String.prototype.countWords = function(){
        return this.split(/\s+/).length;
    }

    const handleRecoverSeed = (url,event) =>{
        event.preventDefault()
        if (!seedInp){
            setInvalid('invalid')
            setErrorFun('Please enter SEED')
            setSeedInp('')
            return 0
        }else if(seedInp.match(/(\w+)/g).length === 12 || seedInp.match(/(\w+)/g).length === 24){
            window.localStorage.setItem('seedMnemonic',seedInp)
            setFade(anFadeOut)
            setFadeLeft(anFadeLeftOut)
            setTimeout(() => navigateRoute(url),1000)
        }else {
            setInvalid('invalid')
            setErrorFun('SEED must contain 12 or 24 words.')
            setSeedInp('')
        }
    }

    const setErrorFun = (text) =>{
        setError(text)
        setTimeout(() => setError(''),4000)
    }

    const navigateRoute = (url) =>{
        navigate(url)
    }

    return (
            <div className={`block-container ${checkLightTheme()}`}>

                {error!==''?<Errors error={error} />:''}

                <div className={`dots-create ${fade}`}>
                    <div className="dot active"></div>
                    <div className="dot"></div>
                    <div className="dot"></div>
                </div>

                <div className={`rec-seed-form-container ${fadeLeft}`}>
                    <h2 className={checkLightTheme()}>Recover from seed</h2>
                    <form>
                        <textarea
                            rows="3"
                            style={{resize: 'none'}}
                            className={`input-gray ${checkLightTheme()} ${invalid}`}
                            placeholder={`enter 12/24 mnemonic seed words `}
                            value={seedInp}
                            onChange={event => setSeedInp(event.target.value)}
                        />

                        <div className="footer">
                            <button className={`gray-button ${checkLightTheme()}`} onClick={() => navigateRoute('/')}>
                                Cancel
                            </button>

                            <button className={`blue-button ${checkLightTheme()}`} onClick={event => handleRecoverSeed('/createPass',event)}>
                                Enter seed words
                            </button>
                        </div>
                    </form>
                </div>
            </div>
    );
};

export default RecoverSeed;