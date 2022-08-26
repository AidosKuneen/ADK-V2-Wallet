import React from 'react';
import {Alert} from "react-bootstrap";
import './BufferSuccess.css';

const BufferSuccess = (props) => {

    return (
        <Alert
            key={'success'}
            variant={'success'}
            className={`alert-buffer`}
        >
            {props.migr?props.migr:"Copied!"}
        </Alert>
    );
};

export default BufferSuccess;