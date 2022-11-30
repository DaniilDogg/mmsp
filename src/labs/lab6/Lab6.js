import "./Lab6.css";
import React, { useState, useRef, useEffect, useCallback, memo } from "react";

import { InputGroup } from "../InputGroup";

import { Diagram } from "./components/Diagram";

export default function Lab6() {
  const ref_x1 = useRef();
  const ref_x = useRef();
  const ref_y1 = useRef();
  const ref_y = useRef();
  const ref_m0 = useRef();
  const ref_mk = useRef();
  const ref_dm = useRef();
  const ref_c0 = useRef();
  const ref_ck = useRef();
  const ref_dc = useRef();
  const ref_K0 = useRef();
  const ref_Kk = useRef();
  const ref_dK = useRef();
  const ref_t0 = useRef();
  const ref_tk = useRef();
  const ref_dt = useRef();

  const [data, setData] = useState(null);

  const main = useRef(null);

  const buildDiagram = (
    rx1,
    rx,
    ry1,
    ry,
    rm0,
    rmk,
    rdm,
    rc0,
    rck,
    rdc,
    rK0,
    rKk,
    rdK,
    rt0,
    rtk,
    rdt
  ) => {
    const x1 = (rx1 == 0 ? 10 : rx1) * 1;
    const x = (rx == 0 ? 2.2 : rx) * 1;
    const y1 = (ry1 == 0 ? 11 : ry1) * 1;
    const y = (ry == 0 ? 2.3 : ry) * 1;
    const m0 = (rm0 == 0 ? 55 : rm0) * 10 ** 2;
    const mk = (rmk == 0 ? 67 : rmk) * 10 ** 2;
    const dm = (rdm == 0 ? 600 : rdm) * 1;
    const c0 = (rc0 == 0 ? 100 : rc0) * 10 ** 4;
    const ck = (rck == 0 ? 105 : rck) * 10 ** 4;
    const dc = (rdc == 0 ? 2.5 : rdc) * 10 ** 4;
    const K0 = (rK0 == 0 ? 18 : rK0) * 10 ** 3;
    const Kk = (rKk == 0 ? 19.2 : rKk) * 10 ** 3;
    const dK = (rdK == 0 ? 6 : rdK) * 10 ** 2;
    const t0 = (rt0 == 0 ? 3 : rt0) * 1;
    const tk = (rtk == 0 ? 4 : rtk) * 1;
    const dt = (rdt == 0 ? 0.005 : rdt) * 1;

    let c = c0;
    let K = K0;
    let id = 0;
    const d = [];

    const func = (x, k, g = 9.8) => {
      return (k * x) / g
    };
    let k = 4;
    const startSpeedArguments = [10, 7.5, 5, 2.5];
    const model = [];
    const modelArguments = [];
    startSpeedArguments.forEach((startSpeed) => {
      modelArguments.push(Number(startSpeed));
      model.push(func(startSpeed, k));
    });
    console.log(model, modelArguments);

    const myData = [];
    for (let i = 0; i < model.length; i++) {
      myData.push({ Y: model[i].toFixed(2), X: modelArguments[i].toFixed(2) });
    }
    //console.log(myData)
    setData(myData);
  };

  //---------

  const inputs = [
    [
      {
        ref: ref_x1,
        label1: (
          <span>
            x<sub>1</sub>
          </span>
        ),
        placeholder: "10",
      },
      {
        ref: ref_x,
        label1: (
          <span>
            x<sub></sub>
          </span>
        ),
        placeholder: "2.2",
      },
    ],
    [
      {
        ref: ref_y1,
        label1: (
          <span>
            y<sub>1</sub>
          </span>
        ),
        placeholder: "11",
      },
      {
        ref: ref_y,
        label1: (
          <span>
            y<sub></sub>
          </span>
        ),
        placeholder: "2.3",
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
        placeholder: "55",
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
        placeholder: "67",
      },
      {
        ref: ref_dm,
        label1: (
          <span>
            dm<sub></sub>
          </span>
        ),
        placeholder: "600",
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
        placeholder: "100",
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
        placeholder: "105",
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
            *10<sup>4</sup>
          </span>
        ),
        placeholder: "2.5",
      },
    ],
    [
      {
        ref: ref_K0,
        label1: (
          <span>
            K<sub>0</sub>
          </span>
        ),
        label2: (
          <span>
            *10<sup>3</sup>
          </span>
        ),
        placeholder: "18",
      },
      {
        ref: ref_Kk,
        label1: (
          <span>
            K<sub>k</sub>
          </span>
        ),
        label2: (
          <span>
            *10<sup>3</sup>
          </span>
        ),
        placeholder: "19.2",
      },
      {
        ref: ref_dK,
        label1: (
          <span>
            dK<sub></sub>
          </span>
        ),
        label2: (
          <span>
            *10<sup>2</sup>
          </span>
        ),
        placeholder: "6",
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
        placeholder: "3",
      },
      {
        ref: ref_tk,
        label1: (
          <span>
            t<sub>k</sub>
          </span>
        ),
        placeholder: "4",
      },
      {
        ref: ref_dt,
        label1: (
          <span>
            dt<sub></sub>
          </span>
        ),
        placeholder: "0.005",
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
                ref_x1.current.value,
                ref_x.current.value,
                ref_y1.current.value,
                ref_y.current.value,
                ref_m0.current.value,
                ref_mk.current.value,
                ref_dm.current.value,
                ref_c0.current.value,
                ref_ck.current.value,
                ref_dc.current.value,
                ref_K0.current.value,
                ref_Kk.current.value,
                ref_dK.current.value,
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