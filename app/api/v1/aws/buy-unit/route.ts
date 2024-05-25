//check commits to fetch this file again ,since it was deleted somehow

import { NextRequest, NextResponse } from "next/server";
const nodemailer = require("nodemailer");
const AWS = require("aws-sdk");
require("dotenv").config();
const { ACCESS_KEY, SECRET_KEY, REGION, BUCKET_NAME } = process.env;
const createHtmlTable = (data: any) => {
  let tableHtml = '<table border="1">';
  for (const key in data) {
    if (Object.hasOwnProperty.call(data, key)) {
      const value = data[key];
      tableHtml += `<tr><td><b>${key}</b></td><td>${value}</td></tr>`;
    }
  }
  tableHtml += "</table>";
  return tableHtml;
};
AWS.config.update({
  accessKeyId: ACCESS_KEY,
  secretAccessKey: SECRET_KEY,
  region: REGION,
});

const s3 = new AWS.S3();

const transporter = nodemailer.createTransport({
  SES: {
    ses: new AWS.SES({ apiVersion: "2019-12-01", region: REGION }),
    aws: AWS,
  },
});

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    console.log("request body ***********8", reqBody);

    // const s3ObjectKey = reqBody?.uploadedFiles[0].key;

    // const htmlTable = createHtmlTable(reqBody);
    // Download the file from S3
    // const s3Object = await s3
    //   .getObject({ Bucket: BUCKET_NAME, Key: s3ObjectKey })
    //   .promise();
    // // console.log("objetc ************************", s3Object);
    const mailOptions = {
      from: {
        name: "Realtors",
        address: "jatin.patil@furation.tech",
      },
      to: ["jatin.patil@furation.tech"],
      subject: "Test Email with attached",
      text: "Hello, This is a test email with attachments",
      html: `<b> Hello, This is a test email with attachments</b><br>`,
      //   attachments: [
      //     {
      //       filename: reqBody?.uploadedFiles[0].name,
      //       content: s3Object.Body,
      //       encoding: "base64",
      //     },
      //   ],
    };

    const result = await transporter.sendMail(mailOptions);

    return NextResponse.json(
      {
        message: "Email sent successfully",
        success: true,
      },
      {
        status: 200,
      }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
