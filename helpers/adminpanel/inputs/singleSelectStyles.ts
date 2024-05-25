import { OPTION } from "@/types/common.types";
import { StylesConfig } from "react-select";

export const singleSelectStyles: StylesConfig<OPTION, false> = {
  input: (styles) => ({
    ...styles,
    paddingTop: 12,
    paddingBottom: 12,
    fontSize: "14px",
    margin: 0,
  }),

  valueContainer: (styles) => ({
    ...styles,
    margin: 0,
    paddingTop: 0,
    paddingBottom: 0,
  }),
};
