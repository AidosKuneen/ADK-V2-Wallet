import React, {useState} from 'react';
import {CloseButton, Modal, Spinner} from "react-bootstrap";
import './ModalConfirm.css'
import {useNavigate} from "react-router-dom";
import {checkLightTheme} from "../../../../../../lightThemeCheck";
import sendTrans from "../../../../../../sendTrans";

const ModalConfirm = (props) => {

    const navigate = useNavigate()

    const [display,setDisplay] = useState(false)
    const [displayText,setDisplayText] = useState(true)
    const [message,setMessage] = useState(false)
    const [spinnerDisplay,setSpinnerDisplay] = useState('block')

    const handleSend = async () =>{
        // console.log(props.way,'way')
        // console.log(props.mempas,'mempas');
        // console.log(props.to,'to');
        // console.log(props.adkValue,'adkValue');
        setDisplay(true)
        const trans = JSON.parse(await window.walletAPI.multisend(props.way,`"${props.mempas}"`,props.to,props.adkValue))
        // console.log(trans,'TRANS')
        if (trans.ok === true){
            let dataTransSend = await sendTrans('send')
            if (dataTransSend[0]===null){
                dataTransSend = [{from: props.from, to:props.to, hash:trans.data[0], adk: `- ${props.adkValue}`, status: 'Confirmed'}]
            }else {
                dataTransSend.push({from: props.from, to:props.to, hash:trans.data[0], adk: `- ${props.adkValue}`, status: 'Confirmed'})
            }
            window.localStorage.setItem('send',JSON.stringify(dataTransSend))
            setMessage('Sent')
            await window.walletAPI.updateBalance()
            // console.log(trans,'TRANS')
            setSpinnerDisplay('none')
            setDisplayText(false)
        }else {
            setMessage('An error has occurred, please try again later')
            setSpinnerDisplay('none')
            setDisplayText(false)
        }
    }

    // console.log(props.way)
    // console.log(props.mempas)
    // console.log(props.from)
    // console.log(props.to)
    // console.log(props.adkValue)

    return (
        <Modal
            show={props.show}
            onHide={props.onHide}
            // size="lg"
            className={`settings-modal confirm ${checkLightTheme()}`}
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter"></Modal.Title>
                <CloseButton onClick={props.onHide} variant={checkLightTheme()?"":"white"} />
            </Modal.Header>
            <Modal.Body>
                {displayText?
                    <p>
                        You are sure that you want to send
                        <span> {props.adkValue}ADK </span>
                        to the address
                        <span> {props.to} </span>?
                    </p>:
                    <div className={'send-success'}>
                        <p style={{marginBottom:'30px'}}>{message}</p>
                        <button onClick={() => navigate(`/wallet`)} className={`border-button ${checkLightTheme()}`}>Ok</button>
                    </div>
                }
                {display===false?'':<Spinner style={{marginTop:10,display:spinnerDisplay}} animation="grow" variant={checkLightTheme()?"dark":"light"} />}
            </Modal.Body>
            <Modal.Footer style={{alignItems:'flex-end'}}>
                {display===false?
                    <>
                        <button className={'border-button'} onClick={handleSend}>Yes</button>
                        <button className={`gray-button modal-close ${checkLightTheme()}`} onClick={props.onHide}>No</button>
                    </>:''
                }
            </Modal.Footer>
        </Modal>
    );
};

export default ModalConfirm;