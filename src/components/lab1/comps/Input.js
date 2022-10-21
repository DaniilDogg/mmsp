import React from "react";
export const CustomInput = ({
  label,
  sub = "",
  placeholder,
  value = "",
  onChange,
}) => {
  return (
    <div className="input-group">
      <span className="input-group-text label d-block text-center">
        {label}
        <sub>{sub}</sub>
      </span>
      <input
        type="number"
        className="form-control"
        placeholder={placeholder}
        //value={value}
        onChange={onChange}
      />
    </div>
  );
};
