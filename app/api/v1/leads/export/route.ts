// import { connectDb } from "@/dbConfig/dbConfig";
// import Excel from "exceljs";
// import { NextRequest, NextResponse } from "next/server";
// import { ApiResponse } from "@/app/utils/api-response";
// import { StatusCodes } from "http-status-codes";
// import { asyncHandler } from "@/app/utils/asyncHandler";
// import fs from "fs";

// import { fileURLToPath } from "url";
// import { dirname } from "path";
// import axios from "axios";
// import Lead from "@/models/lead-model";

// // =========DB connection
// connectDb();

// // ================This is the method for exporting a file and it will be downloadable
// export const POST = asyncHandler(async function (
//   req: NextRequest,
//   res: NextResponse
// ) {
//   const reqBody = await req.json();

//   const source = reqBody.source;
//   const foundLead = await Lead.find({ sourceName: source });

//   // Create a new Excel workbook and worksheet
//   const workbook = new Excel.Workbook();
//   const worksheet = workbook.addWorksheet("Leeds");

//   // const path = __dirname;
//   // console.log("Path:---", path);
//   // Define Excel headers based on your schema
//   const headers = Object.keys(Lead.schema.paths).filter(
//     (path) => path !== "__v" && path !== "_id"
//   );
//   // console.log("Header:---", headers);

//   // Add headers to the worksheet
//   worksheet.addRow(headers);

//   // Add data to the worksheet
//   foundLead.forEach((lead) => {
//     const rowData: any = [];
//     headers.forEach((header) => {
//       rowData.push(lead[header]);
//     });
//     worksheet.addRow(rowData);
//   });
//   worksheet.getRow(1).eachCell((cell) => {
//     cell.font = { bold: true };
//   });

 
//   // const excelFilePath = "worksheets.xlsx";
//   const currentDir = dirname(fileURLToPath(import.meta.url));
//   console.log("*******************", currentDir, "&&&&&&&&&&&&");
//   const excelFilePath = `${currentDir}/excel-container/leads.xlsx`;
//   await workbook.xlsx.writeFile(`${excelFilePath}`);
//   console.log(
//     "*******************excelFilePath",
//     excelFilePath,
//     "&&&&&&&&&&&&"
//   );

//   // console.log("@@wrkbook", workbook);
//   // console.log(`Excel file "${excelFilePath}" generated successfully.`);
//   const fileData = fs.readFileSync(excelFilePath);
//   const preSignedUrl = await axios.post(
//     `${process.env.NEXTAUTH_URL}/api/v1/aws`,
//     {
//       fileType: "worksheets.xlsx",
//     }
//   );
//   await axios.put(preSignedUrl.data.uploadUrl, fileData, {
//     headers: {
//       "Content-Type":
//         "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // Specify the content type of the file
//     },
//   });
//   // console.log(object);
//   const finalUrl = preSignedUrl.data.uploadUrl.split("?")[0];
//   return ApiResponse("Exported data successfully", StatusCodes.OK, finalUrl);
// });
import { connectDb } from "@/dbConfig/dbConfig";
import Excel from "exceljs";
import { NextRequest, NextResponse } from "next/server";
import { ApiResponse } from "@/app/utils/api-response";
import { StatusCodes } from "http-status-codes";
import { asyncHandler } from "@/app/utils/asyncHandler";
import fs from "fs";
// import path from "path"; // Import path module for path operations

import { fileURLToPath } from "url";
import { dirname } from "path";
import axios from "axios";
import Lead from "@/models/lead-model";

// DB connection
connectDb();

// Export method for creating and exporting an Excel file
export const POST = asyncHandler(async function (
  req: NextRequest,
  res: NextResponse
) {
  const reqBody = await req.json();

  const source = reqBody.source;
  const foundLead = await Lead.find({ sourceName: source });

  // Create a new Excel workbook and worksheet
  const workbook = new Excel.Workbook();
  const worksheet = workbook.addWorksheet("Leeds");

  // Define Excel headers based on your schema
  const headers = Object.keys(Lead.schema.paths).filter(
    (path) => path !== "__v" && path !== "_id"
  );

  // Add headers to the worksheet
  worksheet.addRow(headers);

  // Add data to the worksheet
  foundLead.forEach((lead) => {
    const rowData = headers.map((header) => lead[header]);
    worksheet.addRow(rowData);
  });

  // Make the header row bold
  worksheet.getRow(1).eachCell((cell) => {
    cell.font = { bold: true };
  });

  // Get the current directory path
  // const currentDir = dirname(fileURLToPath(import.meta.url));
  const excelFilePath = `leed.xlsx`;

  
  // Write the workbook to the Excel file
  await workbook.xlsx.writeFile(`${excelFilePath}`);

  // Read the Excel file as binary data
  const fileData = fs.readFileSync(excelFilePath);

  // Obtain pre-signed URL from your API
  const preSignedUrl = await axios.post(
    `${process.env.NEXTAUTH_URL}/api/v1/aws`,
    {
      fileType: "lead.xlsx", // Corrected fileType value
    }
  );

  // Upload the Excel file to the pre-signed URL
  await axios.put(preSignedUrl.data.uploadUrl, fileData, {
    headers: {
      "Content-Type":
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    },
  });

  // Generate final URL for the uploaded file
  const finalUrl = preSignedUrl.data.uploadUrl.split("?")[0];

  // Return API response with the final URL
  return ApiResponse("Exported data successfully", StatusCodes.OK, finalUrl);
});
