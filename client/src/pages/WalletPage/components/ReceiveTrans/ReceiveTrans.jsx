import React from 'react';
import './ReceiveTrans.css';
import {checkLightTheme} from "../../../../lightThemeCheck";

const ReceiveTrans = (props) => {

    const handleCopy = (adress) =>{
        navigator.clipboard.writeText(adress)
        props.dispCopy()
    }

    return (
        <>

            {props.transactionsOnePage.map((trans,idx) => (
                <div className={`rec-trans-container ${checkLightTheme()}`} key={idx}>
                    <span>
                        <p>{trans[0]}</p>
                        {checkLightTheme()?
                            <img onClick={() => handleCopy(trans[0])} className={'copy-address'} src="./images/receive/copy-bl.svg" alt="copy"/>:
                            <img onClick={() => handleCopy(trans[0])} className={'copy-address'} src="./images/receive/copy.svg" alt="copy"/>
                        }
                    </span>

                    <h3 className={'adk'}>{trans[1]} ADK</h3>
                </div>
            ))}
        </>
    );
};

export default ReceiveTrans;