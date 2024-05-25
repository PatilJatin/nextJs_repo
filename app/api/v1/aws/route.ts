// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import S3 from "aws-sdk/clients/s3";
import { randomUUID } from "crypto";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextApiResponse) {
  // const ex = (req.query.fileType as string).split("/")[0];

  try {
    if (
      !process.env.ACCESS_KEY ||
      !process.env.SECRET_KEY ||
      !process.env.REGION
    ) {
      throw {
        message: "AWS credential is missing",
        statusCode: 500,
      };
    }
    const s3 = new S3({
      apiVersion: "2006-03-01",
      accessKeyId: process.env.ACCESS_KEY,
      secretAccessKey: process.env.SECRET_KEY,
      region: process.env.REGION,
      signatureVersion: "v4",
    });
    const reqBody = await req.json();
    // console.log(req.body);
    const ex = (reqBody.fileType as string).split(".")[1];
    const Key = `${randomUUID()}.${ex}`;
    console.log(ex);

    const s3Params = {
      Bucket: process.env.BUCKET_NAME,
      Key,
      Expires: 600,
      ContentType: `image/${ex}`,
    };
    const uploadUrl = await s3.getSignedUrl("putObject", s3Params);

    // console.log("uploadUrl ***********************", uploadUrl);
    return NextResponse.json({
      uploadUrl,
      key: Key,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}

export async function DELETE(req: NextRequest, res: NextApiResponse) {
  try {
    if (
      !process.env.ACCESS_KEY ||
      !process.env.SECRET_KEY ||
      !process.env.REGION ||
      !process.env.BUCKET_NAME
    ) {
      throw {
        message: "AWS credential is missing",
        statusCode: 500,
      };
    }

    const s3 = new S3({
      apiVersion: "2006-03-01",
      accessKeyId: process.env.ACCESS_KEY,
      secretAccessKey: process.env.SECRET_KEY,
      region: process.env.REGION,
      signatureVersion: "v4",
    });
    const reqBody = await req.json();
    const { key } = reqBody;

    if (!key) {
      throw {
        message: "Key parameter is missing",
        statusCode: 400,
      };
    }

    const deleteParams = {
      Bucket: process.env.BUCKET_NAME!,
      Key: key as string,
    };

    await s3.deleteObject(deleteParams).promise();

    return NextResponse.json({
      message: "Object deleted successfully",
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error.message,
      },
      {
        status: error.statusCode || 500,
      }
    );
  }
}
