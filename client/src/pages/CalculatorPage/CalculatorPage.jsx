import React, {useState} from 'react';
import './CalculatorPage.css';
import {checkLightTheme} from "../../lightThemeCheck";

const CalculatorPage = () => {

    const [adkValue,setAdkValue] = useState(null)
    const [moneyValue,setMoneyValue] = useState(null)
    const [selectValue,setSelectValue] = useState("USD")

    const getBalance = async () =>{
        const adress = localStorage.getItem('adress')
        const balance = JSON.parse(await window.walletAPI.balance(adress))
        return balance.data[adress]/1000000000000000000
    }

    const setAllADK = (e) =>{
        e.preventDefault()
        const value = window.localStorage.getItem('totalBalance')
        setAdkValue(value)
    }

    const showValuesADK = async (e) =>{
        e.preventDefault()
        return await window.walletAPI.getAdkPrices()
    }

    const handleCalculate = async (e) =>{
        e.preventDefault()
        const value = await showValuesADK(e);
        setMoneyValue(value[selectValue] * adkValue)
    }


    return (
        <div className={`calculator ${checkLightTheme()}`}>
            <div className="calc-content">
                <img
                    className={'dollar'}
                    src={checkLightTheme()?"./images/calculator/dollar-w.svg":"./images/calculator/dollar.svg"}
                    alt=""
                />

                <form className={`form-calc`} onSubmit={handleCalculate}>
                    <div className={'calc-inp-but-container'}>
                        <input
                            className={`input-gray ${checkLightTheme()}`}
                            placeholder={'0.00'}
                            value={adkValue}
                            onChange={(e) => setAdkValue(e.target.value)}
                        />
                        <div className={`but-container ${checkLightTheme()}`}>
                            <button onClick={setAllADK}>All</button>
                        </div>
                    </div>

                <select className={checkLightTheme()} value={selectValue} onChange={event => setSelectValue(event.target.value)}>
                    <option value={"USD"}>Dollars</option>
                    <option value={"RUB"}>Rubles</option>
                    <option value={"EUR"}>Euros</option>
                </select>

                    {moneyValue?
                        <div className={`money-container ${checkLightTheme()}`}>
                            <h2>{moneyValue}</h2>
                        </div>:''
                    }

                <button className={`calc-sub ${checkLightTheme()}`} type={"submit"}>Count up</button>
                </form>
            </div>
        </div>
    );
};

export default CalculatorPage;