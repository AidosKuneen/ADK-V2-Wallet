import React from 'react';
import './SettingsModal.css';
import {CloseButton, Modal} from "react-bootstrap";
import {checkLightTheme} from "../../../lightThemeCheck";

const SettingsModal = (props) => {
    return (
        <Modal
            show={props.show}
            onHide={props.onHide}
            // size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            className={'settings-modal'}
        >
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter"></Modal.Title>
                <CloseButton onClick={props.onHide} variant={checkLightTheme()?"":"white"} />
            </Modal.Header>
            <Modal.Body>
                <p>{props.mess}</p>
            </Modal.Body>
            <Modal.Footer>
                <button className={`border-button`} onClick={props.onHide}>Ok</button>
            </Modal.Footer>
        </Modal>
    );
};

export default SettingsModal;