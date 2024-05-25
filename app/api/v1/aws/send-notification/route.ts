//check commits to fetch this file again ,since it was deleted somehow
import path from "path";
import { NextRequest, NextResponse } from "next/server";
const nodemailer = require("nodemailer");
const AWS = require("aws-sdk");
require("dotenv").config();
const { ACCESS_KEY, SECRET_KEY, REGION, BUCKET_NAME } = process.env;
const createHtmlTable = (data: any[]) => {
  let htmlContent = "";

  for (const item of data) {
    // Use "Title" as a span and "Location" as a value
    htmlContent += `<p><span>${item.title}</span>: ${item.location}</p>`;
  }

  return htmlContent;
};

const createEmailHtml = (
  name: string,
  projectName: string,
  attachements: any
) => {
  // Create the email body
  console.log("inside th body", name, projectName);
  const emailHtml = `
    <p>Hey ${name},</p>
    <p>PFA along with this email, the additional documents requested for ${projectName}:</p>
    <div>${createHtmlTable(attachements)}</div>
  `;

  return emailHtml;
};

const extractFileNameFromUrl = (url: any) => {
  console.log("extractFileNameFromUrl ********url", url);
  const fileName = path.basename(url);
  console.log("extractFileNameFromUrl", fileName);
  return fileName;
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

// export async function POST(request: NextRequest) {
//   try {
//     const reqBody = await request.json();
//     const { project, formData } = reqBody;
//     const { name, attachments } = project;
//     // console.log("request body ***********8", name);
//     // console.log("request body ################# attachement", attachments);
//     console.log("request body ################# form data", formData);
//     let attachementsfile: any = [];
//     const downloadfile = async (url: String, title: String) => {
//       const fileName = extractFileNameFromUrl(url);

//       console.log("file for key ************", fileName);
//       const s3Object = await s3
//         .getObject({ Bucket: BUCKET_NAME, Key: fileName })
//         .promise();
//       console.log("object %%%%%%%%%%%%%%%%%", s3Object);
//       const objectFile = {
//         filename: title,
//         content: s3Object.Body,
//         encoding: "base64",
//       };
//       console.log("object %%%%%%%%%%%%%%%%%", objectFile);
//       attachementsfile.push(objectFile);
//       console.log("data &&&&&&&&&&&&&&&&&7", attachementsfile);
//     };

//     attachments.forEach(async (element: any) => {
//       await downloadfile(element.location, element.title);
//     });
//     console.log("attached", attachementsfile);
//     // // console.log("objetc ************************", s3Object);
//     const mailOptions = {
//       from: {
//         name: "Realtors",
//         address: "jatin.patil@furation.tech",
//       },
//       to: ["jatinp8390@gmail.com"],
//       subject: "Test Email with attached",
//       text: "Hello, This is a test email with attachments",
//       html: `<b> Hello, This is a test email with attachments</b><br> ${createEmailHtml(
//         formData.name,
//         name,
//         attachments
//       )} `,
//       attachments: attachementsfile,
//     };

//     const result = await transporter.sendMail(mailOptions);

//     return NextResponse.json(
//       {
//         message: "Email sent successfully",
//         success: true,
//       },
//       {
//         status: 200,
//       }
//     );
//   } catch (error: any) {
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }

// ... (your existing imports)

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { project, formData } = reqBody;
    const { name, attachments } = project;

    let attachementsfile: any = [];
    const downloadfile = async (url: string, title: string) => {
      const fileName = extractFileNameFromUrl(url);

      const s3Object = await s3
        .getObject({ Bucket: BUCKET_NAME, Key: fileName })
        .promise();

      const objectFile = {
        filename: title,
        content: s3Object.Body,
        encoding: "base64",
      };

      attachementsfile.push(objectFile);
    };

    const downloadPromises = attachments.map(async (element: any) => {
      await downloadfile(element.location, element.title);
    });

    await Promise.all(downloadPromises);

    const mailOptions = {
      from: {
        name: "Realtors",
        address: "jatin.patil@furation.tech",
      },
      to: ["jatinp8390@gmail.com", "birendra.mahto@furation.tech"],
      subject: "Test Email with attached",
      text: "Hello, This is a test email with attachments",
      html: `<b> Hello, This is a test email with attachments</b><br> ${createEmailHtml(
        formData.name,
        name,
        attachments
      )} `,
      attachments: attachementsfile,
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
