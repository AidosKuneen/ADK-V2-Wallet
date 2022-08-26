import React from 'react';
import {CloseButton, Modal} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import './ModalClose.css';
import {checkLightTheme} from "../../../../../../lightThemeCheck";

const ModalClose = (props) => {

    const navigate = useNavigate()

    const handleOut = () =>{
        props.blue?navigate('/wallet/staking'):navigate('/wallet')
    }

    return (
        <Modal
            show={props.show}
            onHide={props.onHide}
            // size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            className={`settings-modal close ${checkLightTheme()}`}
            centered
        >
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter"></Modal.Title>
                <CloseButton onClick={props.onHide} variant={checkLightTheme()?"":"white"} />
            </Modal.Header>
            <Modal.Body>
                <p>
                    Are you sure you want to return to the previous page?
                </p>
            </Modal.Body>
            <Modal.Footer>
                <button className={`border-button ${checkLightTheme()}`} onClick={handleOut}>Yes</button>
                <button className={`gray-button modal-close ${checkLightTheme()}`} onClick={props.onHide}>No</button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalClose;