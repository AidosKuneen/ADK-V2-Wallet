import React, {useEffect, useState} from 'react';
import {Alert} from "react-bootstrap";
import './Hints.css';
import {anFade2s, anFade1s} from "../../animations";
import ModalCloseHints from "./components/ModalCloseHints/ModalCloseHints";

const Hints = () => {

    const [showHints,setShowHints] = useState(true);

    const [modalHints,setModalHint] = useState(false)

    const data = [
        'This is your total balance',
        'This is your amount that is in Staking',
        'Here is the main navigation menu',
        'This button for going to the ADK staking page',
        'This button for going to the transaction information page',
        'This button for going to the ADK sending page',
        'Here you can see the cost of the ADK course in different currency',
        'Here you can see the ADK course change schedule',
        'Here you can see your latest transactions',
    ];

    const [hintNum,setHintNum] = useState(1)

    const offHints = () =>{
        setHintNum(null)
        window.localStorage.setItem('hints',false)
        setShowHints(false)
    }

    const nextHint = () =>{
        setHintNum(hintNum+1)
    }

    return (
        <div className={`hints-container`}>

            <ModalCloseHints
                show={modalHints}
                onHide={() => setModalHint(false)}
                offHints={offHints}
            />

            {
                hintNum?
                <div
                    className={`
                        bg-hint-block
                        ${anFade1s}
                        ${hintNum===1?'onePos':
                            hintNum===2?'twoPos':
                                hintNum===3?'thrPos':
                                    hintNum===4?'fourPos':
                                        hintNum===5?'fivePos':
                                            hintNum===6?'sixPos':
                                                hintNum===7?'sevPos':
                                                    hintNum===8?'eigPos':
                                                        hintNum===9?'ninPos':'none'}
                        `}

                />
                :''
            }

            <Alert
                show={showHints}
                className={`
                    hints-block
                    ${anFade2s}
                    ${hintNum === 1 ? 'onePosAl' :
                    hintNum === 2 ? 'twoPosAl' :
                        hintNum === 3 ? 'thrPosAl' :
                            hintNum === 4 ? 'fourPosAl' :
                                hintNum === 5 ? 'fivePosAl' :
                                    hintNum === 6 ? 'sixPosAl' :
                                        hintNum === 7 ? 'sevPosAl' :
                                            hintNum === 8 ? 'eigPosAl' :
                                                hintNum===9? 'ninPosAl' : 'none'}
                        \`}
                `}
            >
                <div className="content">
                    <img onClick={() => setModalHint(true)} src="./images/x-hints.svg" alt=""/>
                    <p className={`message`}>
                        {data[hintNum-1]}
                    </p>
                    <footer>
                        <p>{hintNum} / 9</p>
                        {
                            hintNum !== 9?
                                <button onClick={nextHint}>Next prompt</button>:
                                <button onClick={offHints}>Close</button>
                        }
                    </footer>
                </div>
            </Alert>
        </div>
    );
};

export default Hints;