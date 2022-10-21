import React, { useState, useRef, useLayoutEffect } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

export const Diagram = ({ data, w }) => {
  const chart = useRef(null);
  const [height, setHeight] = useState(w/2)

  useLayoutEffect(() => {
    if(chart.current != null){
      setHeight(chart?.current?.offsetWidth/2)
    }    
  }, [chart?.current?.offsetWidth])

  if (data == null) return <></>;
  return (
    <div className="container-fluid d-flex justify-content-center align-items-center mt-4 py-2 border border-secondary rounded border-opacity-50" ref={chart}>
      <ResponsiveContainer width={'100%'} height={height}>
        <LineChart data={data} margin={{ top: 10, right: 10, left: -35 }}>
          <Line type="monotone" dataKey="x" stroke="#8884d8"/>
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip/>
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
