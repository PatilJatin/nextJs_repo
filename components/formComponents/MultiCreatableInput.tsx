"use client";

import React, {
  FC,
  KeyboardEventHandler,
  forwardRef,
  useId,
  useState,
} from "react";
import CreatableSelect from "react-select/creatable";
import InputLabel from "./InputLabel";
import {
  ActionMeta,
  MultiValue,
  MultiValueGenericProps,
  OptionProps,
  StylesConfig,
  components,
} from "react-select";
import InputError from "./InputError";
import {
  UseFormGetValues,
  UseFormSetValue,
  UseFormTrigger,
} from "react-hook-form";
import { PROPERTY_FORM_FIELDS } from "../properties/form/PropertyFormProvider";
import { multiCreatableStyles } from "@/helpers/adminpanel/inputs/multiCreatableStyles";
import { OPTION } from "@/types/common.types";

type MultiCreatableInputProps = {
  label?: string;
  required?: boolean;
  inputName: any;
  error?: string;
  setValue: UseFormSetValue<any>;
  getValues: UseFormGetValues<any>;
  trigger: UseFormTrigger<any>;
  optionsArray: [];
};

const MultiCreatableInput = forwardRef<
  HTMLSelectElement,
  MultiCreatableInputProps
>(function MultiCreatableInput(
  {
    label,
    required,
    error,
    setValue,
    getValues,
    trigger,
    inputName,
    optionsArray,
    ...other
  },
  ref
) {
  const [inputValue, setInputValue] = useState("");

  const components = {
    DropdownIndicator: null,
  };

  const handleKeyDown: KeyboardEventHandler = (event) => {
    if (
      event.key === "Enter" ||
      (event.key === "Tab" && inputValue.trim() !== "")
    ) {
      const newOption = {
        value: `${inputName === "hashtags" ? "# " : ""}${inputValue.trim()}`,
        label: `${inputName === "hashtags" ? "# " : ""}${inputValue.trim()}`,
      };

      if (
        !getValues(inputName).find(
          (item: OPTION) => item.value === newOption.value
        )
      ) {
        setValue(inputName, [...getValues(inputName), newOption]);
        setInputValue("");
        trigger(inputName);
      }
      setInputValue("");

      event.preventDefault();
    }
  };

  return (
    <div>
      <div className="mb-3">
        <InputLabel>
          {label}
          {required ? "*" : ""}
        </InputLabel>
      </div>
      <div className="mb-1">
        <CreatableSelect
          instanceId={useId()}
          components={components}
          inputValue={inputValue}
          allowCreateWhileLoading
          isClearable
          isMulti
          options={optionsArray}
         
          onInputChange={(newValue) => setInputValue(newValue)}
          onKeyDown={handleKeyDown}
          placeholder="Type something and press enter..."
          styles={multiCreatableStyles}
          {...other}
        />
        {error && <InputError>{error}</InputError>}
      </div>
    </div>
  );
});

export default MultiCreatableInput;
