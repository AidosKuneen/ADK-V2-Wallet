import React from 'react';
import './OverviewGraph.css';
import {Area, AreaChart, CartesianGrid, Tooltip, XAxis, YAxis} from "recharts";

const OverviewGraph = (props) => {
    return (
        <AreaChart
            className={`graph-overview`}
            width={950}
            height={250}
            data={props.data}
            margin={{
                top: 0,
                right: 0,
                left: 0,
                bottom: 0
            }}
        >
            <defs>
                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="rgba(4, 202, 115, 0.7)" stopOpacity={0.8}/>
                    <stop offset="100%" stopColor="rgba(4, 202, 115, 0)" stopOpacity={0}/>
                </linearGradient>
            </defs>
            <CartesianGrid stroke="var(--color-white-opac-3)" vertical={false} />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="adk" stroke="var(--color-green)" fillOpacity={1} fill="url(#colorUv)" />
        </AreaChart>
    );
};

export default OverviewGraph;