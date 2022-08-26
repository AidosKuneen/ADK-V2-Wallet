import React, {useEffect, useState} from 'react';
import './Receive.css';
import {useNavigate} from "react-router-dom";
import {anFade, anFade1s, anFade2s, anFadeOut} from "../../../../animations";
import TransData from "../LatestTransactions/TransData";
import ReceiveTrans from "../ReceiveTrans/ReceiveTrans";
import QRCodeSVG from "qrcode.react";
import {checkLightTheme} from "../../../../lightThemeCheck";
import BufferSuccess from "../../../../general-components/BufferSuccess/BufferSuccess";

const Receive = () => {

    const navigate = useNavigate()

    const [fade,setFade] = useState(anFade)
    const [fade1s,setFade1s] = useState(anFade1s)

    const [displayCopy,setDisplayCopy] = useState(false)

    const [activeAdress,setActiveAdress] = useState('')

    const handleCloseReceive = () =>{
        setFade(anFadeOut)
        setTimeout(() => navigateRoute('/wallet'),1000)
    }
    const navigateRoute = (url) =>{
        navigate(url)
    }

    //copy onclick
    const [grayColor,setGrayColor] = useState('')
    const handleCopy = async (adress) =>{
        await navigator.clipboard.writeText(adress)
        setGrayColor('gray')
        setDisplayCopy(true)
        setTimeout(changeCopyDisp,3000)
        setTimeout(handleChangeColor,1000)
    }
    const handleCopyTrans = () =>{
        setDisplayCopy(true)
        setTimeout(changeCopyDisp,3000)
    }

    const handleChangeColor = () =>{
        setGrayColor('')
    }
    const changeCopyDisp = () =>{
        setDisplayCopy(false)
    }

    const [adresses,setAdresses] = useState([])
    const [adrsLen,setAdrsLen] = useState(window.localStorage.getItem('adrsRec'))
    //create new address
    const handleNewAdr = async () =>{
        const seed = window.localStorage.getItem('seed')
        const data = JSON.parse(await window.walletAPI.addAddress(`"${seed}"`))
        console.log(data)
        let nowLen = window.localStorage.getItem('adrsRec');
        await window.localStorage.setItem('adrsRec',+nowLen + 1)
        setAdrsLen(window.localStorage.getItem('adrsRec'))
    }

    //state with all transactions
    const recTrans = TransData.filter(trans => trans.adk.startsWith('+'))
    // const [transactions,setTransactions] = useState(recTrans)

    //states for pagination
    const [currentPage,setCurrentPage] = useState(1)
    const [transactionsAmount] = useState(6)

    const pageAmount = Math.ceil(adresses.length / transactionsAmount);
    const lastTransactionIndex = currentPage * transactionsAmount;//высчитываем индекс последней страны
    const firstTransactionIndex = lastTransactionIndex - transactionsAmount;//высчитываем индекс страны стоящей первой на странице
    const transactionsOnePage = adresses.slice(firstTransactionIndex,lastTransactionIndex)//отображение определенного кол-ва стран на странице

    const paginate = pageNumber => setCurrentPage(pageNumber)

    const prevPage = () => setCurrentPage(prev => prev - 1)
    const nextPage = () => setCurrentPage(prev => prev + 1)

    useEffect(() =>{
        const checkAdrs = () =>{
            if (!window.localStorage.getItem('adrsRec')){
                window.localStorage.setItem('adrsRec',1)
            }
        }
        checkAdrs()


        const getListAdress = async () =>{
            const seed = window.localStorage.getItem('seed')
            const data = JSON.parse(await window.walletAPI.listWalletAddress(`"${seed}"`, adrsLen))
            let arrValues = []
            for (let item in data.data){
                const dataBal = JSON.parse(await window.walletAPI.balance(data.data[item]))
                let balLast = dataBal["data"][data.data[item]]/1000000000000000000;
                arrValues.unshift([data.data[item],balLast])
            }
            await setAdresses(arrValues)
            setActiveAdress(arrValues[0][0])
        }
        getListAdress()
    })

    return (
        <div className={`block-container menu receive ${fade}`}>

            {displayCopy?
                <BufferSuccess />:''
            }

            <div className={`block-container ${checkLightTheme()}`}>

                <div className="rec-container">
                    <img className={'logoAidos'} src="./images/wallet-page/logoKrug.svg" alt="logoAidos"/>

                    <div className={`qr-container ${fade1s}`}>
                        <QRCodeSVG
                            size={90}
                            bgColor={"rgba(255, 255, 255, 0)"}
                            fgColor={checkLightTheme()?"rgba(24,24,24,0.8)":"rgba(255, 255, 255, 0.8)"}
                            className={'qr-code'}
                            value={activeAdress}
                        />
                    </div>

                    <div className={`rec-code-container ${checkLightTheme()}`}>

                        <div className="code">
                            <p className={grayColor}>{activeAdress}</p>
                        </div>
                        <div className="copy">
                            <img
                                onClick={() => handleCopy(activeAdress)}
                                src={checkLightTheme()?"./images/receive/copy-bl.svg":"./images/receive/copy.svg"}
                                alt="copy"
                            />
                            <a target="_blank" href={`https://explorer.aidoskuneen.com/?searchhash=${activeAdress}&page=search&submitbtn=`}>
                                <img
                                    src={checkLightTheme()?"./images/receive/ar-b.svg":"./images/receive/ar-w.svg"} alt=""
                                    className={'img-brows'}
                                />
                            </a>
                        </div>
                    </div>

                    <div className={`rec-button-container ${checkLightTheme()}`}>
                        <button onClick={handleCloseReceive} className={`gray-button ${checkLightTheme()}`}>Back</button>
                        <button className={`blue-button`} onClick={handleNewAdr}>Create New Address</button>
                    </div>
                </div>


                <div className={`rec-transactions ${checkLightTheme()} ${anFade2s}`}>
                    <header>
                        <h3>Addresses</h3>
                    </header>

                    <ReceiveTrans
                        dispCopy={handleCopyTrans}
                        adrs={adresses}
                        adrsLen={adrsLen}
                        transactionsOnePage={transactionsOnePage}
                    />

                    <footer>
                        <button className={`left`} disabled={currentPage===1} onClick={prevPage}>
                            {checkLightTheme()?
                                <img src="./images/wallet-page/arrow-right.svg" alt=""/>:
                                <img src="./images/arrow-right.svg" alt=""/>
                            }
                        </button>
                        <p>{currentPage} / {pageAmount}</p>
                        <button className={`right`} disabled={currentPage===pageAmount} onClick={nextPage}>
                            {checkLightTheme()?
                                <img src="./images/wallet-page/arrow-right.svg" alt=""/>:
                                <img src="./images/arrow-right.svg" alt=""/>
                            }
                        </button>
                    </footer>
                </div>
            </div>

        </div>
    );
};

export default Receive;