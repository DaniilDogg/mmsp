import React, { useState, useRef, useEffect } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export const Diagram = ({ data, w }) => {
  const chart = useRef(null);
  const [height, setHeight] = useState(w / 2);

  const resizeHandler = () => {
    if (chart.current != null) {
      setHeight(chart?.current?.offsetWidth / 2);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", resizeHandler);

    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);

  if (data == null) return <></>;
  let i = 0;
  return (
    <div
      className="container-fluid d-flex justify-content-center align-items-center mt-4 py-2 border border-secondary rounded border-opacity-50"
      ref={chart}
    >
      <ResponsiveContainer width={"100%"} height={height}>
        <LineChart data={data} margin={{ top: 10, right: 10, left: -35 }}>
          {data.map((line) => {
            return (
              <Line key={i} type="monotone" dataKey={`Y${i++}`} stroke="#8884d8" />
            );
          })}
          <XAxis dataKey="X" />
          <YAxis />
          <CartesianGrid stroke="#eee" strokeDasharray="5 5"/>
          <Tooltip/>
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
