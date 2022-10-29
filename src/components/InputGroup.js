import React from "react";
import { CustomInput } from "./Input";

export const InputGroup = ({ inputs }) => {
  let kr = 0;
  return (
    <div className="container d-grid gap-3">
      {inputs.map((row) => {
        let kc = 0;
        return (
          <div className={`d-flex justify-content-center`} key={kr++}>
            {row.map((input) => {
              //console.log(input)
              return (
                <div className="px-2" key={kc++}>
                  <CustomInput
                    label={input.label}
                    placeholder={input.placeholder}
                    inputRef={input.ref}
                  />
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};
