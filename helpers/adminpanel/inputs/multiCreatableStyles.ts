import { OPTION } from "@/types/common.types";
import { GroupBase, StylesConfig } from "react-select";

export const multiCreatableStyles: // options: OPTION[]
StylesConfig<OPTION, true> = {
  control: (styles, state) => ({
    ...styles,
    border: state.isFocused ? "1px solid black" : "1px solid #8C8C8C",
    outline: "none",
  }),

  input: (styles) => ({
    ...styles,
    paddingTop: 12,
    paddingBottom: 12,
    fontSize: "14px",
    margin: 0,
    // fontFamily: " 'Poppins', sans-serif ",
  }),

  valueContainer: (styles) => ({
    ...styles,
    paddingTop: 0,
    paddingBottom: 0,
  }),

  multiValue: (styles, state) => ({
    ...styles,
    background: "#DBEAF6",
    color: "#1975B8",
    borderRadius: "12px",
  }),

  multiValueLabel: (styles, state) => ({
    ...styles,
    background: "#DBEAF6",
    color: "#1975B8",
    borderRadius: "12px",
  }),

  placeholder: (styles) => ({
    ...styles,
    fontSize: "14px",
  }),
};
