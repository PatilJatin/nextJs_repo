import { connectDb } from "@/dbConfig/dbConfig";
import { Worksheet } from "@/models/worksheet-model";
import Excel from "exceljs";
import { NextRequest } from "next/server";
import { ApiResponse } from "@/app/utils/api-response";
import { StatusCodes } from "http-status-codes";
import { asyncHandler } from "@/app/utils/asyncHandler";
import fs from "fs";
import { ApiError } from "@/app/utils/api-error";
import { fileURLToPath } from "url";
import { dirname } from "path";
import axios from "axios";

// =========DB connection
connectDb();

// ================This is the method to filter all the worksheets based on new-to-old
export const GET = asyncHandler(async function (req: NextRequest) {
  // Fetch all worksheets from MongoDB
  console.log("Inside export worksheet");
  const allWorksheets = await Worksheet.find();
  console.log("total worksheet count is ", allWorksheets.length);

  // Create a new Excel workbook and worksheet
  const workbook = new Excel.Workbook();
  const worksheet = workbook.addWorksheet("Worksheets");

  // const path = __dirname;
  // console.log("Path:---", path);
  // Define Excel headers based on your schema
  // const headers = Object.keys(Worksheet.schema.paths).filter(
  //   (path) => path !== "__v" && path !== "_id"
  // );
  const headers: any = [];
  Object.keys(Worksheet.schema.paths).forEach((path) => {
    if (path !== "__v" && path !== "_id") {
      if (
        path === "suiteChoice1" ||
        path === "suiteChoice2" ||
        path === "suiteChoice3"
      ) {
        headers.push(`${path} | floorPlan`);
        headers.push(`${path} | floorName | Low/Mid/High`);
      } else if (path === "dlOrPassport") {
        headers.push(`dl`);
        headers.push(`passport`);
        headers.push(`pr card`);
      } else {
        headers.push(path);
      }
    }
  });
  // console.log("Header:---", headers);

  // Add headers to the worksheet

  worksheet.addRow(headers);

  // Add data to the worksheet
  allWorksheets.forEach((worksheetData) => {
    const rowData: any = [];
    headers.forEach((header: any) => {
      if (header.startsWith("suiteChoice")) {
        const suiteChoice = worksheetData[header.split(" | ")[0]]; // Extract the suiteChoice object
        const fieldName = header.split(" | ")[1]; // Extract the field name (Floorplan or Low/Mid/High Floor)
        if (suiteChoice) {
          const value = suiteChoice[fieldName];
          // console.log("field is @@@", fieldName);
          // console.log("Value is @@@", value);
          rowData.push(value || ""); // Push the value or an empty string if it doesn't exist
        } else {
          rowData.push(""); // Push an empty string if the suiteChoice is null or undefined
        }
      } else if (header === "dl") {
        const dlOrPassportArray = worksheetData["dlOrPassport"];
        if (dlOrPassportArray.length > 0) {
          const value = dlOrPassportArray[0].link;
          rowData.push(value);
        } else {
          rowData.push("N/A");
        }
      } else if (header === "passport") {
        const dlOrPassportArray = worksheetData["dlOrPassport"];
        if (dlOrPassportArray.length > 1) {
          const value = dlOrPassportArray[1].link;
          rowData.push(value);
        } else {
          rowData.push("N/A");
        }
      } else if (header === "pr card") {
        const dlOrPassportArray = worksheetData["dlOrPassport"];
        if (dlOrPassportArray.length > 2) {
          const value = dlOrPassportArray[2].link;
          rowData.push(value);
        } else {
          rowData.push("N/A");
        }
      } else if (worksheetData[header] === null) {
        rowData.push("N/A");
      } else {
        rowData.push(worksheetData[header]);
      }
    });
    worksheet.addRow(rowData);
  });
  worksheet.getRow(1).eachCell((cell) => {
    cell.font = { bold: true };
  });

  // Generate Excel file
  // const excelFilePath = "worksheets.xlsx";
  // const currentDir = dirname(fileURLToPath(import.meta.url));
  // const excelFilePath = `${currentDir}/excel-container/worksheets.xlsx`;
  const excelFilePath='worksheets.xlsx'
  await workbook.xlsx.writeFile(excelFilePath);

  // console.log("@@workbook", workbook);
  // console.log(`Excel file "${excelFilePath}" generated successfully.`);
  const fileData = fs.readFileSync(excelFilePath);
  const preSignedUrl = await axios.post(
    `${process.env.NEXTAUTH_URL}/api/v1/aws`,
    // `http://localhost:3000/api/v1/aws`,
    {
      fileType: "worksheets.xlsx",
    }
  );
  // console.log(
  //   "After presigned url",
  //   preSignedUrl,
  //   "@@@@@@@@@@",
  //   process.env.NEXTAUTH_URL
  // );
  // console.log("####", preSignedUrl.data.uploadUrl);
  await axios.put(preSignedUrl.data.uploadUrl, fileData, {
    headers: {
      "Content-Type":
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // Specify the content type of the file
    },
  });
  console.log("After put request of uploading file");
  // console.log(object);

  console.log("going to return a response");
  return ApiResponse(
    `Exported data successfully latest:::: ${allWorksheets.length}`,
    StatusCodes.OK,
    preSignedUrl.data.uploadUrl
  );
});
