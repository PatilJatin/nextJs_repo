import { WORKSHEET_MODEL } from "@/types/worksheets.types";
import React from "react";
import "./worksheets.css";
import WorksheetDetailsValues from "./WorksheetDetailsValues";
import Link from "next/link";
import { FiDownload } from "react-icons/fi";

const WorksheetInfo = ({ sheet }: { sheet: WORKSHEET_MODEL }) => {
  console.log(sheet);

  return (
    <>
      <div className="font-Poppins px-6">
        <h3 className="text-primary text-xl font-medium mb-6">
          {sheet.projectName}
        </h3>
        <div>
          <h4 className="worksheet_section_heading">Name</h4>
          <div className="grid grid-cols-2">
            <WorksheetDetailsValues
              fieldName="First name"
              value={sheet.firstName}
            />

            <WorksheetDetailsValues
              fieldName="last name"
              value={sheet.lastName}
            />
          </div>
        </div>

        <div className="border-b border-[#E5E5E5] my-4"></div>

        <h4 className="worksheet_section_heading">Address</h4>
        <div className="grid grid-cols-2 gap-y-3 gap-x-12">
          <WorksheetDetailsValues
            fieldName="Street address"
            value={sheet.streetAddress}
          />

          <WorksheetDetailsValues
            fieldName="address line 1"
            value={sheet.addressLine1}
          />

          <WorksheetDetailsValues fieldName="city " value={sheet.city} />

          <WorksheetDetailsValues
            fieldName="province name"
            value={sheet.addressLine1}
          />

          <WorksheetDetailsValues
            fieldName="postal code"
            value={sheet.postalCode}
          />
        </div>

        <div className="border-b border-[#E5E5E5] my-4"></div>

        <h4 className="worksheet_section_heading">Phone Number & DOB</h4>
        <div className="grid grid-cols-2 gap-y-3 gap-x-12">
          <WorksheetDetailsValues
            fieldName="phone number"
            value={sheet.streetAddress}
          />

          <WorksheetDetailsValues
            fieldName="birthdate"
            value={sheet.addressLine1}
          />
        </div>

        <div className="border-b border-[#E5E5E5] my-4"></div>

        <h4 className="worksheet_section_heading">Email</h4>
        <div className="grid grid-cols-2 gap-y-3 gap-x-12">
          <WorksheetDetailsValues
            fieldName="email address"
            value={sheet.email}
          />

          <WorksheetDetailsValues
            fieldName="confirm email"
            value={sheet.email}
          />
        </div>

        <div className="border-b border-[#E5E5E5] my-4"></div>

        <h4 className="worksheet_section_heading">Occupation</h4>
        <div className="grid grid-cols-2 gap-y-3 gap-x-12">
          <WorksheetDetailsValues
            fieldName="job title"
            value={sheet.jobTitle}
          />

          <WorksheetDetailsValues fieldName="SIN" value={sheet.sin} />

          <WorksheetDetailsValues
            fieldName="Employer Name"
            value={sheet.employerName}
          />
        </div>

        <div className="border-b border-[#E5E5E5] my-4"></div>

        <h4 className="worksheet_section_heading">Suite Choice 1</h4>
        <div className="grid grid-cols-2 gap-y-3 gap-x-12 mb-4">
          <WorksheetDetailsValues
            fieldName="floor plan"
            value={sheet.suiteChoice1.floorPlan}
          />

          <WorksheetDetailsValues
            fieldName="Low/Mid/High Floor"
            value={sheet.suiteChoice1.floorName}
          />
        </div>

        <h4 className="worksheet_section_heading">Suite Choice 2</h4>
        <div className="grid grid-cols-2 gap-y-3 gap-x-12 mb-4">
          <WorksheetDetailsValues
            fieldName="floor plan"
            value={sheet.suiteChoice2.floorPlan}
          />

          <WorksheetDetailsValues
            fieldName="Low/Mid/High Floor"
            value={sheet.suiteChoice2.floorName}
          />
        </div>

        <h4 className="worksheet_section_heading">Suite Choice 3</h4>
        <div className="grid grid-cols-2 gap-y-3 gap-x-12 mb-4">
          <WorksheetDetailsValues
            fieldName="floor plan"
            value={sheet.suiteChoice3.floorPlan}
          />

          <WorksheetDetailsValues
            fieldName="Low/Mid/High Floor"
            value={sheet.suiteChoice3.floorName}
          />
        </div>

        <div className="border-b border-[#E5E5E5] my-4"></div>

        <div className="grid grid-cols-2 gap-y-3 gap-x-12">
          <WorksheetDetailsValues
            fieldName="2nd Purchase"
            value={sheet.is2ndPurchaser ? "Yes" : "No"}
          />
          <WorksheetDetailsValues
            fieldName="Are you an investor or buying for 
            yourself/your family (end user)"
            value={sheet.investorOrEndUser ? "Yes" : "No"}
          />
          <WorksheetDetailsValues
            fieldName="Do you want to buy parking (if suite 
                qualifies for parking)?"
            value={sheet.hasOptedForParking}
          />

          <WorksheetDetailsValues
            fieldName="Do you want to buy a locker?"
            value={sheet.hasOptedForLocker}
          />
          <WorksheetDetailsValues
            fieldName="Are you a Canadian Citizen/PR/International buyer"
            value={sheet.isCanadianCitizen ? "Yes" : "No"}
          />
        </div>

        <div className="border-b border-[#E5E5E5] my-4"></div>

        <h4 className="worksheet_section_heading">Notes</h4>
        <div className="grid grid-cols-2 gap-y-3 gap-x-12 mb-4">
          <p className="worksheet_field_value">{sheet.notes}</p>
        </div>

        <div className="border-b border-[#E5E5E5] my-4"></div>

        <h4 className="worksheet_section_heading">
          Driver’s License or Passport
        </h4>
        <p className="flex items-center gap-1">
          <span className="worksheet_field_name">Passport or License: </span>
          <a
            href={sheet.dlOrPassport.link}
            download={"DlPassport"}
            target="_blank"
          >
            <div className="flex items-center">
              <span className="text-sm text-primary underline">Download</span>

              <span>
                <FiDownload className="text-primary" />
              </span>
            </div>
          </a>
        </p>

        <div className="border-b border-[#E5E5E5] my-4"></div>

        <h4 className="worksheet_section_heading">
          Name of Real Estate Salesperson who helped you
        </h4>

        <WorksheetDetailsValues fieldName="Name" value={sheet.salesPerson} />
      </div>
    </>
  );
};

export default WorksheetInfo;
