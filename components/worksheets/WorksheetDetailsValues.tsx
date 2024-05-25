import React from "react";

const WorksheetDetailsValues = ({
  fieldName,
  value,
}: {
  fieldName: string;
  value: any;
}) => {
  return (
    <p className="capitalize">
      <span className="worksheet_field_name whitespace-normal capitalize">
        {fieldName}:{" "}
      </span>
      <span
        className={`worksheet_field_value whitespace-normal break-words ${
          fieldName.toLowerCase().includes("email")
            ? "normal-case"
            : "capitalize"
        } `}
      >
        {value}
      </span>
    </p>
  );
};

export default WorksheetDetailsValues;
