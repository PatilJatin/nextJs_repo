import { KeyboardEventHandler } from "react";

export const preventNumberInputs: KeyboardEventHandler<HTMLInputElement> = (
  e
) => {
  if (e.key >= "0" && e.key <= "9") {
    e.preventDefault();
  }
};
