import React, { FC, ReactNode } from "react";

type TableContainer = {
  children: ReactNode;
  position?: string;
};

const TableContainer: FC<TableContainer> = (props) => {
  const { children, position = "left" } = props;
  return (
    <div
      className={`flex-grow flex flex-col pt-7 px-3 border border-[#606060] rounded-lg w-full overflow-hidden ${
        position === "center" ? "text-center" : "text-left"
      }`}
    >
      <div className="scrollbar-thin overflow-auto">{children}</div>
    </div>
  );
};

export default TableContainer;
