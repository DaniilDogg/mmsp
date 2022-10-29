import "./Lab1_2.css";
import React, { useState, useRef, useEffect, useCallback, memo } from "react";
import { MathComponent } from "mathjax-react";

import { InputGroup } from "../InputGroup";
import { Diagram } from "./components/Diagram";

/*
  a	  c1	  c2	  t0	  tk	  dt	  f0	  fk	  df
  2	  -10	  10	  0.1	  2	    0.2	  5	    10	  5
*/

export default function Lab1_2() {
  const ref_a = useRef(); //2
  const ref_c1 = useRef(); //-10
  const ref_c2 = useRef(); //10
  const ref_t0 = useRef(); //0.1
  const ref_tk = useRef(); //2
  const ref_dt = useRef(); //0.2
  const ref_f0 = useRef(); //5
  const ref_fk = useRef(); //10
  const ref_df = useRef(); //5

  const [data, setData] = useState(null);

  const buildDiagram = (ra, rc1, rc2, rt0, rtk, rdt, rf0, rfk, rdf) => {
    const a = ra == 0 ? 2 : ra
    const c1 = rc1 == 0 ? -10 : rc1
    const c2 = rc2 == 0 ? 10 : rc2
    const t0 = rt0 == 0 ? 0.1 : rt0
    const tk = rtk == 0 ? 2 : rtk
    const dt = rdt == 0 ? 0.2 : rdt
    const f0 = rf0 == 0 ? 5 : rf0
    const fk = rfk == 0 ? 10 : rfk
    const df = rdf == 0 ? 5 : rdf
    if (dt <= 0) {
      alert("dt cannot be less than or equal to zero");
      return;
    }
    let f = parseFloat(f0);
    const d = [];
    for (
      let t = parseFloat(t0);
      t <= parseFloat(tk);
      t += parseFloat(dt)
    ) {
      let X =
        Math.exp(-a * t) *
        (parseFloat(c1) * Math.cos(2 * Math.PI * f * t) +
          parseFloat(c2) * Math.sin(2 * Math.PI * f * t));
      d.push({ time: t.toFixed(2), x: X });
      f += parseFloat(df);
    }
    setData(d);
  };
  
  const main = useRef(null);

  const inputs = [
    [
      {
        label: "a",
        placeholder: "2",
        ref: ref_a
      },
      {
        ref: ref_c1,
        label: <span>c<sub>1</sub></span>,
        placeholder: "-10",
      },
      {
        ref: ref_c2,
        label: <span>c<sub>2</sub></span>,
        placeholder: "10",
      },
    ],
    [
      {
        ref: ref_t0,
        label: <span>t<sub>0</sub></span>,
        placeholder: "0.1",
      },
      {
        ref: ref_tk,
        label: <span>t<sub>k</sub></span>,
        placeholder: "2",
      },
      {
        ref: ref_dt,
        label: <span>d<sub>t</sub></span>,
        placeholder: "0.2",
      },
    ],
    [
      {
        ref: ref_f0,
        label: <span>f<sub>0</sub></span>,
        placeholder: "5",
      },
      {
        ref: ref_fk,
        label: <span>f<sub>k</sub></span>,
        placeholder: "10",
      },
      {
        ref: ref_df,
        label: <span>d<sub>f</sub></span>,
        placeholder: "5",
      },
    ],
  ];
  return (
    <div>
      <div className="container lab1-2" style={{ height: "100vh" }} ref={main}>
        <MathComponent
          className="mw-100 w-25"
          tex={String`exp(-at)*(c_{1}*cos(ωt)+ c_{2}*sin(ωt))`}
        />
        <div className="d-flex py-2 px-0 mt-4">
          <InputGroup inputs={inputs}/>
        </div>

        <div className="d-flex w-100 justify-content-center">
          <button
            type="button"
            className="btn btn-primary mt-3 justify-content-center"
            onClick={()=>{
              buildDiagram(ref_a.current.value, ref_c1.current.value, ref_c2.current.value, ref_t0.current.value, ref_tk.current.value, ref_dt.current.value, ref_f0.current.value, ref_fk.current.value, ref_df.current.value)
            }}
          >
            Построить график
          </button>
        </div>        

        {data != null ? (
          <Diagram data={data} w={main?.current?.offsetWidth} />
        ) : (
          <></>
        )}
        <br />
      </div>
    </div>
  );
}