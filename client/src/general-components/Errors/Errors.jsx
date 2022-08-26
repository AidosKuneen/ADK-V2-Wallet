import React from 'react';
import {Alert} from "react-bootstrap";
import './Errors.css';
import {anFadeFaster} from "../../animations";

const Errors = (props) => {

    return (
        <Alert className={`errors-block ${anFadeFaster}`} key={'danger'} variant={'danger'}>
            {props.error}
        </Alert>
    );
};

export default Errors;