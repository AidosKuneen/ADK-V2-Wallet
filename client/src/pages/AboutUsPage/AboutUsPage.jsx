import React, {useState} from 'react';
import './AboutUsPage.css';
import {anFade, anFade1s} from "../../animations";
import {Link} from "react-router-dom";

const AboutUsPage = () => {

    const [fade,setFade] = useState(anFade)
    const [fade1s,setFade1s] = useState(anFade1s)

    return (
        <div className={`about-us-page ${fade}`}>

            <img className={`waves-about ${fade1s}`} src="./images/wallet-page/waves-shd.svg" alt=""/>
            
            <div className="container-info">
                <div className="info left">
                    <img src="./images/about-us/01.svg" alt=""/>
                    <h2 className="title">IMesh<br />AidosMesh</h2>
                    <p className="text">
                        IMesh is our take on an innovative new distributed ledger which is based on a DAG (directed acyclic graph).
                        Even though IMesh doesn’t suffer from the same problems as a Blockchain (e.g. scalability) it is still based
                        on the same underlying principles: it’s still a distributed database, it’s still a P2P Network and it still
                        relies on a consensus and validation mechanism. The structure of the Mesh is defined by the following concept:
                        Each transaction directly verifies two other transactions and therefore confirms that they are valid and conform
                        to the protocols rules. This directly influences how we reach consensus: Instead of having PoW (miners) or PoS
                        (stakers) be responsible for the overall consensus the entire network of active participants are directly
                        involved in the approval of transactions. As such, consensus in ADK is no longer decoupled from the
                        transaction making process: it’s an intrinsic part of it, and it’s what enables ADK to scale in an
                        unrivaled fashion without any transaction fees. This makes it so ADK can operate as an autonomous decentralized
                        and self-regulating p2p network.
                    </p>
                </div>
                <hr/>
                <div className="info right">
                    <p className="text">
                        Let’s first look at scalability, which we already addressed in the previous part. It’s probably one of
                        the biggest advantages ADK inherits compared to traditional Blockchains of the 1st and 2nd generation.
                        In ADK there is no necessity to order values of seeds or addresses. Since consensus is parallelized, and
                        not done in sequential intervals of batches as in blocks, the network is able to grow and scale dynamically
                        with the number of transactions. The more transactions are made, the more secure and the more efficient the
                        Mesh gets. When a node is synching, it just iterates through all transactions. The values from all transactions
                        will be grouped into their addresses, even if they are in their previous order or not. When the all
                        transactions are processed, every address will contain the current correct balance.There is no max-count of
                        transactions in one block like in Blockchains and there will certainly be no blocksize-debate. There is no need
                        to sort a puzzle just from one corner, piece after piece if you can have multiple eyes looking simultaneously and
                        randomly for the right pieces to form the puzzle, from multiple corners. The more eyes, the faster it gets.
                        Aidos demands no mining, is block-less and contrarily to Blockchains, gets faster the bigger it grows.
                    </p>
                    <img src="./images/about-us/02.svg" alt=""/>
                    <h2 className="title">ADK vs<br /> Blockchain</h2>
                </div>
                <hr/>
                <div className="info left">
                    <img src="./images/about-us/03.svg" alt=""/>
                    <h2 className="title">Transaction<br /> System</h2>
                    <p className="text">
                        The issuing of a transaction in ADK consists of three simple steps: 1. Signing: First the transaction inputs
                        are signed with your private keys 2. Tip Selection: Then a Random Walk Monte Carlo algorithm is used to
                        randomly select two tips (i.e. unconfirmed transactions), which will be referenced by your transaction.
                        3. Proof of Work: For your transaction to be accepted by the network, you need to do solve a cryptographic
                        puzzle – similar to Hashcash. After all above steps your transaction is broadcast to the network. After that
                        someone else just has to reference your transaction in the tip selection process and therefore validate it.
                        After that your transaction will be confirmed. Technical Data: Total amount: 25.000.000 Premine: No Mining:
                        No Technology: IMesh ( DAG ) Application fields: Finance, Internet of Things, Smart contracts
                    </p>
                </div>
            </div>

            <footer>
                <Link to={'/'}>
                    <img src="./images/about-us/media/1.svg" alt=""/>
                </Link>
                <Link to={'/'}>
                    <img src="./images/about-us/media/2.svg" alt=""/>
                </Link>
                <Link to={'/'}>
                    <img src="./images/about-us/media/3.svg" alt=""/>
                </Link>
                <Link to={'/'}>
                    <img src="./images/about-us/media/4.svg" alt=""/>
                </Link>
                <Link className={'pad'} to={'/'}>
                    <img src="./images/about-us/media/5.svg" alt=""/>
                </Link>
                <Link to={'/'}>
                    <img src="./images/about-us/media/6.svg" alt=""/>
                </Link>
                <Link to={'/'}>
                    <img src="./images/about-us/media/7.svg" alt=""/>
                </Link>
            </footer>

        </div>
    );
};

export default AboutUsPage;