import React,{useState} from 'react';
import './CreatePassword.css';
import '../CreateWalletPage/CreateWalletPage.css';
import {useNavigate} from "react-router-dom";
import {anFade, anFadeLeftOut, anFadeOut, anFadeRight, anFadeSlow} from "../../animations";
import Errors from "../../general-components/Errors/Errors";
import {checkLightTheme} from "../../lightThemeCheck";

const CreatePassword = () => {

    const navigate = useNavigate()

    const [fadeSlow,setFadeSlow] = useState(anFadeSlow)

    //errors
    const [error,setError] = useState('');
    const [invalidInp,setInvalidInp] = useState('')

    //pass
    const [pass,setPass] = useState('');
    const [passCopy,setPassCopy] = useState('');


    //anim
    const [fade,setFade] = useState(anFade);
    const [fadeLeft,setFadeLeft] = useState(anFadeRight);

    const handleCreatePass = async (url,event) =>{
        event.preventDefault()
        if (pass !== passCopy){
            setInvalidInp('invalid')
            setErrorFun('Passwords does not match. Please Try Again.')
        }else if(pass.length < 8){
            setInvalidInp('invalid')
            setErrorFun('The password should consist of at least 8 characters.')
        }else{
            const seed = window.localStorage.getItem('seedMnemonic')
            const recoverResp = JSON.parse(await window.walletAPI.createWalletFromMnemonic(`"${seed}"`,pass))
            if (recoverResp.ok === true){
                const adress = JSON.parse(await window.walletAPI.listWalletAddress(`"${seed}"`,1)).data[0]
                window.localStorage.setItem('adress',adress)
                window.localStorage.setItem('seed',seed)
                window.localStorage.setItem('password',pass)
                window.localStorage.setItem('user',true)
                setFade(anFadeOut)
                setFadeSlow(anFadeOut)
                setFadeLeft(anFadeLeftOut)
                setTimeout(() => navigateRoute(url),1000)
            }else {
                setErrorFun('SEED incorrect. Please try again.')
            }
        }
    }

    const setErrorFun = (text) =>{
        setError(text)
        setTimeout(() => setError(''),4000)
    }

    const [passShow,setPassShow] = useState(false)
    const handleShowPass = () =>{
        setPassShow(!passShow)
    }

    const navigateRoute = (url) =>{
        navigate(url)
    }

    return (
            <div className={`block-container ${checkLightTheme()}`}>

                {error!==''?<Errors error={error} />:''}

                <div className={`dots-create ${fadeSlow}`}>
                    <div className="dot active"></div>
                    <div className="dot active"></div>
                    <div className="dot"></div>
                </div>

                <div className={`form-create-wallet-container ${fadeLeft}`}>
                    <h2 className={checkLightTheme()}>Create password</h2>
                    <form>

                        <div className="pass-auth">
                            <input
                                className={`input-gray ${checkLightTheme()} ${invalidInp} ${passShow?'act':''}`}
                                type={passShow?'text':'password'}
                                placeholder={`password min .8 ch.`}
                                value={pass}
                                onChange={event => setPass(event.target.value)}
                            />
                            <div className={`${checkLightTheme()} ${invalidInp}`}>
                                {
                                    checkLightTheme()?
                                        <img onClick={handleShowPass} className={passShow?'act':''} src="./images/eye-dark.svg" alt=""/>:
                                        <img onClick={handleShowPass} className={passShow?'act':''} src="./images/eye.svg" alt=""/>
                                }
                            </div>
                        </div>

                        <input
                            className={`input-gray ${checkLightTheme()} ${invalidInp}`}
                            type="password"
                            placeholder={`insert again`}
                            value={passCopy}
                            onChange={event => setPassCopy(event.target.value)}
                        />

                        <footer>
                            <button className={'blue-button'} onClick={event => handleCreatePass('/localWalletSuccess',event)}>
                                Create
                            </button>
                            <button className={`gray-button ${checkLightTheme()}`} onClick={() => navigateRoute('/')}>
                                Cancel
                            </button>
                        </footer>

                    </form>
                </div>
            </div>
    );
};

export default CreatePassword;