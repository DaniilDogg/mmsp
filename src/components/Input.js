import React from "react";
export const CustomInput = (props) => {
  console.log(props.label2)
  const label2 = props.label2 == null ? '*1' : props.label2
  return (
    <div className="input-group justify-content-center">
      <span className="input-group-text label1 d-block text-center">
        {props.label1}
      </span>
      <input
        style={{ maxWidth: "150px" }}
        type="number"
        className="form-control"
        placeholder={props.placeholder}
        ref={props.inputRef}
      />
      <span className="input-group-text label2">{label2}</span>
    </div>
  );
};
