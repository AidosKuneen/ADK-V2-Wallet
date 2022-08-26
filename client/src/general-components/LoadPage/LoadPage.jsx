import React, {useEffect, useState} from 'react';
import './LoadPage.css';
import {useNavigate} from "react-router-dom";
import {anFadeOut, anFadeSlow} from "../../animations";
import {Area, AreaChart, CartesianGrid, XAxis, YAxis} from "recharts";
import loadData from "./LoadData";
const LoadPage = () => {

    const navigate = useNavigate()

    const [fadeSlow,setFadeSlow] = useState(anFadeSlow)

    const handleConfirmSeed = (url,event) =>{
        event.preventDefault()
        setFadeSlow(anFadeOut)
        setTimeout(() => navigateRoute(url),1000)
    }

    const navigateRoute = (url) =>{
        navigate(url)
    }

    //change monetka func
    const [monetka,setMonetka] = useState(0);
    useEffect(() => {
        const interval = setInterval(() => {
            setMonetka(monetka => monetka>=loadData.length-1? 0 : monetka + 1);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div
            className={`block-container load-page ${fadeSlow}`}
            onClick={event => handleConfirmSeed('/',event)}
        >

            <header>
                <div className="monetka">
                    <img src={loadData[monetka].img} alt=""/>
                    <span>
                        <h1 className="name">{loadData[monetka].nazv}</h1>
                        <h3 className="sokr">{loadData[monetka].nazvKratko}</h3>
                    </span>
                </div>

                <div className="about-changes">
                    <div className="a-c-container">
                        <p>Price</p>
                        <h2>{loadData[monetka].price}</h2>
                    </div>
                    <div className="a-c-container">
                        <p>24h change</p>
                        <h2 className={`color`}>{loadData[monetka].change}</h2>
                    </div>
                    <div className="a-c-container">
                        <p>Market cap</p>
                        <h2>{loadData[monetka].cap}</h2>
                    </div>
                    <div className="a-c-container">
                        <p>24h vol</p>
                        <h2>{loadData[monetka].vol}</h2>
                    </div>
                </div>
            </header>
            <div className="graph-load-page">
                <AreaChart
                    className={`graph-overview`}
                    width={950}
                    height={250}
                    data={loadData[monetka].dataGraph}
                    margin={{
                        top: 0,
                        right: 0,
                        left: 0,
                        bottom: 0
                    }}
                >
                    <defs>
                        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="rgba(245, 179, 0, 0.29)" stopOpacity={0.8}/>
                            <stop offset="100%" stopColor="rgba(245, 179, 0, 0)" stopOpacity={0}/>
                        </linearGradient>
                    </defs>
                    <CartesianGrid stroke="var(--color-white-opac-3)" vertical={false} />
                    <XAxis dataKey="day" />
                    <YAxis />
                    {/*<Tooltip />*/}
                    <Area type="monotone" dataKey="adk" stroke="#F5B300" fillOpacity={1} fill="url(#colorUv)" />
                </AreaChart>
            </div>

        </div>
    );
};

export default LoadPage;