import React,{useState} from 'react';
import './ShowSeedPage.css';
import {anFadeLeftOut, anFadeOut, anFadeRight, anFadeSlow} from "../../animations";
import {useNavigate} from "react-router-dom";
import {GLOBAL_SEED} from "../CreateWalletPage/CreateWalletPage";
import Errors from "../../general-components/Errors/Errors";
import {checkLightTheme} from "../../lightThemeCheck";
import CancelAuthModal from "./CancelAuthModal/CancelAuthModal";

const ShowSeedPage = () => {

    const navigate = useNavigate()

    //errors
    const [error,setError] = useState('')
    //stake for invalid input
    const [invalidInp,setInvalidInp] = useState(false)
    const [invalidInpBot,setInvalidInpBot] = useState(false)

    //modal
    const [cancelModal,setCancelModal] = useState(false)

    //animate
    const [fadeSlow,setFadeSlow] = useState(anFadeSlow)
    const [fadeLeft,setFadeLeft] = useState(anFadeRight)

    //seed inp check
    const [seedInp,setSeedInp] = useState('')
    const [seedInpCopy,setSeedInpCopy] = useState('')

    const handleSuccessSeed = (event,url) =>{
        event.preventDefault()
        if (seedInp !== GLOBAL_SEED){
            setInvalidInp(true)
            setErrorFun('SEED incorrect. Please try again.')
        }else if(seedInp !== seedInpCopy){
            setInvalidInpBot(true)
            setErrorFun('SEED does not match. Please Try Again.')
        }else{
            setFadeSlow(anFadeOut)
            setFadeLeft(anFadeLeftOut)
            setTimeout(() => navigateRoute(url),1000)
        }
    }

    const setErrorFun = (text) =>{
        setError(text)
        setTimeout(() => setError(''),4000)
    }

    const navigateRoute = (url) =>{
        navigate(url)
    }

    const cancelAuth = () =>{
        window.localStorage.removeItem('adress')
        window.localStorage.removeItem('seed')
        window.localStorage.removeItem('password')
        window.localStorage.removeItem('user')
        navigate('/')
    }

    const openModal = (e) => {
        e.preventDefault()
        setCancelModal(true)
    }

    return (
            <div className={`block-container ${checkLightTheme()}`}>

                <CancelAuthModal
                    show={cancelModal}
                    onHide={() => setCancelModal(false)}
                    cancelAuth={cancelAuth}
                />

                {error!==''?<Errors error={error} />:''}

                <div className={`dots-create ${fadeSlow}`}>
                    <div className="dot active"></div>
                    <div className="dot active"></div>
                    <div className="dot"></div>
                </div>

                <div className={`seed-first-show ${fadeLeft}`}>
                    <h2 className={`h2-seed ${checkLightTheme()}`}>
                        Your Seed<br />
                        <p>Don't Share it with Anyone and Store it offline </p>
                    </h2>

                    <div className={`seed-container`}>
                        <header />
                        <div className="seed-text">
                            <p>{window.localStorage.getItem('seed')}</p>
                        </div>
                    </div>

                    <form className="form-create-pass">
                        <textarea
                            rows="2"
                            style={{resize: 'none'}}
                            className={`input-gray ${checkLightTheme()} ${invalidInp?'invalid':''}`}
                            placeholder={`enter seed`}
                            value={seedInp}
                            onChange={event => setSeedInp(event.target.value)}
                        />
                        <textarea
                            rows="2"
                            style={{resize: 'none'}}
                            className={`input-gray ${checkLightTheme()} ${invalidInpBot?'invalid':''}`}
                            placeholder={`enter seed again`}
                            value={seedInpCopy}
                            onChange={event => setSeedInpCopy(event.target.value)}
                        />
                        <br />
                        <footer>
                            <button
                                onClick={event => openModal(event)}
                                className={`gray-button ${checkLightTheme()}`}
                            >Cancel</button>

                            <button
                                id={`button-kierill`}
                                onClick={event => handleSuccessSeed(event,'/confirmPass')}
                                className={`blue-button ${checkLightTheme()}`}
                            >Finish</button>
                        </footer>
                    </form>
                </div>

            </div>
    );
};

export default ShowSeedPage;