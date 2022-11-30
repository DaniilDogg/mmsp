import "./Lab8.css";
import React, { useState, useRef, useEffect, useCallback, memo } from "react";

import { InputGroup } from "../InputGroup";

import { Diagram } from "./components/Diagram";

export default function Lab8() {
  const ref_n0 = useRef();
  const ref_m2 = useRef();
  const ref_m0 = useRef();
  const ref_mk = useRef();
  const ref_dm = useRef();
  const ref_p0 = useRef();
  const ref_pk = useRef();
  const ref_dp = useRef();
  const ref_d0 = useRef();
  const ref_dk = useRef();
  const ref_dd = useRef();

  const [data, setData] = useState(null);

  const main = useRef(null);

  const buildDiagram = (
    rn0,
    rm2,
    rm0,
    rmk,
    rdm,
    rp0,
    rpk,
    rdp,
    rd0,
    rdk,
    rdd
  ) => {
    const d = {      
      m0: (rm0 == 0 ? 0.95 : rm0) * 1,
      mk: (rmk == 0 ? 3.35 : rmk) * 1,
      dm: (rdm == 0 ? 0.05 : rdm) * 1,
      p0: (rp0 == 0 ? 2.9 : rp0) * 1,
      pk: (rpk == 0 ? 7.7 : rpk) * 1,
      dp: (rdp == 0 ? 0.1 : rdp) * 1,
      d0: (rd0 == 0 ? 3.2 : rd0) * 1,
      dk: (rdk == 0 ? 8 : rdk) * 1,
      dd: (rdd == 0 ? 0.1 : rdd) * 1,
      n0: (rn0 == 0 ? 25 : rn0) * 10 ** 3,
      m2: (rm2 == 0 ? 0.12 : rm2) * 1,
    };
    const [model, modelArguments] = getModel(d);
    //console.log(model, modelArguments);
    const myData = [];
    for (let i = 0; i < model.length; i++) {
      myData.push({ Y: model[i]-0.9, X: modelArguments[i] });
    }
    //console.log(myData)
    setData(myData);
  };

  const getModel = (inputData) => {
    const model = [];
    const modelArguments = [];
    const iterationArgsKeys = ["m", "p", "d"];
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
          iterationArgs.m,
          iterationArgs.p,
          iterationArgs.d,
          inputData.n0,
          inputData.m2
        )
      );
      modelArguments.push(iteration);
      iterationArgsKeys.forEach((key) => {
        iterationArgs[key] += inputData[`d${key}`];
      });
    }

    console.log(model);

    return [model, modelArguments];
  };

  function modelEquation(mu, ro, d, N, mu2) {
    const N_b = buger(N, mu, ro, d);
    return ((1 / (mu - mu2)) * ((1 / (ro * d)) * Math.log(N / N_b)) - mu2);
  }

  function buger(N0, mu, ro, d) {
    return N0 * Math.exp(-mu * ro * d);
  }

  const inputs = [
    [
      {
        ref: ref_n0,
        label1: (
          <span>
            N<sub>0</sub>
          </span>
        ),
        label2: (
          <span>
            *10<sub>3</sub>
          </span>
        ),
        placeholder: "25",
      },
      {
        ref: ref_m2,
        label1: (
          <span>
            μ<sub>2</sub>
          </span>
        ),
        label2: <span>*1</span>,
        placeholder: "0.12",
      },
    ],
    [
      {
        ref: ref_m0,
        label1: (
          <span>
            μ<sub>0</sub>
          </span>
        ),
        label2: <span>*1</span>,
        placeholder: "0.95",
      },
      {
        ref: ref_mk,
        label1: (
          <span>
            μ<sub>k</sub>
          </span>
        ),
        label2: <span>*1</span>,
        placeholder: "3.35",
      },
      {
        ref: ref_dm,
        label1: (
          <span>
            dμ<sub></sub>
          </span>
        ),
        label2: <span>*1</span>,
        placeholder: "0.05",
      },
    ],
    [
      {
        ref: ref_p0,
        label1: (
          <span>
            p<sub>0</sub>
          </span>
        ),
        label2: <span>*1</span>,
        placeholder: "2.9",
      },
      {
        ref: ref_pk,
        label1: (
          <span>
            p<sub>k</sub>
          </span>
        ),
        label2: <span>*1</span>,
        placeholder: "7.7",
      },
      {
        ref: ref_dp,
        label1: (
          <span>
            dp<sub></sub>
          </span>
        ),
        label2: <span>*1</span>,
        placeholder: "0.1",
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
        placeholder: "3.2",
      },
      {
        ref: ref_dk,
        label1: (
          <span>
            d<sub>k</sub>
          </span>
        ),
        label2: <span>*1</span>,
        placeholder: "8",
      },
      {
        ref: ref_dd,
        label1: (
          <span>
            dd<sub></sub>
          </span>
        ),
        label2: <span>*1</span>,
        placeholder: "0.1",
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
                ref_n0.current.value,
                ref_m2.current.value,
                ref_m0.current.value,
                ref_mk.current.value,
                ref_dm.current.value,
                ref_p0.current.value,
                ref_pk.current.value,
                ref_dp.current.value,
                ref_d0.current.value,
                ref_dk.current.value,
                ref_dd.current.value
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
