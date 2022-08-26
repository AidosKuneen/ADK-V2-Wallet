import React,{useState} from 'react';
import {checkLightTheme} from "../../lightThemeCheck";
import Errors from "../../general-components/Errors/Errors";
import {anFade, anFadeRight} from "../../animations";
import {useNavigate} from "react-router-dom";
import {getBalance} from "../../getBalance";
import {Spinner} from "react-bootstrap";

const MetaMaskPass = () => {

    const navigate = useNavigate()

    //errors
    const [error,setError] = useState('');
    const [invalidInp,setInvalidInp] = useState('')

    //spinner
    const [spinner,setSpinner] = useState(false)

    //anim
    const [fade,setFade] = useState(anFade);
    const [fadeLeft,setFadeLeft] = useState(anFadeRight);

    //pass input
    const [pass,setPass] = useState('');

    //pass show funs
    const [passShow,setPassShow] = useState(false)
    const handleShowPass = () =>{
        setPassShow(!passShow)
    }

    const handleCheckMM = async (url,e) =>{
        e.preventDefault()
        if (!pass){
            setInvalidInp('invalid')
            setErrorFun('Enter your MetaMask password')
            return 0
        }else {
            setSpinner(true)
            let data = JSON.parse(await window.walletAPI.loadMetamaskMnemonics(`"${pass}"`))
            console.log(data)
            if (data.ok){
                const adr = Object.keys(data.data)[0]
                const seed = Object.values(data.data)[0]
                window.localStorage.setItem('adress',adr)
                window.localStorage.setItem('seed',seed)
                window.localStorage.setItem('password',pass)
                window.localStorage.setItem('totalBalance','Load')
                await getBalance()
                setSpinner(false)
                navigateRoute('/wallet')
            }else {
                setSpinner(false)
                setErrorFun(data.msg)
            }
        }
    }

    //set error
    const setErrorFun = (text) =>{
        setError(text)
        setTimeout(() => setError(''),4000)
    }

    //navigate fun
    const navigateRoute = (url) =>{
        navigate(url)
    }

    return (
        <div className={`block-container ${checkLightTheme()}`}>

            {error!==''?<Errors error={error} />:''}

            <div className={`form-create-wallet-container ${fadeLeft}`}>
                <h2 className={checkLightTheme()}>Enter password</h2>
                <form>

                    <div className="pass-auth">
                        <input
                            className={`input-gray ${checkLightTheme()} ${invalidInp} ${passShow?'act':''}`}
                            type={passShow?'text':'password'}
                            placeholder={``}
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

                    <footer>
                        {spinner?
                            <Spinner style={{margin:"20px calc(50% - 10px) 0"}} animation="grow" variant={checkLightTheme()?"dark":"light"} />:
                            <>
                                <button className={'blue-button'} onClick={event => handleCheckMM('/localWalletSuccess',event)}>
                                    Continue
                                </button>
                                <button className={`gray-button ${checkLightTheme()}`} onClick={() => navigateRoute('/')}>
                                    Cancel
                                </button>
                            </>
                        }
                    </footer>

                </form>
            </div>
        </div>
    );
};

export default MetaMaskPass;