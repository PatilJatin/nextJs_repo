import { LEADS_SOURCE_MODEL } from "@/types/leads.types";
import React from "react";
import WorksheetDetailsValues from "../worksheets/WorksheetDetailsValues";
import "../worksheets/worksheets.css";

const LeadDetails = ({ details }: { details: LEADS_SOURCE_MODEL }) => {
  console.log(details);

  const {
    firstName,
    lastName,
    createdAt,
    email,
    phoneNumber,
    query,
    sourceName,
    updatedAt,
  } = details;

  return (
    <>
      <div className="font-Poppins px-6">
        <h3 className="text-primary text-xl font-medium  capitalize">
          source details
        </h3>

        <div className="my-6">
          <div>
            <h4 className="worksheet_section_heading">Name</h4>
            <div className="grid grid-cols-2">
              <WorksheetDetailsValues
                fieldName="First name"
                value={firstName}
              />

              <WorksheetDetailsValues fieldName="last name" value={lastName} />
            </div>
          </div>

          <div className="border-b border-[#E5E5E5] my-4"></div>

          <div>
            <h4 className="worksheet_section_heading capitalize">
              contact details
            </h4>
            <div className="grid grid-cols-2">
              <WorksheetDetailsValues fieldName="Email Address" value={email} />

              <WorksheetDetailsValues
                fieldName="Phone Number"
                value={phoneNumber}
              />
            </div>
          </div>

          <div className="border-b border-[#E5E5E5] my-4"></div>

          <div>
            <h4 className="worksheet_section_heading capitalize">
              source details
            </h4>
            <div className="grid grid-cols-2">
              <WorksheetDetailsValues fieldName="Source" value={sourceName} />

              <WorksheetDetailsValues fieldName="Date" value={createdAt} />
            </div>
          </div>

          <div className="border-b border-[#E5E5E5] my-4"></div>

          <div>
            <h4 className="worksheet_section_heading capitalize">query</h4>
            <p className="worksheet_field_value">{query}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default LeadDetails;
