import React,{useState} from 'react';
import './Send.css';
import {anFadeOut, anFade} from "../../../../animations";
import {useLocation, useNavigate} from "react-router-dom";
import Errors from "../../../../general-components/Errors/Errors";
import ModalConfirm from "./modalsSend/ModalConfirm/ModalConfirm";
import ModalClose from "./modalsSend/ModalClose/ModalClose";
import {checkLightTheme} from "../../../../lightThemeCheck";
import {Spinner} from "react-bootstrap";
import sendTrans from "../../../../sendTrans";
import BufferSuccess from "../../../../general-components/BufferSuccess/BufferSuccess";

const Send = (props) => {

    //for navigate to next page
    const navigate = useNavigate()
    //for path
    const path = useLocation().pathname;


    const [fade,setFade] = useState(anFade)

    //modals
    const [modalConfirm,setModalConfirm] = useState(false)
    const [modalClose,setModalClose] = useState(false)

    // states for inputs
    const [to,setTo] = useState('')
    const [mempasState,setMempasState] = useState('')
    const [fromState,setFromState] = useState('')
    const [adkValue,setAdkValue] = useState('')
    const [adkValueLast,setAdkValueLast] = useState('')
    const [checkValue,setCheckValue] = useState(0)
    const [migrateSeed,setMigrateSeed] = useState('')

    //copy alert state
    const [displayCopy,setDisplayCopy] = useState(false)

    //state for stake
    const [stakeValue,setStakeValue] = useState('')
    const [stakeValueLast,setStakeValueLast] = useState('')
    const [displayButState,setDispalyButState] = useState(true)

    //stake for invalid input
    const [invalidInp,setInvalidInp] = useState(false)
    const [invalidInpAdk,setInvalidInpAdk] = useState(false)

    const [error,setError] = useState('')
    const setErrorFun = (text) =>{
        setError(text)
        setTimeout(() => setError(''),4000)
    }

    //close send page
    const handleCloseSend = (e) =>{
        e.preventDefault()
        setErrorFun('')
        setModalClose(true)
    }

    const getBalance = () =>{
        return +window.localStorage.getItem('totalBalance')
    }
    const getBalanceStake = async () =>{
        return +window.localStorage.getItem('totalStake')
    }

    //SEND
    const handleSend = async (e) =>{
        e.preventDefault()
        let adkValueLastInner = adkValue.replace(/[^.\d]+/g,"").replace( /^([^\.]*\.)|\./g, '$1' )
        setAdkValueLast(adkValueLastInner)
        e.preventDefault()
        if (to.length !== 42){
            setInvalidInp(true)
            setInvalidInpAdk(false)
            setErrorFun('Address incorrect. Please enter the correct address.')
        }else if(Number(adkValueLastInner) > +window.localStorage.getItem('totalBalance')){
            setInvalidInp(false)
            setInvalidInpAdk(true)
            setErrorFun('Send error. You do not have enough money to send.')
        } else if(!Number(adkValueLastInner)){
            setInvalidInp(false)
            setInvalidInpAdk(true)
            setErrorFun('Send error. Enter the number of coins.')
        }else if(checkValue === 0){
            setInvalidInp(false)
            setInvalidInp(true)
            setErrorFun('Send error. You need to choose a sending method.')
        }
        else {
            const openModalConsfirm = async () =>{
                await setMempasState(localStorage.getItem('seed'))
                await setFromState(localStorage.getItem('adress'))
                setModalConfirm(true)
            }
            openModalConsfirm()
        }
    }

    //STAKE
    const handleStake = async (e) =>{
        e.preventDefault()
        let stakeValueLast = stakeValue.replace(/[^.\d]+/g,"").replace( /^([^\.]*\.)|\./g, '$1' )
        setStakeValueLast(stakeValueLast)
        if (Number(stakeValueLast) > +window.localStorage.getItem('totalBalance')){
            setErrorFun('Stak error. You do not have enough money to stak.')
        }else if(!Number(stakeValueLast)){
            setErrorFun('Stak error. You need to choose a sending method.')
        }else {
            setDispalyButState(false)
            const adress = localStorage.getItem('adress')
            const seed = localStorage.getItem('seed')
            const stake = JSON.parse(await window.walletAPI.multistake(checkValue===1?'gas':'pow',`"${seed}"`,stakeValueLast))
            // console.log(stake,'STAKE TRANS')
            let dataTransStake = await sendTrans('stake')
            if (stake.ok===false){
                setErrorFun("Stak is not completed. Please try it later.")
                setTimeout(() => navigateOut('/wallet/staking'),3000)
            }else {
                if (dataTransStake[0]===null){
                    dataTransStake = [{adress: adress, adk: stakeValue, method: 'Stake'}]
                }else {
                    dataTransStake.push({adress: adress, adk: stakeValue, method: 'Stake'})
                }
                window.localStorage.setItem('stake',JSON.stringify(dataTransStake))
                await window.walletAPI.updateBalance()
                setDispalyButState(true)
                navigate('/wallet/staking')
            }
        }
    }

    //UNSTAKE
    const handleUnstake = async (e) =>{
        e.preventDefault()
        let stakeValueLast = stakeValue.replace(/[^.\d]+/g,"").replace( /^([^\.]*\.)|\./g, '$1' )
        setStakeValueLast(stakeValueLast)
        if (Number(stakeValueLast) > +getBalanceStake){
            setErrorFun('Unstak error. You do not have enough money to unstak.')
        }else if(!Number(stakeValueLast)){
            setErrorFun('Unstak error. You need to choose a sending method.')
        }else {
            setDispalyButState(false)
            const adress = localStorage.getItem('adress')
            const seed = localStorage.getItem('seed')
            const unstake = JSON.parse(await window.walletAPI.unstake(checkValue===1?'gas':'pow',`"${seed}"`,adress,stakeValueLast))
            setStakeValue('')
            if (unstake.ok===false){
                setErrorFun("Unstake is not completed. Please try it later.")
                setTimeout(() => navigateOut('/wallet/staking'),3000)
            }else {
                await window.walletAPI.updateBalance()
                setDispalyButState(true)
                navigate('/wallet')
            }
        }
    }

    //MIGRATE
    const migrateADK = async (e) =>{
        e.preventDefault()
        if (migrateSeed === ''){
            setInvalidInp('invalid')
            setErrorFun('Enter seed')
            return 0
        }
        setDispalyButState(false)
        const adress = window.localStorage.getItem('adress')
        const data = JSON.parse(await window.walletAPI.migrate(`"${migrateSeed}"`,adress))
        if (data.ok){
            setDisplayCopy(true)
            setTimeout(changeCopyDisp,3000)
        }else {
            setErrorFun('Migrate error.')
        }
        setMigrateSeed('')
        await window.walletAPI.updateBalance()
        setDispalyButState(true)
    }


    //navigate for setTimeout
    const navigateOut = (path) =>{
        navigate(path)
    }

    //for button ALL
    const setAllADK = async (e) =>{
        e.preventDefault()
        const value = await getBalance()
        setAdkValue(String(value))
    }
    const setAllADKStake = async (e) =>{
        e.preventDefault()
        const value = await getBalance()
        setStakeValue(String(value))
    }
    const setAllADKUnstake = async (e) =>{
        e.preventDefault()
        const value = await getBalanceStake()
        setStakeValue(String(value))
    }

    //for change copy alert
    const changeCopyDisp = () =>{
        setDisplayCopy(false)
    }

    //for send
    const redactNumOne = (n,way) => {
        if (way === 'send'){
            setAdkValue(n.replace(/[^.\d]+/g,"").replace( /^([^\.]*\.)|\./g, '$1' ))
        }else {
            setStakeValue(n.replace(/[^.\d]+/g,"").replace( /^([^\.]*\.)|\./g, '$1' ))
        }
        redactNumTwo(n.replace(/[^.\d]+/g,"").replace( /^([^\.]*\.)|\./g, '$1' ),way)
        // console.log(n.replace(/\D/g,''))
    }
    const redactNumTwo = (n,way) =>{
        let parts = n.toString().split(".");
        if (String(n).includes('.')){
            parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            parts[1] = parts[1].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }else {
            parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
        if (way === 'send'){
            setAdkValue(parts.join("."))
        }else {
            setStakeValue(parts.join("."))
        }
    }


    return (
        <div className={`block-container menu ${fade} ${checkLightTheme()}`}>

            {displayCopy?
                <BufferSuccess migr={"Migrate success"} />:''
            }
            {error!==''?<Errors error={error} />:''}
            <ModalConfirm
                show={modalConfirm}
                onHide={() => setModalConfirm(false)}
                way={checkValue===1?'gas':'pow'}
                mempas={mempasState}
                from={fromState}
                to={to}
                adkValue={adkValueLast}
            />
            <ModalClose
                show={modalClose}
                onHide={() => setModalClose(false)}
                blue={props.blue}
            />

            <div className={`send-content ${props.blue}`}>
                {
                    props.blue?
                        <img src="./images/wallet-page/logoKrugBlue.svg" alt="logoAidos"/>:
                        <img src="./images/wallet-page/logoKrug.svg" alt="logoAidos"/>
                }

                {
                    props.blue ?
                        //check stake or unstake
                        path==='/wallet/stake'?
                        <form onSubmit={event => handleStake(event)} className="form-create-pass blue">
                            <div className={`adk-value ${checkLightTheme()}`}>
                                <input
                                    className={`input-gray blue ${checkLightTheme()} ${invalidInp?'invalid':''}`}
                                    type="text"
                                    placeholder={`0.00`}
                                    value={stakeValue}
                                    onChange={event => redactNumOne(event.target.value,'stake')}
                                />
                                <div className={`but-container blue`}>
                                    <button onClick={setAllADKStake} className={`all-send ${checkLightTheme()}`}>All</button>
                                    <h3>ADK</h3>
                                </div>
                            </div>

                            {checkValue===1?
                                <p className={'blue'}>Fees: 0.021 ADK</p>:
                                checkValue===2?
                                    <p className={'blue'}>Fees: 0 ADK</p>:''
                            }

                            <p className={`radio-p ${checkLightTheme()}`}>
                                <input type="radio" checked={checkValue === 1} onChange={() => setCheckValue(1)} />
                                <label htmlFor="answer1">Pay GAS "Fastest"</label>
                            </p>

                            <p className={`radio-p ${checkLightTheme()}`}>
                                <input type="radio" checked={checkValue === 2} onChange={() => setCheckValue(2)} />
                                <label htmlFor="answer2">Do POW</label>
                            </p>

                            <div className="butt-container">
                                {
                                    displayButState?
                                        <>
                                            <button onClick={handleCloseSend} className={`gray-button ${checkLightTheme()}`}>Cancel</button>
                                            <button type={"submit"} className={`border-button blue ${checkLightTheme()}`}>Stake</button>
                                        </>:
                                        <Spinner animation="grow" variant={checkLightTheme()==='light'?"secondary":"light"} />
                                }
                            </div>
                        </form>:
                            //UNSTAKE
                            <form onSubmit={event => handleUnstake(event)} className="form-create-pass blue">
                                <div className={`adk-value ${checkLightTheme()}`}>
                                    <input
                                        className={`input-gray blue ${checkLightTheme()} ${invalidInp?'invalid':''}`}
                                        type="text"
                                        placeholder={`0.00`}
                                        value={stakeValue}
                                        onChange={event => redactNumOne(event.target.value,'stake')}
                                    />
                                    <div className="but-container blue">
                                        <button onClick={setAllADKUnstake} className={`all-send ${checkLightTheme()}`}>All</button>
                                        <h3>ADK</h3>
                                    </div>
                                </div>

                                {checkValue===1?
                                    <p className={'blue'}>Fees: 0.021 ADK</p>:
                                    checkValue===2?
                                        <p className={'blue'}>Fees: 0 ADK</p>:''
                                }

                                <p className={`radio-p ${checkLightTheme()}`}>
                                    <input type="radio" checked={checkValue === 1} onChange={() => setCheckValue(1)} />
                                    <label htmlFor="answer1">Pay GAS "Fastest"</label>
                                </p>

                                <p className={`radio-p ${checkLightTheme()}`}>
                                    <input type="radio" checked={checkValue === 2} onChange={() => setCheckValue(2)} />
                                    <label htmlFor="answer2">Do POW</label>
                                </p>

                                <div className="butt-container">
                                    {
                                        displayButState?
                                            <>
                                                <button onClick={handleCloseSend} className={`gray-button ${checkLightTheme()}`}>Cancel</button>
                                                <button type={"submit"} className={`border-button blue ${checkLightTheme()}`}>Unstake</button>
                                            </>:
                                            <Spinner animation="grow" variant={checkLightTheme()==='light'?"secondary":"light"} />
                                    }
                                </div>
                            </form>
                        :
                        //send standart
                        path==='/wallet/send'?
                        <form onSubmit={handleSend}>
                            <input
                                className={`input-gray send ${checkLightTheme()} ${invalidInp?'invalid':''}`}
                                type="text"
                                placeholder={`Enter Address`}
                                value={to}
                                onChange={event => setTo(event.target.value)}
                            />

                            <div className={`adk-value ${checkLightTheme()}`}>
                                <input
                                    className={`input-gray ${checkLightTheme()} ${invalidInpAdk?'invalid':''} sendADK`}
                                    type="text"
                                    placeholder={''}
                                    value={adkValue}
                                    onChange={event => redactNumOne(event.target.value,'send')}
                                />
                                <div className={`but-container ${invalidInpAdk?'invalid':''}`}>
                                    <button onClick={setAllADK} className={'all-send'}>All</button>
                                    <h3 className={`${invalidInpAdk?'invalid':''}`}>ADK</h3>
                                </div>
                            </div>

                            {checkValue===1?
                                <p>Fees: 0.021 ADK</p>:
                                checkValue===2?
                                    <p>Fees: 0 ADK</p>:''
                            }

                            <p className={`radio-p ${checkLightTheme()}`}>
                                <input type="radio" checked={checkValue === 1} onChange={() => setCheckValue(1)} />
                                <label htmlFor="answer1">Pay GAS "Fastest"</label>
                            </p>

                            <p className={`radio-p ${checkLightTheme()}`}>
                                <input type="radio" checked={checkValue === 2} onChange={() => setCheckValue(2)} />
                                <label htmlFor="answer2">Do POW</label>
                            </p>

                            <div className="butt-container">
                                <button onClick={handleCloseSend} className={`gray-button ${checkLightTheme()}`}>Cancel</button>
                                <button onClick={handleSend} className={`border-button ${checkLightTheme()}`}>Send</button>
                            </div>
                        </form>:
                            //az seed form
                            <form onSubmit={handleSend}>
                                <textarea
                                    style={{resize:"none"}}
                                    rows={3}
                                    className={`input-gray send ${checkLightTheme()} ${invalidInp?'invalid':''}`}
                                    placeholder={`Enter old seed`}
                                    value={migrateSeed}
                                    onChange={event => setMigrateSeed(event.target.value)}
                                />

                                <div className="butt-container">
                                    {
                                        displayButState?
                                            <>
                                                <button onClick={handleCloseSend} className={`gray-button ${checkLightTheme()}`}>Cancel</button>
                                                <button onClick={migrateADK} className={`border-button ${checkLightTheme()}`}>Migrate</button>
                                            </>:
                                            <Spinner animation="grow" variant={checkLightTheme()==='light'?"secondary":"light"} />
                                    }
                                </div>
                            </form>
                }
            </div>
        </div>
    );
};

export default Send;