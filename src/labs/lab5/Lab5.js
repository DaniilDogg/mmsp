import "./Lab5.css";
import React, { useState, useRef, useEffect, useCallback, memo } from "react";

import { InputGroup } from "../InputGroup";

import { Diagram } from "./components/Diagram";

export default function Lab5() {
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

    for (let m = m0; m <= mk; m += dm) {
      d.push(modelEquation(x, x1, y, y1, m, c, K, t0, tk, dt, id++));
      c += dc;
      K += dK;
    }

    const myData = [];
    for (let i = 0; i < d[0].length; i++) {
      const obj = {};
      for (let j = 0; j < d.length; j++) {
        Object.assign(obj, d[j][i]);
      }
      myData.push(obj);
    }
    console.log(myData)
    setData(myData);
  };

  function modelEquation(x, x1, y, y1, m, c, k, t0, tk, dt, id) {
    let mCur = m,
      cCur = c,
      kCur = k;

    let func = (x1, x2, y1, y2, k = kCur, c = cCur, m = mCur, g = 9.8) => {
      let cage, cargo;

      cage = -(g + (k * x2) / m - (c * (y1 - x1)) / m);
      cargo = -(g + (c * (y1 - x1)) / m);

      return [cage, cargo];
    };

    const model = EulerMethod((tk - t0) / dt, dt, x, x1, y, y1, func);

    let modelArguments = [];
    for (let i = 0; i < model[1].length; i++) {
      modelArguments.push(Number((dt * i + t0).toFixed(4)));
    }

    const d = [];
    for (let i = 0; i < modelArguments.length; i++) {
      d.push({ X: modelArguments[i], ["Y" + id]: model[1][i] });
    }
    //console.log('Array d - ', d)
    return d;
  }

  function EulerMethod(n, h, x1_0, x2_0, y1_0, y2_0, func) {
    let x1 = [x1_0];
    let x2 = [x2_0];

    let y1 = [y1_0];
    let y2 = [y2_0];

    for (let i = 0; i < n; i++) {
      let x1_prev = x1[x1.length - 1];
      let x2_prev = x2[x2.length - 1];

      let y1_prev = y1[y1.length - 1];
      let y2_prev = y2[y2.length - 1];

      x1.push(x1_prev + h * x2_prev);
      y1.push(y1_prev + h * y2_prev);

      let [cage, cargo] = func(x1_prev, x2_prev, y1_prev, y2_prev);

      x2.push(x2_prev + h * cage);
      y2.push(y2_prev + h * cargo);
    }

    return [x1, x2, y1, y2];
  }

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
