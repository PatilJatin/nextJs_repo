import React, { FC, ReactNode } from "react";

type TableHeadingProps = {
  children: ReactNode;
};

const TableHeading: FC<TableHeadingProps> = (props) => {
  const { children } = props;
  return (
    <th className="font-Poppins font-medium text-base pb-4">{children}</th>
  );
};

export default TableHeading;
