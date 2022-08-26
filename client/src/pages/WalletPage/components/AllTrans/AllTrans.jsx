import React from 'react';
import './AllTrans.css';
import sendTrans from "../../../../sendTrans";
import {useLocation} from "react-router-dom";

const AllTrans = (props) => {

    const path = useLocation().pathname;

    return (
        <>
            {path==='/wallet'?
            props.sendTr[0]===null?'':
                props.sendTr.map((trans,idx) => (
                <div className={'trans-container'} key={idx}>
                    <div className="from-to all">
                        <div className="from">
                            <p style={{opacity:1,fontWeight:600}}>From</p>
                            <p>{trans.from}</p>
                        </div>
                        <div className="to">
                            <p style={{opacity:1,fontWeight:600}}>To</p>
                            <p className={props.blueClass}>{trans.to}</p>
                        </div>
                        <div className="hash">
                            <p style={{opacity:1,fontWeight:600}}>TX</p>
                            <p className={props.blueClass}>{trans.hash}</p>
                        </div>
                    </div>

                    <div className="dollar-adk">
                        <div className="adk">
                            {trans.adk.startsWith('+')?
                                <h3 className={`green ${props.blueClass}`}>{trans.adk}ADK</h3>:
                                <h3 className={`red ${props.blueClass}`}>{trans.adk}ADK</h3>
                            }
                        </div>

                        <div className="conf-pend">
                            <p>Confirmed</p>
                        </div>
                    </div>
                </div>
            )):
                props.stakeTr[0]===null?'':
                    props.stakeTr.map((trans,idx) => (
                        <div className={'trans-container'} key={idx}>
                            <div style={{justifyContent:'flex-start'}} className="from-to">
                                <div className="from">
                                    <p style={{opacity:1,fontWeight:600}}>From/To</p>
                                    <p>{trans.adress}</p>
                                </div>
                            </div>

                            <div className="dollar-adk">
                                <div className="adk">
                                    <h3 className={`${props.blueClass}`}>{trans.adk}ADK</h3>
                                </div>

                                <div className="conf-pend">
                                    <p>{trans.method}</p>
                                </div>
                            </div>
                        </div>
                    ))
            }
        </>
    );
};

export default AllTrans;