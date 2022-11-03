import "./Lab4.css";
import React, { useState, useRef, useEffect, useCallback, memo } from "react";

import { InputGroup } from "../InputGroup";

import { Diagram } from "./components/Diagram";

export default function Lab4() {
  const ref_q1 = useRef(); //19
  const ref_q = useRef(); //500
  const ref_E = useRef(); //500
  const ref_L0 = useRef(); //20
  const ref_Lk = useRef(); //27
  const ref_dL = useRef(); //33
  const ref_R0 = useRef(); //300
  const ref_Rk = useRef(); //2
  const ref_dR = useRef(); //4
  const ref_C0 = useRef(); //10
  const ref_Ck = useRef(); //24
  const ref_dC = useRef(); //34
  const ref_t0 = useRef(); //0
  const ref_tk = useRef(); //5
  const ref_dt = useRef(); //0.05

  const [data, setData] = useState(null);

  const main = useRef(null);

  const buildDiagram = (
    rq1,
    rq,
    rE,
    rL0,
    rLk,
    rdL,
    rR0,
    rRk,
    rdR,
    rC0,
    rCk,
    rdC,
    rt0,
    rtk,
    rdt
  ) => {
    const q1 = (rq1 == 0 ? 19 : rq1) * 10 ** 2;
    const q = rq == 0 ? 2 : rq;
    const E = (rE == 0 ? 27 : rE) * 10 ** 2;
    const L0 = (rL0 == 0 ? 25 : rL0) * 10 ** 2;
    const Lk = (rLk == 0 ? 33 : rLk) * 10 ** 2;
    const dL = rdL == 0 ? 400 : rdL;
    const R0 = (rR0 == 0 ? 25 : rR0) * 10 ** 2;
    const Rk = (rRk == 0 ? 34 : rRk) * 10 ** 2;
    const dR = rdR == 0 ? 450 : rdR;
    const C0 = (rC0 == 0 ? 9 : rC0) * 10 ** 2;
    const Ck = (rCk == 0 ? 17 : rCk) * 10 ** 2;
    const dC = rdC == 0 ? 400 : rdC;
    const t0 = rt0 == 0 ? 0 : rt0;
    const tk = rtk == 0 ? 5 : rtk;
    const dt = rdt == 0 ? 0.05 : rdt;

    let C = C0;
    let R = R0;
    let id = 0;
    const d = [];

    for (let L = L0; L <= Lk; L += dL) {
      d.push(modelEquation(q, q1, L, R, C, E, t0, tk, dt, id++));
      C += dC;
      R += dR;
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

  function modelEquation(q, q1, L, R, C, E, tStart, tStop, tStep, id) {
    console.log(L);

    let LDefault = L,
      RDefault = R,
      CDefault = C,
      EDefault = E;

    let func = (
      q1,
      q2,
      C = CDefault,
      R = RDefault,
      L = LDefault,
      E = EDefault
    ) => {
      return (E - q1 / C - R * q2) / L;
    };

    const eulerMethodIterationCount = (tStop - tStart) / tStep;

    const model = EulerMethod(eulerMethodIterationCount, tStep, q, q1, func);

    let modelArguments = [];
    for (let i = 0; i < model[1].length; i++) {
      modelArguments.push(Number((tStep * i + tStart).toFixed(4)));
    }

    const d = [];
    for (let i = 0; i < modelArguments.length; i++) {
      d.push({ X: modelArguments[i], ["Y" + id]: model[1][i] });
    }
    return d;
  }

  function EulerMethod(n, h, x1_0, x2_0, func) {

    let x1 = [x1_0];
    let x2 = [x2_0];

    for (let i = 0; i < n; i++) {
      let x1_prev = x1[x1.length - 1];
      let x2_prev = x2[x2.length - 1];

      x1.push(x1_prev + h * x2_prev);
      x2.push(x2_prev + h * func(x1_prev, x2_prev));
    }

    return [x1, x2];
  }

  const inputs = [
    [
      {
        ref: ref_q1,
        label1: (
          <span>
            q<sub>1</sub>[0]
          </span>
        ),
        label2: (
          <span>
            *10<sup>2</sup>
          </span>
        ),
        placeholder: "19",
      },
      {
        ref: ref_q,
        label1: (
          <span>
            q<sub></sub>
          </span>
        ),
        placeholder: "22",
      },
      {
        ref: ref_E,
        label1: (
          <span>
            E<sub></sub>
          </span>
        ),
        label2: (
          <span>
            *10<sup>2</sup>
          </span>
        ),
        placeholder: "27",
      },
    ],
    [
      {
        ref: ref_L0,
        label1: (
          <span>
            L<sub>0</sub>
          </span>
        ),
        label2: (
          <span>
            *10<sup>2</sup>
          </span>
        ),
        placeholder: "25",
      },
      {
        ref: ref_Lk,
        label1: (
          <span>
            L<sub>k</sub>
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
        ref: ref_dL,
        label1: (
          <span>
            dL<sub></sub>
          </span>
        ),
        placeholder: "400",
      },
    ],
    [
      {
        ref: ref_R0,
        label1: (
          <span>
            R<sub>0</sub>
          </span>
        ),
        label2: (
          <span>
            *10<sup>2</sup>
          </span>
        ),
        placeholder: "25",
      },
      {
        ref: ref_Rk,
        label1: (
          <span>
            R<sub>k</sub>
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
        ref: ref_dR,
        label1: (
          <span>
            dR<sub></sub>
          </span>
        ),
        placeholder: "450",
      },
    ],
    [
      {
        ref: ref_C0,
        label1: (
          <span>
            C<sub>0</sub>
          </span>
        ),
        label2: (
          <span>
            *10<sup>2</sup>
          </span>
        ),
        placeholder: "9",
      },
      {
        ref: ref_Ck,
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
        placeholder: "17",
      },
      {
        ref: ref_dC,
        label1: (
          <span>
            dC<sub></sub>
          </span>
        ),
        placeholder: "400",
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
      <div className="container lab4" style={{ height: "100vh" }} ref={main}>
        <div className="d-flex py-2 px-0 mt-4">
          <InputGroup inputs={inputs} />
        </div>
        <div className="d-flex w-100 justify-content-center">
          <button
            type="button"
            className="btn btn-primary mt-3 justify-content-center"
            onClick={() => {
              buildDiagram(
                ref_q1.current.value,
                ref_q.current.value,
                ref_E.current.value,
                ref_L0.current.value,
                ref_Lk.current.value,
                ref_dL.current.value,
                ref_R0.current.value,
                ref_Rk.current.value,
                ref_dR.current.value,
                ref_C0.current.value,
                ref_Ck.current.value,
                ref_dC.current.value,
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
