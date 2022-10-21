









import "./Lab1.css";
import React, { useState, useRef, useEffect, useCallback, memo } from "react";
import { MathComponent } from "mathjax-react";

import { NavBar } from "../NavBar";
import { InputGroup } from "./comps/InputGroup";
import { useInput } from "./comps/inputHook";
import { Diagram } from "./comps/Diagram";

/*
  a	  c1	  c2	  t0	  tk	  dt	  f0	  fk	  df
  2	  -10	  10	  0.1	  2	    0.2	  5	    10	  5
*/
export default function Lab1() {
  const a = useInput(2); //2
  const c1 = useInput(-10); //-10
  const c2 = useInput(10); //10
  const t0 = useInput(0.1); //0.1
  const tk = useInput(2); //2
  const dt = useInput(0.2); //0.2
  const f0 = useInput(5); //5
  const fk = useInput(10); //10
  const df = useInput(5); //5

  const [data, setData] = useState(null);

  const buildDiagram = () => {
    if (dt.value <= 0) {
      alert("dt cannot be less than or equal to zero");
      return;
    }
    let f = parseFloat(f0.value);
    const d = [];
    for (
      let t = parseFloat(t0.value);
      t <= parseFloat(tk.value);
      t += parseFloat(dt.value)
    ) {
      let X =
        Math.exp(-a.value * t) *
        (parseFloat(c1.value) * Math.cos(2 * Math.PI * f * t) +
          parseFloat(c2.value) * Math.sin(2 * Math.PI * f * t));
      d.push({ time: t.toFixed(2), x: X });
      f += parseFloat(df.value);
    }
    setData(d);
  };

  const main = useRef(null);

  return (
    <div>
      <NavBar title={'Вычисление модели колебательного контура'}/>

      <div className="container" style={{height:'100vh'}} ref={main}>
        
        <MathComponent className='mw-100 w-25' tex={String`exp(-at)*(c_{1}*cos(ωt)+ c_{2}*sin(ωt))`} />

        <InputGroup a={a} c1={c1} c2={c2} t0={t0} tk={tk} dt={dt} f0={f0} fk={fk} df={df}/>

        <button
          type="button"
          className="btn btn-primary mt-3"
          onClick={buildDiagram}
        >
          Построить график
        </button>

        {data != null ? (
          <Diagram data={data} w={main?.current?.offsetWidth} />
        ) : (
          <></>
        )}
        <br/>
      </div>

    </div>
  );
}
