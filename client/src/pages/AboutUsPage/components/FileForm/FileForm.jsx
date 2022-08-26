import React,{useState} from 'react';
import {anFade} from "../../../../animations";
import {useNavigate} from "react-router-dom";
import './FileForm.css';
import {checkLightTheme} from "../../../../lightThemeCheck";
import Errors from "../../../../general-components/Errors/Errors";
import BufferSuccess from "../../../../general-components/BufferSuccess/BufferSuccess";

const FileForm = () => {

    const navigate = useNavigate()

    //error
    const [error,setError] = useState('')

    //states for form
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [subject,setSubject] = useState('')
    const [text,setText] = useState('')
    const [file,setFile] = useState('')

    //display success
    const [displayCopy,setDisplayCopy] = useState(false)

    //state for invalid input
    const [invalidInp,setInvalidInp] = useState(null)

    const [fade,setFade] = useState(anFade)

    const changeFile = (e) =>{
        e.preventDefault()
        setFile(e.target.files[0])
    }
    // console.log(file)

    const handleConfirmForm = async (e) =>{
        e.preventDefault()
        if (name===''){
            setErrorFun('Enter your name')
            setInvalidInp(1)
        }else if(email===''){
            setErrorFun('Enter your email')
            setInvalidInp(2)
        }else if(subject===''){
            setErrorFun('Enter subject')
            setInvalidInp(3)
        }else if(text===''){
            setErrorFun('Enter text')
            setInvalidInp(4)
        }else {
            console.log(name,'name')
            console.log(email,'email')
            console.log(subject,'subject')
            console.log(text,'text')
            console.log(file,'file')
            // const res = await window.walletAPI.sendEmail({name,email,subject,text,file})
            // console.log(res)
            // setFade(anFadeOut)
            setName('')
            setEmail('')
            setSubject('')
            setText('')
            setFile('')
            setDisplayCopy(true)
            setTimeout(changeCopyDisp,3000)
            setTimeout(() => navigateRoute('/wallet'),3000)
        }
    }

    const changeCopyDisp = () =>{
        setDisplayCopy(false)
    }

    const setErrorFun = (text) =>{
        setError(text)
        setTimeout(() => setError(''),4000)
    }

    const navigateRoute = (url) =>{
        navigate(url)
    }

    return (
        <div className={`block-container menu form ${fade} ${checkLightTheme()}`}>

            {displayCopy?
                <BufferSuccess migr={'Thank you! Your message is sent successfully.'} />:''
            }

            {error===''?'':<Errors error={error} />}

            <form onSubmit={handleConfirmForm} className={`help-form file ${checkLightTheme()}`}>
                <h3>Bug Reporting Form</h3>

                <input
                    className={`input-gray ${checkLightTheme()} ${invalidInp===1?'invalid':''}`}
                    type="text"
                    placeholder={'Enter your name'}
                    value={name}
                    onChange={event => setName(event.target.value)}
                />

                <input
                    className={`input-gray ${checkLightTheme()} ${invalidInp===2?'invalid':''}`}
                    type="text"
                    placeholder={'Enter your E-mail'}
                    value={email}
                    onChange={event => setEmail(event.target.value)}
                />

                <input
                    style={{marginBottom:15}}
                    className={`input-gray ${checkLightTheme()} ${invalidInp===3?'invalid':''}`}
                    type="text"
                    placeholder={'Subject'}
                    value={subject}
                    onChange={event => setSubject(event.target.value)}
                />

                <textarea
                    className={`${invalidInp===4?'invalid':''}`}
                    cols="30"
                    rows="10"
                    placeholder={'Describe your problem in detail'}
                    value={text}
                    onChange={event => setText(event.target.value)}
                />

                <span className={`input-file-span`}>
                    {checkLightTheme()?
                        <img src="./images/file-input-bl.svg" alt=""/>:
                        <img src="./images/file-input.svg" alt=""/>
                    }
                    <input
                        className={`custom-file-input ${checkLightTheme()}`}
                        type="file"
                        onChange={event => changeFile(event)}
                    />
                    <p className={'file-p'}>{file.name}</p>
                </span>
                <button type={"submit"} className="blue-button">Send</button>
            </form>

        </div>
    );
};

export default FileForm;