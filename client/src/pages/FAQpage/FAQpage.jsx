import React, {useState} from 'react';
import './FAQpage.css';
import {anFade} from "../../animations";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {Accordion} from "react-bootstrap";
import {checkLightTheme} from "../../lightThemeCheck";

const FAQpage = () => {

    const path = useLocation().pathname;

    const navigate = useNavigate()

    const [fade,setFade] = useState(anFade)

    const routeForm = () =>{
        navigate('/wallet/form')
    }

    const dataAccord = [
        {
            id:0,
            title:'The problem associated with sending coins',
            text:'The issuing of a transaction in ADK consists of three simple steps: 1. Signing: First the transaction inputs are signed with your private keys 2. Tip Selection: Then a Random Walk Monte Carlo algorithm is used to randomly select two tips (i.e. unconfirmed transactions), which will be referenced by your transaction. 3. Proof of Work: For your transaction to be accepted by the network, you need to do solve a cryptographic puzzle – similar to Hashcash. After all above steps your transaction is broadcast to the network. After that someone else just has to reference your transaction in the tip selection process and therefore validate it. After that your transaction will be confirmed. Technical Data: Total amount: 25.000.000 Premine: No Mining: No Technology: IMesh ( DAG ) Application fields: Finance, Internet of Things, Smart contracts'
        },
        {
            id:1,
            title:'The problem associated with sending coins',
            text:'The issuing of a transaction in ADK consists of three simple steps: 1. Signing: First the transaction inputs are signed with your private keys 2. Tip Selection: Then a Random Walk Monte Carlo algorithm is used to randomly select two tips (i.e. unconfirmed transactions), which will be referenced by your transaction. 3. Proof of Work: For your transaction to be accepted by the network, you need to do solve a cryptographic puzzle – similar to Hashcash. After all above steps your transaction is broadcast to the network. After that someone else just has to reference your transaction in the tip selection process and therefore validate it. After that your transaction will be confirmed. Technical Data: Total amount: 25.000.000 Premine: No Mining: No Technology: IMesh ( DAG ) Application fields: Finance, Internet of Things, Smart contracts'
        },
        {
            id:2,
            title:'The problem associated with sending coins',
            text:'The issuing of a transaction in ADK consists of three simple steps: 1. Signing: First the transaction inputs are signed with your private keys 2. Tip Selection: Then a Random Walk Monte Carlo algorithm is used to randomly select two tips (i.e. unconfirmed transactions), which will be referenced by your transaction. 3. Proof of Work: For your transaction to be accepted by the network, you need to do solve a cryptographic puzzle – similar to Hashcash. After all above steps your transaction is broadcast to the network. After that someone else just has to reference your transaction in the tip selection process and therefore validate it. After that your transaction will be confirmed. Technical Data: Total amount: 25.000.000 Premine: No Mining: No Technology: IMesh ( DAG ) Application fields: Finance, Internet of Things, Smart contracts'
        },
        {
            id:3,
            title:'The problem associated with sending coins',
            text:'The issuing of a transaction in ADK consists of three simple steps: 1. Signing: First the transaction inputs are signed with your private keys 2. Tip Selection: Then a Random Walk Monte Carlo algorithm is used to randomly select two tips (i.e. unconfirmed transactions), which will be referenced by your transaction. 3. Proof of Work: For your transaction to be accepted by the network, you need to do solve a cryptographic puzzle – similar to Hashcash. After all above steps your transaction is broadcast to the network. After that someone else just has to reference your transaction in the tip selection process and therefore validate it. After that your transaction will be confirmed. Technical Data: Total amount: 25.000.000 Premine: No Mining: No Technology: IMesh ( DAG ) Application fields: Finance, Internet of Things, Smart contracts'
        },
        {
            id:4,
            title:'The problem associated with sending coins',
            text:'The issuing of a transaction in ADK consists of three simple steps: 1. Signing: First the transaction inputs are signed with your private keys 2. Tip Selection: Then a Random Walk Monte Carlo algorithm is used to randomly select two tips (i.e. unconfirmed transactions), which will be referenced by your transaction. 3. Proof of Work: For your transaction to be accepted by the network, you need to do solve a cryptographic puzzle – similar to Hashcash. After all above steps your transaction is broadcast to the network. After that someone else just has to reference your transaction in the tip selection process and therefore validate it. After that your transaction will be confirmed. Technical Data: Total amount: 25.000.000 Premine: No Mining: No Technology: IMesh ( DAG ) Application fields: Finance, Internet of Things, Smart contracts'
        },
    ]

    return (
        <div className={`block-container menu faq-page ${fade} ${checkLightTheme()}`}>
            <h1>Aidos Kuneen Help questions</h1>
            <div className={`faqs-container ${fade}`}>
                <Accordion defaultActiveKey={dataAccord[0].id}>
                    {dataAccord.map(item =>(
                        <Accordion.Item className={checkLightTheme()} eventKey={item.id}>
                            <Accordion.Header>{item.title}</Accordion.Header>
                            <Accordion.Body>{item.text}</Accordion.Body>
                        </Accordion.Item>
                    ))}
                </Accordion>
            </div>
            <div className={`faq-bottom-text ${checkLightTheme()}`}>
                <Link to={'/wallet/FAQ'} className={path==='/wallet/FAQ'?'active':''}>Questions</Link>
                <Link to={'/wallet/form'} className={path==='/wallet/form'?'active':''}>Feedback form</Link>
            </div>
        </div>
    );
};

export default FAQpage;