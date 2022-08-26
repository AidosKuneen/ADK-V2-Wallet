import React, {useEffect, useState} from 'react';
import {anFade} from "../../animations";
import './Settings.css';
import SettingsModal from "./SettingsModal/SettingsModal";
import {checkLightTheme} from "../../lightThemeCheck";
import {bgImageCheck} from "../../bgImageCheck";

const Settings = () => {

    const [fade,setFade] = useState(anFade)

    //state for modal
    const [setModal,setSetModal] = useState(false)

    //for message after set settings
    const [message] = useState('Перезагрузите приложение для того чтобы настройки вступили в силу')
    //for block display after 15 min
    const [secur,setSecur] = useState('')
    //for background image
    const [bgImage,setBgImage] = useState(bgImageCheck())
    //for hints
    const [hints,setHints] = useState('')
    //for light theme
    const [lightTheme,setLightTheme] = useState(checkLightTheme())

    const handleChangeSecurity = (value) =>{
        // window.localStorage.setItem('security',value)
        // console.log(typeof value)
        if (+value===0){
            setSecur(1)
            window.localStorage.setItem('security',1)
        }else if(+value>999){
            setSecur(999)
            window.localStorage.setItem('security',999)
        }else {
            setSecur(+value)
            window.localStorage.setItem('security',value)
        }
    }
    const reloadPage = () =>{
        window.location.reload()
    }

    const handleChangeTheme = (value) =>{
        window.localStorage.setItem('lightTheme',value)
        setLightTheme(checkLightTheme())
        window.location.reload();
    }

    const handleChangeBgImage = (value) =>{
        window.localStorage.setItem('bgImage',value)
        setBgImage(bgImageCheck)
    }

    const changeHints = (value) =>{
        // console.log(value)
        setHints(value)
        window.localStorage.setItem('hints',value)
    }

    useEffect(() =>{
        setSecur(Number(window.localStorage.getItem('security')))
        setHints(window.localStorage.getItem('hints')==='true')
    },[])

    return (
        <div className={`block-container menu settings ${fade} ${checkLightTheme()}`}>

            <SettingsModal mess={message} show={setModal} onHide={() =>setSetModal(false)} />

            <div className={`container-setting ${checkLightTheme()}`}>
                <img
                    src={checkLightTheme()?"./images/settings/block-w.svg":"./images/settings/security.svg"}
                    alt=""
                />
                <div className="content-settings">
                    <h3>Security</h3>
                    <span>
                        <p style={{marginLeft:0}}>
                            Automatically block the screen after
                            <input
                                type={"number"}
                                style={{minWidth:40,margin:'0 5px'}}
                                className={`secur-inp ${checkLightTheme()}`}
                                value={secur}
                                onChange={event => handleChangeSecurity(event.target.value)}
                                onBlur={reloadPage}

                            />
                            minutes of inaction
                        </p>
                    </span>
                </div>
            </div>

            <div className={`container-setting ${checkLightTheme()}`}>
                <img
                    src={checkLightTheme()?"./images/settings/light-w.svg":"./images/settings/luna.svg"}
                    alt=""
                />
                <div className="content-settings">
                    <h3>Light theme</h3>
                    <span>
                        <input checked={lightTheme} onChange={() => handleChangeTheme(!lightTheme)} type="checkbox" className={checkLightTheme()}/>
                        <p>Use light theme</p>
                    </span>
                </div>
            </div>

            <div className={`container-setting ${checkLightTheme()}`}>
                <img
                    src={checkLightTheme()?"./images/settings/chr-w.svg":"./images/settings/chrome.svg"}
                    alt=""
                />
                <div className="content-settings">
                    <h3>Onboarding</h3>
                    <span>
                        <input
                            type="checkbox"
                            checked={hints}
                            onChange={() => changeHints(!hints)}
                            className={checkLightTheme()}
                        />
                        <p>Show onboarding when starting the program</p>
                    </span>
                </div>
            </div>

            <div className={`container-setting ${checkLightTheme()}`}>
                <img
                    src={checkLightTheme()?"./images/settings/bg-w.svg":"./images/settings/bg-rep.svg"}
                    alt=""
                />
                <div className="content-settings select-image">
                    <h3>Select background image</h3>
                    <div>
                        <span>
                            <input
                                className={checkLightTheme()}
                                checked={bgImage==='lines'}
                                onChange={() => handleChangeBgImage('lines')}
                                type="checkbox"
                            />
                            <p>Lines</p>
                        </span>
                        <span>
                            <input
                                className={checkLightTheme()}
                                checked={bgImage==='gradient'}
                                onChange={() => handleChangeBgImage('gradient')}
                                type="checkbox"
                            />
                            <p>Gradient</p>
                        </span>
                        <span>
                            <input
                                className={checkLightTheme()}
                                checked={bgImage==='honeycomb'}
                                onChange={() => handleChangeBgImage('honeycomb')}
                                type="checkbox"
                            />
                            <p>Honeycombs</p>
                        </span>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Settings;