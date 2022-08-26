import React,{useState} from 'react';
import {anFade, anFadeOut} from "../../../../animations";
import {Link, useLocation, useNavigate} from "react-router-dom";
import './FormHelp.css';
import {checkLightTheme} from "../../../../lightThemeCheck";

const FormHelp = () => {

    const navigate = useNavigate()

    const path = useLocation().pathname;

    const [fade,setFade] = useState(anFade)

    //form values
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [text,setText] = useState('')

    const handleConfirmForm = async (e) =>{
        e.preventDefault();
        await fetch("http://79.126.43.85:80/mail", {
            method: "POST",
            body: `"{name:${name},mail: \"${email}\",\n" +
                " text: \"${text}\",\n" +
                " img: \"${undefined}\"\n" +
                "}"`,
            headers: {
                "Content-Type": "application/json"
            }
        })
        console.log(name)
        console.log(email);
        console.log(text);
        setName('')
        setEmail('')
        setText('')
    }

    const navigateRoute = (url) =>{
        navigate(url)
    }

    return (
        <div className={`block-container menu form ${fade} ${checkLightTheme()}`}>

            <form onSubmit={handleConfirmForm} className={`help-form ${checkLightTheme()}`}>
                <h3>Describe the problem you have encountered</h3>
                <input
                    className={`input-gray help-form ${checkLightTheme()}`}
                    type="text"
                    placeholder={'Enter your name'}
                    value={name}
                    onChange={event => setName(event.target.value)}
                />

                <input
                    className={`input-gray help-form ${checkLightTheme()}`}
                    type="text"
                    placeholder={'Enter your E-mail'}
                    value={email}
                    onChange={event => setEmail(event.target.value)}
                />
                <p className={`form-text`}>The problem associated with sending coins</p>
                <textarea
                    cols="30"
                    rows="10"
                    placeholder={'Describe your problem in detail'}
                    value={text}
                    onChange={event => setText(event.target.value)}
                />
                <button type={"submit"} className="blue-button">Send</button>
            </form>

            <div className={`faq-bottom-text ${checkLightTheme()}`}>
                <Link to={'/wallet/FAQ'} className={path==='/wallet/FAQ'?'active':''}>Questions</Link>
                <Link to={'/wallet/form'} className={path==='/wallet/form'?'active':''}>Feedback form</Link>
            </div>

        </div>
    );
};

export default FormHelp;