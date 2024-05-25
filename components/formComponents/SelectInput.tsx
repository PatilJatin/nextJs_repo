import { singleSelectStyles } from "@/helpers/adminpanel/inputs/singleSelectStyles";
import { OPTION } from "@/types/common.types";
import React, { forwardRef, useId } from "react";
import Select, { SelectComponentsConfig } from "react-select";
import InputLabel from "./InputLabel";
import InputError from "./InputError";

type SingleSelectInputType = {
  options: OPTION[];
  label?: string;
  error?: string;
  required?: boolean;
  id?: string;
};

const SingleSelectInput = forwardRef<HTMLSelectElement, SingleSelectInputType>(
  function SelectInput({ options, label, error, required, id, ...props }, ref) {
    const components = {
      IndicatorSeparator: null,
    };

    return (
      <div>
        <div className="mb-3">
          <InputLabel htmlFor={id}>
            {label}
            {required ? "*" : null}
          </InputLabel>
        </div>
        <div className="mb-1">
          <Select
            inputId={id}
            instanceId={useId()}
            options={options}
            styles={singleSelectStyles}
            components={components}
            {...props}
          />
        </div>
        {error ? <InputError>{error}</InputError> : null}
      </div>
    );
  }
);

export default SingleSelectInput;
