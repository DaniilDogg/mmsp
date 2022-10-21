import React from "react";
import { CustomInput } from "./Input";

export const InputGroup = (props) => (
  <div className="container-sm d-grid gap-3 py-2 px-0 mt-4">
    <div className="row g-3">
      <div className="col-md">
        <CustomInput
          label={"a"}
          placeholder={2}
          value={props.a.value}
          onChange={props.a.onChange}
        />
      </div>

      <div className="col-md">
        <CustomInput
          label={"c"}
          sub={"1"}
          placeholder={-10}
          value={props.c1.value}
          onChange={props.c1.onChange}
        />
      </div>

      <div className="col-md">
        <CustomInput
          label={"c"}
          sub={"2"}
          placeholder={10}
          value={props.c2.value}
          onChange={props.c2.onChange}
        />
      </div>
    </div>

    <div className="row g-3">
      <div className="col-md">
        <CustomInput
          label={"t"}
          sub={"0"}
          placeholder={0.1}
          value={props.t0.value}
          onChange={props.t0.onChange}
        />
      </div>

      <div className="col-md">
        <CustomInput
          label={"t"}
          sub={"k"}
          placeholder={2}
          value={props.tk.value}
          onChange={props.tk.onChange}
        />
      </div>

      <div className="col-md">
        <CustomInput
          label={"dt"}
          placeholder={0.2}
          value={props.dt.value}
          onChange={props.dt.onChange}
        />
      </div>
    </div>

    <div className="row g-3">
      <div className="col-md">
        <CustomInput
          label={"f"}
          sub={"0"}
          placeholder={5}
          value={props.f0.value}
          onChange={props.f0.onChange}
        />
      </div>

      <div className="col-md">
        <CustomInput
          label={"f"}
          sub={"k"}
          placeholder={10}
          value={props.fk.value}
          onChange={props.fk.onChange}
        />
      </div>

      <div className="col-md">
        <CustomInput
          label={"df"}
          placeholder={5}
          value={props.df.value}
          onChange={props.df.onChange}
        />
      </div>
    </div>
  </div>
);