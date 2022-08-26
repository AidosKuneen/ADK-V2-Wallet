import React, {useEffect, useState} from 'react';
import './Overview.css';
import OverviewGraph from "./components/OverviewGraph/OverviewGraph";
import {anFade} from "../../../../animations";
import {checkLightTheme} from "../../../../lightThemeCheck";

const Overview = () => {

    const [fade,setFade] = useState(anFade)

    const [valueAdk,setValueAdk] = useState('')

    useEffect(() =>{
        const getAdkValue = async () =>{
            const dollar = await window.walletAPI.getAdkPrices()
            setValueAdk(dollar.USD)
        }
        getAdkValue()
    },[])

    return (
        <div className={`overview ${checkLightTheme()}`}>
            <div className={`value-change ${checkLightTheme()}`}>
                <h2>1ADK = {valueAdk}$</h2>
                <h3>Last month changes:</h3>
            </div>

            <div className="graph-container">
                <OverviewGraph />
            </div>
        </div>
    );
};

export default Overview;