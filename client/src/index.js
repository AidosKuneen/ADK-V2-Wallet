import React from 'react';
import ReactDOM from 'react-dom/client';
import Router from "./Router";
import {HashRouter} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import './general-styles/Buttons.css';
import './general-styles/Backgrounds.css';
import './general-styles/Inputs.css';
import './general-styles/Text.css';
import 'animate.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <HashRouter>
      <React.StrictMode>
        <Router />
      </React.StrictMode>
    </HashRouter>
);

