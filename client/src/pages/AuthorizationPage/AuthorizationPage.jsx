import React, {useEffect, useState} from 'react';
import './AuthorizationPage.css';
import {anFade, anFade1s, anFadeOut, anFadeSlow} from "../../animations";
import {useNavigate} from "react-router-dom";
import Errors from "../../general-components/Errors/Errors";
import {checkLightTheme} from "../../lightThemeCheck";
import {bgImageCheck} from "../../bgImageCheck";
import ModalForgotSeed from "../RecoverSeed/ModalForgotSeed/ModalForgotSeed";

const AuthorizationPage = () => {

    const navigate = useNavigate()

    const [display,setDisplay] = useState('display')

    const [error,setError] = useState('')

    const [user] = useState(window.localStorage.getItem('user'))

    const [fadeSlow,setFadeSlow] = useState(anFadeSlow)
    const [fade1s,setFade1s] = useState(anFade1s)
    const [fadeVideo,setFadeVideo] = useState('')

    const [userPass,setUserPass] = useState('')

    const [invalidInp,setInvalidInp] = useState('')

    const [modalForgot,setModalForgot] = useState(false)

    const handleCreate = (url,e) => {
        e.preventDefault()
        if (userPass !== window.localStorage.getItem('password')){
            setErrorFun('The password is incorrect')
            setInvalidInp('invalid')
            setUserPass('')
        }else {
            setFadeSlow(anFadeOut)
            setFade1s(anFadeOut)
            setTimeout(() => navigatePage(url),1000)
        }
    }

    const setErrorFun = (text) =>{
        setError(text)
        setTimeout(() => setError(''),4000)
    }

    const handleCreateNoPass = (url,e) => {
        e.preventDefault()
        setFadeSlow(anFadeOut)
        setFade1s(anFadeOut)
        setTimeout(() => navigatePage(url),1000)
    }

    const closeVideo = () =>{
        setDisplay('none')
        setFadeVideo(anFadeOut)
    }
    useEffect(() =>{
        window.sessionStorage.setItem('userVideo',true)
        setTimeout(() => setDisplay('none'),7000)
    })

    const [passShow,setPassShow] = useState(false)
    const handleShowPass = () =>{
        setPassShow(!passShow)
    }

    const navigatePage = (url) => {
        navigate(url)
    }

    return (
        <>
            {window.sessionStorage.getItem('userVideo')?'':
                <div onClick={closeVideo} style={{display:display}} className={`video-wrapper`}>
                    <video playsInline autoPlay muted loop>

                        <source
                            src={checkLightTheme()?"./videos/white-video.mp4":"./videos/black-video.mp4"}
                            type="video/mp4"
                        />
                    </video>
                </div>
            }

            <ModalForgotSeed
                show={modalForgot}
                onHide={() => setModalForgot(false)}
            />

            <div
                style={
                bgImageCheck() === 'lines'?
                {backgroundImage:`url('./images/auth-page/waves.svg')`}:
                    bgImageCheck() === 'gradient'?
                        {backgroundImage:`url('./images/bgs/gradient-main.svg')`,backgroundPosition:'-150px -15%',backgroundSize:'150%'}:
                        {backgroundImage:`url('./images/bgs/honeycomb-bottom.svg')`}
                }
                className={`block-container bottom-waves ${fadeSlow} ${checkLightTheme()}`}
            >

                {error===''?'':<Errors error={error} />}

                {/*auth container start*/}
                <div className={`auth-content`}>
                    <div className="img-auth-container">
                        <img
                            className={`card-auth ${fadeSlow}`}
                            src={checkLightTheme()?"./images/auth-page/card-white.png":"./images/auth-page/card2.png"}
                            alt={``}
                        />
                    </div>

                    <div className={`buttons-container ${fade1s}`}>
                        {user?
                            <>
                                <form className="form-create-pass">

                                    <div className="pass-auth">
                                        <input
                                            className={`input-gray ${checkLightTheme()} ${invalidInp} ${passShow?'act':''}`}
                                            type={passShow?'text':'password'}
                                            placeholder={`enter password`}
                                            value={userPass}
                                            onChange={event => setUserPass(event.target.value)}
                                        />
                                        <div className={`${checkLightTheme()} ${invalidInp}`}>
                                            {checkLightTheme()?
                                                <img onClick={handleShowPass} className={passShow?'act':''} src="./images/eye-dark.svg" alt=""/>:
                                                <img onClick={handleShowPass} className={passShow?'act':''} src="./images/eye.svg" alt=""/>
                                            }
                                        </div>
                                    </div>

                                    <button className={`blue-button`} onClick={event => handleCreate('/wallet',event)}>Login</button>
                                </form>
                                <div className={`hr-or ${checkLightTheme()}`}>
                                    <hr/>
                                    <p>or</p>
                                    <hr/>
                                </div>
                                <button className={`gray-button ${checkLightTheme()}`} onClick={() => setModalForgot(true)}>Forgot password</button>
                                <button className={`gray-button ${checkLightTheme()}`} onClick={event => handleCreateNoPass('/mmPass',event)}>Connect MetaMask</button>
                            </>
                            :
                            <>
                                <button className={`blue-button`} onClick={event => handleCreateNoPass('/createWallet',event)}>Create wallet</button>
                                <button className={`gray-button ${checkLightTheme()}`} onClick={event => handleCreateNoPass('/recoverSeed',event)}>Enter Seed</button>
                                <button className={`gray-button ${checkLightTheme()}`} onClick={event => handleCreateNoPass('/mmPass',event)}>Connect MetaMask</button>
                            </>
                        }
                    </div>

                </div>
                    {/*auth container end*/}

            </div>
        </>
    );
};

export default AuthorizationPage;