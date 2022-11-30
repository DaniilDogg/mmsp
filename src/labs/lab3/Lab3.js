import "./Lab3.css";
import React, { useState, useRef, useEffect, useCallback, memo } from "react";
import { MathComponent } from "mathjax-react";

import { InputGroup } from "../InputGroup";

import { Diagram } from "./components/Diagram";

/*
  x   x1    m0    mk    dm    c0    ck    Dc    Kтр0    Kтрk    dKтр
  2   20    27    33	  300   2     4     10    24      34      500
*/
export default function Lab3() {
  const ref_x = useRef(); //2
  const ref_x1 = useRef(); //20
  const ref_m0 = useRef(); //27
  const ref_mk = useRef(); //33
  const ref_dm = useRef(); //300
  const ref_c0 = useRef(); //2
  const ref_ck = useRef(); //4
  const ref_dc = useRef(); //10
  const ref_ktr0 = useRef(); //24
  const ref_ktrk = useRef(); //34
  const ref_dktr = useRef(); //500
  const ref_t0 = useRef(); //0
  const ref_tk = useRef(); //5
  const ref_dt = useRef(); //0.05

  const [data, setData] = useState(null);

  const main = useRef(null);

  const buildDiagram = (
    rx,
    rx1,
    rm0,
    rmk,
    rdm,
    rc0,
    rck,
    rdc,
    rktr0,
    rktrk,
    rdktr,
    rt0,
    rtk,
    rdt
  ) => {
    const x = (rx == 0 ? 2 : rx) * 1;
    const x1 = (rx1 == 0 ? 20 : rx1) * 1;
    const m0 = (rm0 == 0 ? 27 : rm0) * 100;
    const mk = (rmk == 0 ? 33 : rmk) * 100;
    const dm = (rdm == 0 ? 300 : rdm) * 1;
    const c0 = (rc0 == 0 ? 2 : rc0) * 10000;
    const ck = (rck == 0 ? 4 : rck) * 10000;
    const dc = (rdc == 0 ? 10 : rdc) * 1000;
    const ktr0 = (rktr0 == 0 ? 24 : rktr0) * 100;
    const ktrk = (rktrk == 0 ? 34 : rktrk) * 100;
    const dktr = (rdktr == 0 ? 500 : rdktr) * 1;
    const t0 = (rt0 == 0 ? 0 : rt0) * 1;
    const tk = (rtk == 0 ? 5 : rtk) * 1;
    const dt = (rdt == 0 ? 0.05 : rdt) * 1;
    let c = c0;
    let k = ktr0;
    let id = 0;
    const d = [];
    for (let m = m0; m <= mk; m += dm) {
      d.push(modelEquation(x, x1, m, c, k, t0, tk, dt, id++));
      c += dc;
      k += dktr;
    }
    const myData = [];
    for (let i = 0; i < d[0].length; i++) {
      const obj = {};
      for (let j = 0; j < d.length; j++) {
        Object.assign(obj, d[j][i]);
      }
      myData.push(obj);
    }
    //console.log(myData)
    setData(myData);
  };

  const modelEquation = (x, x1, m, c, k, t0, tk, dt, id) => {
    let mCur = m,
      cCur = c,
      kCur = k;

    let func = (x1, x2, k = kCur, c = cCur, m = mCur) => {
      const P = 0;
      return (-k * x2 - c * x1 + P) / m;
    };

    const eulerMethodIterationCount = (tk - t0) / dt;

    const model = EulerMethod(eulerMethodIterationCount, dt, x, x1, func);

    let modelArguments = [];
    for (let i = 0; i < model[1].length; i++) {
      modelArguments.push(Number((dt * i + +t0).toFixed(4)));
    }
    const d = [];
    for (let i = 0; i < modelArguments.length; i++) {
      d.push({ X: modelArguments[i], ["Y" + id]: model[1][i] });
    }
    return d;
  };

  const EulerMethod = (n, h, x1_0, x2_0, func) => {
    // ? x1_i+1 = x1_i + h * x2_i
    // ? x2_i+1 = x2_i + h * (-k * x2_i - c * x1_i + P) / m

    let x1 = [x1_0];
    let x2 = [x2_0];

    for (let i = 0; i < n; i++) {
      let x1_prev = x1[x1.length - 1];
      let x2_prev = x2[x2.length - 1];

      x1.push(x1_prev + h * x2_prev);
      x2.push(x2_prev + h * func(x1_prev, x2_prev));
    }

    return [x1, x2];
    //return { time: x1, x: x2 }
  };

  const inputs = [
    [
      {
        ref: ref_x,
        label1: (
          <span>
            x<sub></sub>
          </span>
        ),
        placeholder: "2",
      },
      {
        ref: ref_x1,
        label1: (
          <span>
            x<sub>1</sub>[0]
          </span>
        ),
        placeholder: "22",
      },
    ],
    [
      {
        ref: ref_m0,
        label1: (
          <span>
            m<sub>0</sub>
          </span>
        ),
        label2: (
          <span>
            *10<sup>2</sup>
          </span>
        ),
        placeholder: "27",
      },
      {
        ref: ref_mk,
        label1: (
          <span>
            m<sub>k</sub>
          </span>
        ),
        label2: (
          <span>
            *10<sup>2</sup>
          </span>
        ),
        placeholder: "33",
      },
      {
        ref: ref_dm,
        label1: (
          <span>
            dm<sub></sub>
          </span>
        ),
        placeholder: "300",
      },
    ],
    [
      {
        ref: ref_c0,
        label1: (
          <span>
            c<sub>0</sub>
          </span>
        ),
        label2: (
          <span>
            *10<sup>4</sup>
          </span>
        ),
        placeholder: "2",
      },
      {
        ref: ref_ck,
        label1: (
          <span>
            c<sub>k</sub>
          </span>
        ),
        label2: (
          <span>
            *10<sup>4</sup>
          </span>
        ),
        placeholder: "4",
      },
      {
        ref: ref_dc,
        label1: (
          <span>
            dc<sub></sub>
          </span>
        ),
        label2: (
          <span>
            *10<sup>3</sup>
          </span>
        ),
        placeholder: "10",
      },
    ],
    [
      {
        ref: ref_ktr0,
        label1: (
          <span>
            k<sub>0</sub>
          </span>
        ),
        label2: (
          <span>
            *10<sup>2</sup>
          </span>
        ),
        placeholder: "24",
      },
      {
        ref: ref_ktrk,
        label1: (
          <span>
            k<sub>k</sub>
          </span>
        ),
        label2: (
          <span>
            *10<sup>2</sup>
          </span>
        ),
        placeholder: "34",
      },
      {
        ref: ref_dktr,
        label1: (
          <span>
            dk<sub></sub>
          </span>
        ),
        placeholder: "500",
      },
    ],
    [
      {
        ref: ref_t0,
        label1: (
          <span>
            t<sub>0</sub>
          </span>
        ),
        placeholder: "0",
      },
      {
        ref: ref_tk,
        label1: (
          <span>
            t<sub>k</sub>
          </span>
        ),
        placeholder: "5",
      },
      {
        ref: ref_dt,
        label1: (
          <span>
            dt<sub></sub>
          </span>
        ),
        placeholder: "0.05",
      },
    ],
  ];
  return (
    <div>
      <div className="container lab3" style={{ height: "100vh" }} ref={main}>
        <div className="d-flex py-2 px-0 mt-4">
          <InputGroup inputs={inputs} />
        </div>
        <div className="d-flex w-100 justify-content-center">
          <button
            type="button"
            className="btn btn-primary mt-3 justify-content-center"
            onClick={() => {
              buildDiagram(
                ref_x.current.value,
                ref_x1.current.value,
                ref_m0.current.value,
                ref_mk.current.value,
                ref_dm.current.value,
                ref_c0.current.value,
                ref_ck.current.value,
                ref_dc.current.value,
                ref_ktr0.current.value,
                ref_ktrk.current.value,
                ref_dktr.current.value,
                ref_t0.current.value,
                ref_tk.current.value,
                ref_dt.current.value
              );
            }}
          >
            Построить график
          </button>
        </div>
        {data != null ? (
          <>
            <Diagram data={data} w={main?.current?.offsetWidth} />
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
