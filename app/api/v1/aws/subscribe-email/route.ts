//check commits to fetch this file again ,since it was deleted somehow

import { NextRequest, NextResponse } from "next/server";
const nodemailer = require("nodemailer");
const AWS = require("aws-sdk");
require("dotenv").config();
const { ACCESS_KEY, SECRET_KEY, REGION, BUCKET_NAME } = process.env;

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
    // const reqBody = await request.json();
    // console.log("request body ***********8", reqBody);

    // const s3ObjectKey = reqBody?.selectfile[0].key;
    // console.log("s3Object *************************", s3ObjectKey);

    // Download the file from S3
    // const s3Object = await s3
    //   .getObject({
    //     Bucket: BUCKET_NAME,
    //     Key: "6df72a96-804b-4f91-b6d6-f2bea1bc88c8.svg",
    //   })
    //   .promise();
    // // console.log("objetc ************************", s3Object);
    const emails = ["jatin.patil@furation.tech"];
    for (let email of emails) {
      const mailOptions = {
        from: {
          name: "Realtors",
          address: "jatin.patil@furation.tech",
        },
        to: [email],
        subject: "Test Email with attached",
        text: "Hello, This is a test email with attachments",
        html: `<b> Hello, This is a test email with attachments</b><br>`,
        // attachments: [
        //   {
        //     filename: "file name",
        //     content: s3Object.Body,
        //     encoding: "base64",
        //   },
        // ],
      };

      const result = await transporter.sendMail(mailOptions);
    }

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
