import "./Lab9.css";
import React, { useState, useRef, useEffect, useCallback, memo } from "react";

import { InputGroup } from "../InputGroup";

import { Diagram } from "./components/Diagram";

export default function Lab9() {
  const ref_Q = useRef();
  const ref_A = useRef();

  const ref_d0 = useRef();
  const ref_dk = useRef();
  const ref_dd = useRef();

  const ref_a0 = useRef();
  const ref_ak = useRef();
  const ref_da = useRef();

  const ref_r0 = useRef();
  const ref_rk = useRef();
  const ref_dr = useRef();

  const ref_h0 = useRef();
  const ref_hk = useRef();
  const ref_dh = useRef();

  const [data, setData] = useState(null);

  const main = useRef(null);

  const buildDiagram = (
    rQ,
    rA,

    rd0,
    rdk,
    rdd,

    ra0,
    rak,
    rda,

    rr0,
    rrk,
    rdr,

    rh0,
    rhk,
    rdh
  ) => {
    const d = {
      Q: (rQ == 0 ? 15 : rQ) * 1,
      A: (rA == 0 ? 1 : rA) * 1,

      d0: (rd0 == 0 ? 5.6 : rd0) * 1,
      dk: (rdk == 0 ? 13.6 : rdk) * 1,
      dd: (rdd == 0 ? 0.2 : rdd) * 1,

      a0: (ra0 == 0 ? 36 : ra0) * 1,
      ak: (rak == 0 ? 230 : rak) * 1,
      da: (rda == 0 ? 5 : rda) * 1,

      r0: (rr0 == 0 ? 10.5 : rr0) * 1,
      rk: (rrk == 0 ? 30.5 : rrk) * 1,
      dr: (rdr == 0 ? 0.5 : rdr) * 1,

      h0: (rh0 == 0 ? 4.25 : rh0) * 1,
      hk: (rhk == 0 ? 14.25 : rhk) * 1,
      dh: (rdh == 0 ? 0.25 : rdh) * 1,
    };
    const [model, modelArguments] = getModel(d);
    //console.log(model, modelArguments);
    const myData = [];
    for (let i = 0; i < model.length; i++) {
      if(i > 6){
        myData.push({ Y: model[i], X: modelArguments[i] });
      }      
    }
    //console.log(myData)
    setData(myData);
  };

  const getModel = (inputData) => {
    const model = [];
    const modelArguments = [];

    const iterationArgsKeys = ["h", "d", "r", "a"];
    let iterationArgs = {};

    iterationArgsKeys.forEach((key) => {
      iterationArgs[key] = inputData[`${key}0`];
    });

    const condition = (key, value) => {
      return value <= inputData[`${key}k`] + 1e-6;
    };

    let forcedStopIterationBorder = 1000;

    for (
      let iteration = 0;
      iteration < forcedStopIterationBorder;
      iteration++
    ) {
      if (
        !condition(iterationArgsKeys[0], iterationArgs[iterationArgsKeys[0]])
      ) {
        break;
      }

      model.push(
        modelEquation(
          iterationArgs.h + 1.5,
          inputData.d0,
          inputData.a0,
          inputData.r0,
          inputData.Q,
          inputData.A
        )
      );

      modelArguments.push(iterationArgs.h);

      iterationArgsKeys.forEach((key) => {
        iterationArgs[key] += inputData[`d${key}`];
      });
    }

    console.log(model);

    return [model, modelArguments];
  };

  function modelEquation(h, d, alpha, R, Q, A) {
    alpha = degToRad(alpha);

    const B = b_func(A, Q, d, alpha);

    const N =
      (B * h * Math.pow(Math.cos(alpha), 3)) /
      Math.pow(
        Math.pow(R, 2) * Math.pow(Math.cos(alpha), 2) -
          R * h * Math.sin(2 * alpha) +
          Math.pow(h, 2),
        3 / 2
      );

    return N;
  }

  function b_func(A, Q, d, alpha) {
    return ((A * Q * Math.pow(d, 2)) / 64) * Math.pow(Math.tan(alpha / 2), 2);
  }

  function degToRad(deg) {
    return deg * (Math.PI / 180.0);
  }

  const inputs = [
    [
      {
        ref: ref_Q,
        label1: (
          <span>
            Q<sub></sub>
          </span>
        ),
        label2: <span>*1</span>,
        placeholder: "15",
      },
      {
        ref: ref_A,
        label1: (
          <span>
            A<sub></sub>
          </span>
        ),
        label2: <span>*1</span>,
        placeholder: "1",
      },
    ],
    [
      {
        ref: ref_d0,
        label1: (
          <span>
            d<sub>0</sub>
          </span>
        ),
        label2: <span>*1</span>,
        placeholder: "5.6",
      },
      {
        ref: ref_dk,
        label1: (
          <span>
            d<sub>k</sub>
          </span>
        ),
        label2: <span>*1</span>,
        placeholder: "13.6",
      },
      {
        ref: ref_dd,
        label1: (
          <span>
            dd<sub></sub>
          </span>
        ),
        label2: <span>*1</span>,
        placeholder: "0.2",
      },
    ],
    [
      {
        ref: ref_a0,
        label1: (
          <span>
            α<sub>0</sub>
          </span>
        ),
        label2: <span>*1</span>,
        placeholder: "36",
      },
      {
        ref: ref_ak,
        label1: (
          <span>
            α<sub>k</sub>
          </span>
        ),
        label2: <span>*1</span>,
        placeholder: "230",
      },
      {
        ref: ref_da,
        label1: (
          <span>
            dα<sub></sub>
          </span>
        ),
        label2: <span>*1</span>,
        placeholder: "5",
      },
    ],
    [
      {
        ref: ref_r0,
        label1: (
          <span>
            R<sub>0</sub>
          </span>
        ),
        label2: <span>*1</span>,
        placeholder: "10.5",
      },
      {
        ref: ref_rk,
        label1: (
          <span>
            R<sub>k</sub>
          </span>
        ),
        label2: <span>*1</span>,
        placeholder: "30.5",
      },
      {
        ref: ref_dr,
        label1: (
          <span>
            dR<sub></sub>
          </span>
        ),
        label2: <span>*1</span>,
        placeholder: "0.5",
      },
    ],
    [
      {
        ref: ref_h0,
        label1: (
          <span>
            h<sub>0</sub>
          </span>
        ),
        label2: <span>*1</span>,
        placeholder: "4.25",
      },
      {
        ref: ref_hk,
        label1: (
          <span>
            h<sub>k</sub>
          </span>
        ),
        label2: <span>*1</span>,
        placeholder: "14.25",
      },
      {
        ref: ref_dh,
        label1: (
          <span>
            dh<sub></sub>
          </span>
        ),
        label2: <span>*1</span>,
        placeholder: "0.25",
      },
    ],
  ];
  return (
    <div>
      <div className="container lab5" style={{ height: "100vh" }} ref={main}>
        <div className="d-flex py-2 px-0 mt-4">
          <InputGroup inputs={inputs} />
        </div>
        <div className="d-flex w-100 justify-content-center">
          <button
            type="button"
            className="btn btn-primary mt-3 justify-content-center"
            onClick={() => {
              buildDiagram(
                ref_Q.current.value,
                ref_A.current.value,

                ref_d0.current.value,
                ref_dk.current.value,
                ref_dd.current.value,

                ref_a0.current.value,
                ref_ak.current.value,
                ref_da.current.value,

                ref_r0.current.value,
                ref_rk.current.value,
                ref_dr.current.value,

                ref_h0.current.value,
                ref_hk.current.value,
                ref_dh.current.value
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
