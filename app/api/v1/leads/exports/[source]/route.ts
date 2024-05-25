import { connectDb } from "@/dbConfig/dbConfig";
import Excel from "exceljs";
import { NextRequest, NextResponse } from "next/server";
import { ApiResponse } from "@/app/utils/api-response";
import { StatusCodes } from "http-status-codes";
import { asyncHandler } from "@/app/utils/asyncHandler";
import fs from "fs";

import { fileURLToPath } from "url";
import { dirname } from "path";
import axios from "axios";
import Lead from "@/models/lead-model";

// =========DB connection
connectDb();

// ================This is the method for exporting a file and it will be downloadable
export const GET = asyncHandler(async function (
  req: NextRequest,
  { params }: { params: { source: string } },
  res: NextResponse
) {
  const source = params.source;
  const foundLead = await Lead.find({ sourceName: source });

  // Create a new Excel workbook and worksheet
  const workbook = new Excel.Workbook();
  const worksheet = workbook.addWorksheet("Worksheets");

  // const path = __dirname;
  // console.log("Path:---", path);
  // Define Excel headers based on your schema
  const headers = Object.keys(Lead.schema.paths).filter(
    (path) => path !== "__v" && path !== "_id"
  );
  // console.log("Header:---", headers);

  // Add headers to the worksheet
  worksheet.addRow(headers);

  // Add data to the worksheet
  foundLead.forEach((lead) => {
    const rowData: any = [];
    headers.forEach((header) => {
      rowData.push(lead[header]);
    });
    worksheet.addRow(rowData);
  });
  worksheet.getRow(1).eachCell((cell) => {
    cell.font = { bold: true };
  });

  // Generate Excel file
  // const excelFilePath = "worksheets.xlsx";
  const currentDir = dirname(fileURLToPath(import.meta.url));
  console.log("*******************", currentDir, "&&&&&&&&&&&&");
  const excelFilePath = `${currentDir}/excel-container/leads.xlsx`;
  await workbook.xlsx.writeFile(`${excelFilePath}`);
  console.log(
    "*******************excelFilePath",
    excelFilePath,
    "&&&&&&&&&&&&"
  );

  // console.log("@@wrkbook", workbook);
  // console.log(`Excel file "${excelFilePath}" generated successfully.`);
  const fileData = fs.readFileSync(excelFilePath);
  const preSignedUrl = await axios.post(
    `${process.env.NEXTAUTH_URL}/api/v1/aws`,
    {
      fileType: "worksheets.xlsx",
    }
  );
  await axios.put(preSignedUrl.data.uploadUrl, fileData, {
    headers: {
      "Content-Type":
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // Specify the content type of the file
    },
  });
  // console.log(object);
  const finalUrl = preSignedUrl.data.uploadUrl.split("?")[0];
  return ApiResponse("Exported data successfully", StatusCodes.OK, finalUrl);
});
