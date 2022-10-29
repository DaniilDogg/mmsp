import React from "react";
export const CustomInput = (props) => {
  //console.log(props)
  return (
    <div className="input-group justify-content-center">
      <span className="input-group-text label d-block text-center">
        {props.label}
      </span>
      <input
        style={{maxWidth: '150px'}}
        type="number"
        className="form-control"
        placeholder={props.placeholder}
        ref={props.inputRef}
      />
    </div>
  );
};
