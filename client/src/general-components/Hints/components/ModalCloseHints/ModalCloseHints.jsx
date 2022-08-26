import React from 'react';
import {checkLightTheme} from "../../../../lightThemeCheck";
import {Modal} from "react-bootstrap";

const ModalCloseHints = (props) => {

    const handleDisableHints = () =>{
        props.offHints()
        props.onHide()
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
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter"></Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>
                    Are you sure you want to disable the assistant?
                    You can always turn it on in the wallet settings.
                </p>
            </Modal.Body>
            <Modal.Footer>
                <button className={`border-button ${checkLightTheme()}`} onClick={handleDisableHints}>Yes</button>
                <button className={`gray-button modal-close ${checkLightTheme()}`} onClick={props.onHide}>Cancel</button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalCloseHints;